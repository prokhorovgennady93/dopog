import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs"; 
import { z } from "zod";
import crypto from "crypto";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ phone: z.string().min(10), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { phone: rawPhone, password } = parsedCredentials.data;
          const phone = rawPhone.replace(/\D/g, ""); // NORMALIZE
          console.log(`Authorize: attempting login for cleaned phone: ${phone}`);
          
          const user = await db.user.findFirst({ 
            where: { phone } 
          });
          
          if (!user) {
            console.log(`Authorize: User not found for ${phone}`);
            return null;
          }
          
          const passwordsMatch = await bcrypt.compare(password, user.password || "");
          console.log(`Authorize: Password match for ${phone}: ${passwordsMatch}`);
          
          if (passwordsMatch) {
            // STRICT LIMIT: 2 devices. Check session table before proceeding.
            const sessionCount = await (db as any).session.count({
               where: { userId: user.id } 
            });

            if (sessionCount >= 2) {
               console.log(`Authorize: Device limit exceeded for user ${phone} (Count: ${sessionCount})`);
               throw new Error("DeviceLimitExceeded");
            }

            return user;
          }
        }

        console.log("Invalid credentials or parsing failed");
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (!token.sub) {
        console.log("Session blocked: no sub in token");
        return { ...session, expires: session.expires, error: "NoSub" } as any;
      }

      if (token.isRevoked) {
        console.warn(`Enforcing revocation for JTI: ${token.jti}`);
        return null; // Force sign-out
      }
      
      if (session.user) {
        (session.user as any).id = token.sub;
        (session.user as any).isAdmin = token.isAdmin;
        (session.user as any).hasFullAccess = token.hasFullAccess;
        (session.user as any).fullAccessExpiresAt = token.fullAccessExpiresAt;
        (session.user as any).purchases = token.purchases || [];
      }
      return session;
    },
    async jwt({ token, user, account }) {
      // 1. Initial login handler
      if (user && user.id) {
        console.log(`JWT Initial Login for user: ${user.id}`);
        
        // CRITICAL FIX: Ensure JTI is always present.
        // If Auth.js didn't provide one, force-generate a UUID.
        let jti = token.jti as string;
        if (!jti) {
           jti = crypto.randomUUID();
           token.jti = jti;
           console.log(`Generated manual UUID for session: ${jti}`);
        }
        
        try {
          // Double check the count here too (just in case)
          const sessionCount = await (db as any).session.count({ where: { userId: user.id } });
          if (sessionCount >= 2) {
             console.log(`JWT: Device limit reached for ${user.id}. Blocking registration.`);
             token.isRevoked = true;
             return token;
          }

          // Register session
          await (db as any).session.create({
            data: {
              userId: user.id,
              token: jti,
              expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            }
          });
          console.log(`Database session registered successfully with JTI: ${jti}`);
        } catch (e) {
          console.error("JWT Session persistent error:", e);
        }
      }

      // 2. Continuous validation logic
      if (!user && token.jti) {
        try {
           const dbSession = await (db as any).session.findUnique({ where: { token: token.jti as string } });
           if (!dbSession) {
             console.log(`Revoking Session: JTI ${token.jti} no longer in DB.`);
             token.isRevoked = true;
           } else if (Math.random() < 0.1) {
             await (db as any).session.update({ where: { id: dbSession.id }, data: { lastUsedAt: new Date() } }).catch(() => {});
           }
        } catch (e) {
           // Skip if DB is down
        }
      }

      if (!token.sub) return token;
      
      // Sync permissions natively
      const dbUser = await db.user.findUnique({ 
        where: { id: token.sub },
        include: { purchases: { select: { courseId: true, expiresAt: true } } }
      });
      
      if (dbUser) {
        token.hasFullAccess = dbUser.hasFullAccess;
        token.fullAccessExpiresAt = dbUser.fullAccessExpiresAt;
        token.purchases = dbUser.purchases;
        token.isAdmin = dbUser.isAdmin;
      }
      return token;
    },
  },
});

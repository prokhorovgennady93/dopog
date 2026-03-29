import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs"; 
import { z } from "zod";

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
          
          if (passwordsMatch) return user;
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
        console.warn(`Session warning: JTI ${token.jti} was marked as missing from DB, but allowing session fallback.`);
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
        const jti = token.jti;
        
        if (jti) {
          try {
            await (db as any).session.deleteMany({ where: { expiresAt: { lt: new Date() } } }).catch(() => {});
            
            await (db as any).session.create({
              data: {
                userId: user.id,
                token: jti,
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
              }
            });
            console.log(`Database session registered with JTI: ${jti}`);
          } catch (e) {
            console.error("Non-blocking JWT Session persistent error:", e);
          }
        }
      }

      // 2. Continuous validation logic
      if (!user && token.jti) {
        try {
           const dbSession = await (db as any).session.findUnique({ where: { token: token.jti as string } });
           if (!dbSession) {
             console.log(`Session Sync Warning: JTI ${token.jti} not in DB. Marking as potentially revoked.`);
             token.isRevoked = true;
           } else if (Math.random() < 0.1) {
             await (db as any).session.update({ where: { id: dbSession.id }, data: { lastUsedAt: new Date() } }).catch(() => {});
           }
        } catch (e) {
           // Skip if DB is down
        }
      }

      if (!token.sub) return token;
      
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

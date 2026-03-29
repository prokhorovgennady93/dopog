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
      // 1. Context Logging
      if (user) {
        console.log(`JWT Init: User ${user.id} signing in.`);
      }

      // 2. Auto-Healing & Session Management
      if (token.sub && token.jti) {
        const jti = token.jti as string;
        const userId = token.sub as string;

        try {
          const dbSession = await (db as any).session.findUnique({ where: { token: jti } });
          
          if (!dbSession) {
            console.log(`Auto-Healing: JTI ${jti} not in DB. Registering new session for user ${userId}.`);
            
            // Cleanup expired
            await (db as any).session.deleteMany({ where: { expiresAt: { lt: new Date() } } }).catch(() => {});

            // Device limit enforcement
            const activeSessions = await (db as any).session.findMany({
              where: { userId: userId },
              orderBy: { lastUsedAt: 'asc' }
            });
            
            if (activeSessions.length >= 3) {
              console.log(`Limit reached for user ${userId}. Evicting oldest session: ${activeSessions[0].token}`);
              await (db as any).session.delete({ where: { id: activeSessions[0].id } }).catch(() => {});
            }
            
            // Create new record
            await (db as any).session.create({
              data: {
                userId: userId,
                token: jti,
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
              }
            });
            console.log(`Session Auto-Healed: JTI ${jti} now synchronized.`);
          } else {
            // Existing session - keep it alive
            if (Math.random() < 0.05) {
               await (db as any).session.update({ where: { id: dbSession.id }, data: { lastUsedAt: new Date() } }).catch(() => {});
            }
          }
        } catch (e) {
           console.error("Auto-healing check failed (non-blocking):", e);
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

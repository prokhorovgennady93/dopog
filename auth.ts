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
      if (!token.sub || token.isRevoked) {
        console.log("Session blocked: token revoked or no sub");
        return { ...session, expires: session.expires, error: "SessionRevoked" } as any;
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
      // 1. Initial login
      if (user && user.id) {
        console.log(`JWT Initial Login for user: ${user.id}`);
        const jti = token.jti || Math.random().toString(36).substring(7);
        token.jti = jti;
        
        try {
          // Cleanup old sessions
          await (db as any).session.deleteMany({ where: { expiresAt: { lt: new Date() } } });

          const activeSessions = await (db as any).session.findMany({
            where: { userId: user.id },
            orderBy: { lastUsedAt: 'asc' }
          });
          
          if (activeSessions.length >= 3) {
            await (db as any).session.delete({ where: { id: activeSessions[0].id } });
          }
          
          await (db as any).session.create({
            data: {
              userId: user.id,
              token: jti,
              expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            }
          });
          console.log(`Session created in DB with JTI: ${jti}`);
        } catch (e) {
           console.error("JWT Session creation error:", e);
        }
      }

      // 2. Validate session on every request
      if (!user && token.jti) {
        try {
           const dbSession = await (db as any).session.findUnique({ where: { token: token.jti as string } });
           if (!dbSession) {
             console.log(`Revoking JWT: JTI ${token.jti} not found in DB`);
             token.isRevoked = true;
           } else if (Math.random() < 0.1) {
             // Occasionally update lastUsedAt
             await (db as any).session.update({ where: { id: dbSession.id }, data: { lastUsedAt: new Date() } });
           }
        } catch (e) {
           // DB is down? Let it pass to avoid total lockout
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

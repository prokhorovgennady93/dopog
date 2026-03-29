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
          const { phone, password } = parsedCredentials.data;
          console.log(`Authorize: attempting login for ${phone}`);
          
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

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (!token.sub || token.isRevoked) {
        return { expires: session.expires, error: "SessionRevoked" } as any;
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
    async jwt({ token, user }) {
      // 1. On initial login, register the token JTI as an active device session
      if (user && token.sub) {
        const jti = token.jti as string || Math.random().toString(36).substring(7);
        token.jti = jti;
        
        try {
          // Cleanup expired sessions first
          await db.session.deleteMany({ where: { expiresAt: { lt: new Date() } } });

          const activeSessions = await db.session.findMany({
            where: { userId: user.id },
            orderBy: { lastUsedAt: 'asc' }
          });
          
          if (activeSessions.length >= 3) {
            // Delete the oldest session to limit concurrent devices to 3
            await db.session.delete({ where: { id: activeSessions[0].id } });
          }
          
          await db.session.create({
            data: {
              userId: user.id,
              token: jti,
              expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            }
          });
        } catch (e) {
           console.error("Session limit enforcement error:", e);
        }
      }

      // 2. Validate token against active sessions on subsequent requests
      if (!user && token.jti) {
        try {
           const dbSession = await db.session.findUnique({ where: { token: token.jti as string } });
           if (!dbSession) {
             token.isRevoked = true;
           } else if (Math.random() < 0.05) {
             await db.session.update({ where: { id: dbSession.id }, data: { lastUsedAt: new Date() } });
           }
        } catch (e) {
           // Fallback silently if DB is temporarily unreachable
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

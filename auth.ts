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
          .object({ login: z.string().min(3), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { login, password } = parsedCredentials.data;
          console.log(`Authorize: attempting login for ${login}`);
          
          const user = await db.user.findFirst({ 
            where: { 
              phone: login 
            } 
          });
          
          if (!user) {
            console.log(`Authorize: User not found for ${login}`);
            return null;
          }
          
          const passwordsMatch = await bcrypt.compare(password, user.password || "");
          console.log(`Authorize: Password match for ${login}: ${passwordsMatch}`);

          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // ВРЕМЕННО: Отключаем лимиты и запись сессий для отладки
      console.log(`DEBUG: SignIn callback for user ${user.id} (${(user as any).phone})`);
      return true;
    },
    async session({ session, token }) {
      if (token?.sub && session.user) {
        session.user.id = token.sub;
      }
      if (typeof token.hasFullAccess === "boolean" && session.user) {
        (session.user as any).hasFullAccess = token.hasFullAccess;
      }
      // Предотвращаем передачу объектов Date на клиент
      if (token.fullAccessExpiresAt && session.user) {
        (session.user as any).fullAccessExpiresAt = 
          token.fullAccessExpiresAt instanceof Date 
            ? token.fullAccessExpiresAt.toISOString() 
            : token.fullAccessExpiresAt;
      }
      if (Array.isArray(token.purchases) && session.user) {
        (session.user as any).purchases = token.purchases.map((p: any) => ({
          ...p,
          expiresAt: p.expiresAt instanceof Date ? p.expiresAt.toISOString() : p.expiresAt
        }));
      }
      if (typeof token.isAdmin === "boolean" && session.user) {
        (session.user as any).isAdmin = token.isAdmin;
      }
      if (typeof token.isOrganization === "boolean" && session.user) {
        (session.user as any).isOrganization = token.isOrganization;
      }
      if (typeof token.orgName === "string" && session.user) {
        (session.user as any).orgName = token.orgName;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const user = await db.user.findUnique({ 
        where: { id: token.sub },
        include: { purchases: { select: { courseId: true, expiresAt: true } } }
      });
      if (user) {
        token.hasFullAccess = user.hasFullAccess;
        // Конвертируем дату в строку сразу в токене
        token.fullAccessExpiresAt = user.fullAccessExpiresAt instanceof Date 
          ? user.fullAccessExpiresAt.toISOString() 
          : user.fullAccessExpiresAt;
          
        token.purchases = user.purchases.map(p => ({
          ...p,
          expiresAt: p.expiresAt instanceof Date ? p.expiresAt.toISOString() : p.expiresAt
        }));

        token.isAdmin = user.isAdmin;
        token.isOrganization = (user as any).isOrganization;
        token.orgName = (user as any).orgName;
      }
      return token;
    },
  },
});

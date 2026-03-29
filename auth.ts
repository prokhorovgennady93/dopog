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
      if (token.sub && session.user) {
        (session.user as any).id = token.sub;
      }
      if (session.user) {
        const user = await db.user.findUnique({
          where: { id: (session.user as any).id }
        }) as any;
        
        if (user) {
          (session.user as any).isAdmin = user.isAdmin;
          (session.user as any).isPremium = user.isPremium;
        }
      }
      if (typeof token.hasFullAccess === "boolean" && session.user) {
        (session.user as any).hasFullAccess = token.hasFullAccess;
      }
      if (token.fullAccessExpiresAt && session.user) {
        (session.user as any).fullAccessExpiresAt = token.fullAccessExpiresAt;
      }
      if (Array.isArray(token.purchases) && session.user) {
        (session.user as any).purchases = token.purchases;
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
        token.fullAccessExpiresAt = user.fullAccessExpiresAt;
        token.purchases = user.purchases;
        token.isAdmin = user.isAdmin;
        token.isOrganization = (user as any).isOrganization;
        token.orgName = (user as any).orgName;
      }
      return token;
    },
  },
});

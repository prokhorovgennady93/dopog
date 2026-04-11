import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs"; 
import { z } from "zod";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      phone: string;
      isAdmin: boolean;
      hasFullAccess: boolean;
      fullAccessExpiresAt: Date | null;
      purchases: any[];
    } & DefaultSession["user"]
  }

  interface User {
    id?: string;
    phone?: string | null;
    isAdmin?: boolean;
    hasFullAccess?: boolean;
    fullAccessExpiresAt?: Date | null;
  }
}

import { DefaultSession } from "next-auth";

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
      if (session.user && token.sub) {
        (session.user as any).id = token.sub;
        (session.user as any).phone = token.phone;
        (session.user as any).isAdmin = token.isAdmin;
        (session.user as any).hasFullAccess = token.hasFullAccess;
        (session.user as any).fullAccessExpiresAt = token.fullAccessExpiresAt;
        (session.user as any).purchases = token.purchases || [];
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      
      if (!token.sub) return token;
      
      try {
        // Sync permissions natively on every request
        const dbUser = await db.user.findUnique({ 
          where: { id: token.sub as string },
          include: { purchases: { select: { courseId: true, expiresAt: true } } }
        });
        
        if (dbUser) {
          token.hasFullAccess = dbUser.hasFullAccess;
          token.fullAccessExpiresAt = dbUser.fullAccessExpiresAt;
          token.purchases = dbUser.purchases;
          token.isAdmin = dbUser.isAdmin;
          token.phone = dbUser.phone;
        }
      } catch (error) {
        console.error("JWT sync error (non-blocking):", error);
      }
      
      return token;
    },
  },
});

import { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { setUserHash } from "./db";

export const authOptions: NextAuthOptions = {
  // session: {
  //   strategy: "jwt",
  // },
  // pages: {
  //   signIn: "/login",
  // },
  // pages: {
  //   error: "/login",
  // },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Github({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  // callbacks: {
  //   async jwt({ token }) {
  //     return token;
  //   },
  // },
  callbacks: {
    async signIn({ user }) {
      await setUserHash(`user:${user.email}`, "name", user.name || "");
      await setUserHash(`user:${user.email}`, "image", user.image || "");
      if (user.email) {
        return true;
      } else {
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};

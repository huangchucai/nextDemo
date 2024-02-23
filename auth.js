import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { addUser, getUser } from "@/lib/prisma";
import { use } from "marked";


export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "密码登录",
      credentials: {
        username: { label: "邮箱", type: "text", placeholder: "输入您的邮箱" },
        password: {
          label: "密码",
          type: "password",
          placeholder: "输入您的密码",
        },
      },
      async authorize(credentials, req) {
        let user = null;

        user = await getUser(credentials.username, credentials.password);

        // 密码错误
        if (user === 1) return null;

        // 用户注册
        if (user === 0) {
          user = await addUser(credentials.username, credentials.password);
        }

        if (!user) {
          throw new Error("User was not found and could not be created.");
        }
        return user;
      },
    }),
    GitHub,
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname.startsWith("/note/edit")) return !!auth;
      return true;
    },
    async jwt({ token, user, account }) {
      console.log('----jwt', user, account, token, 'jwt----');
      
      if(account && account.type === 'credentials' && user) {
        console.log('----jwt--进入--jwt----');
        token.userId = user.userId
      }
      return token
    },
    async session({ session, token }) {
      console.log('---session--进入---')
      session.user.userId = token.userId;
      return session;
    }
  },
});

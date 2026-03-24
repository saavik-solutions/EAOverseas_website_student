import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.onboardingCompleted = user.onboardingCompleted;
        token.waitlistNumber = user.waitlistNumber;
        token.isWaitlistJoined = user.isWaitlistJoined;
      }
      if (trigger === "update") {
         if (session?.onboardingCompleted !== undefined) token.onboardingCompleted = session.onboardingCompleted;
         if (session?.isWaitlistJoined !== undefined) token.isWaitlistJoined = session.isWaitlistJoined;
         if (session?.waitlistNumber !== undefined) token.waitlistNumber = session.waitlistNumber;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
        session.user.onboardingCompleted = token.onboardingCompleted;
        session.user.waitlistNumber = token.waitlistNumber;
        session.user.isWaitlistJoined = token.isWaitlistJoined;
      }
      return session;
    }
  },
  providers: [], // Empty array, providers added in auth.ts
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  trustHost: true,
} satisfies NextAuthConfig;

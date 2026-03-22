import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "./db/mongodb";
import { User } from "./db/models/User";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        isAnonymous: { label: "Anonymous", type: "text" }
      },
      async authorize(credentials) {
        if (credentials?.isAnonymous === 'true') {
          // Instantly generate a stateless ephemeral session without calling the DB
          return {
            id: `guest_${Date.now()}`,
            email: `guest_${Date.now()}@anonymous.local`,
            name: "Anonymous User",
            role: "guest",
            onboardingCompleted: true, // Auto-bypass the Waitlist Gate
          };
        }

        if (!credentials?.email || !credentials?.password) return null;

        await connectToDatabase();
        const user = await User.findOne({ email: credentials.email });

        if (!user || !user.passwordHash) {
          return null;
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!isPasswordCorrect) {
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.fullName,
          role: user.role,
          onboardingCompleted: user.onboardingCompleted || false,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.onboardingCompleted = user.onboardingCompleted;
      }
      // Allow seamless frontend updating after API mutation
      if (trigger === "update" && session?.onboardingCompleted !== undefined) {
         token.onboardingCompleted = session.onboardingCompleted;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
        session.user.onboardingCompleted = token.onboardingCompleted;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

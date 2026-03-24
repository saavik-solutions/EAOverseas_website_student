import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "./db/mongodb";
import { User } from "./db/models/User";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
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
          waitlistNumber: user.waitlistNumber,
          isWaitlistJoined: user.isWaitlistJoined,
          // Add detailedFilled and state from user object if they exist
          detailedFilled: user.detailedFilled || false,
          state: user.state || null,
        };
      }
    })
  ],
  callbacks: {
    async session({ session, token }: any) {
      if (token) {
          session.user.id = token.id;
          session.user.role = token.role;
          session.user.fullName = token.fullName;
          session.user.detailedFilled = token.detailedFilled;
          session.user.state = token.state;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
          token.id = user.id;
          token.role = user.role;
          token.fullName = user.name;
          token.detailedFilled = user.detailedFilled;
          token.state = user.state;
      } else if (trigger === "update" && session) {
          // Robust update handling for both payload structures
          const data = session.user || session;
          if (data.fullName) token.fullName = data.fullName;
          if (data.detailedFilled !== undefined) token.detailedFilled = data.detailedFilled;
          if (data.state !== undefined) token.state = data.state;
      }
      return token;
    }
  },
  debug: process.env.NODE_ENV === "development",
});

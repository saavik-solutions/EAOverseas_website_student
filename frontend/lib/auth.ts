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
          await connectToDatabase();
          const uniqueHash = Date.now().toString() + Math.random().toString().substring(2, 6);
          const email = `anon_${uniqueHash}@anonymous.local`;
          const passwordHash = await bcrypt.hash(uniqueHash, 10);
          
          const newUser = await User.create({
            fullName: "Anonymous Student",
            email: email,
            passwordHash: passwordHash,
            role: "student",
            onboardingCompleted: true
          });

          return {
            id: newUser._id.toString(),
            email: newUser.email,
            name: newUser.fullName,
            role: newUser.role,
            onboardingCompleted: newUser.onboardingCompleted,
            waitlistNumber: newUser.waitlistNumber,
            isWaitlistJoined: newUser.isWaitlistJoined
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
          waitlistNumber: user.waitlistNumber,
          isWaitlistJoined: user.isWaitlistJoined
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
        token.waitlistNumber = user.waitlistNumber;
        token.isWaitlistJoined = user.isWaitlistJoined;
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
        session.user.waitlistNumber = token.waitlistNumber;
        session.user.isWaitlistJoined = token.isWaitlistJoined;
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
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  trustHost: true,
});

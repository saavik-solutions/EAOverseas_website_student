"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.signIn = exports.auth = exports.handlers = void 0;
const next_auth_1 = __importDefault(require("next-auth"));
const credentials_1 = __importDefault(require("next-auth/providers/credentials"));
const mongodb_1 = __importDefault(require("./db/mongodb"));
const User_1 = require("./db/models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
_a = (0, next_auth_1.default)({
    providers: [
        (0, credentials_1.default)({
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
                if (!credentials?.email || !credentials?.password)
                    return null;
                await (0, mongodb_1.default)();
                const user = await User_1.User.findOne({ email: credentials.email });
                if (!user || !user.passwordHash) {
                    return null;
                }
                const isPasswordCorrect = await bcryptjs_1.default.compare(credentials.password, user.passwordHash);
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
        async jwt({ token, user, trigger, session }) {
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
        async session({ session, token }) {
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
}), exports.handlers = _a.handlers, exports.auth = _a.auth, exports.signIn = _a.signIn, exports.signOut = _a.signOut;

import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    fullName: string;
    email: string;
    passwordHash?: string;
    avatarUrl?: string;
    role: 'student' | 'admin' | 'counsellor' | 'employee';
    onboardingCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String },
        avatarUrl: { type: String },
        role: { type: String, enum: ['student', 'admin', 'counsellor', 'employee'], default: 'student' },
        onboardingCompleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

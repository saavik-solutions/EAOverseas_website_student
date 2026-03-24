import mongoose, { Schema, Document } from 'mongoose';

export interface IPendingUser extends Document {
    fullName: string;
    email: string;
    passwordHash: string;
    phone?: string;
    role: string;
    targetCountries?: string[];
    targetDegree?: string;
    intakeYear?: string;
    intakeSemester?: string;
    budget?: string;
    highestEducation?: string;
    preferredCourse?: string;
    state?: string;
    otp: string;
    otpExpires: Date;
    createdAt: Date;
    updatedAt: Date;
}

const PendingUserSchema: Schema = new Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        phone: { type: String },
        role: { type: String, default: 'student' },
        targetCountries: { type: [String], default: [] },
        targetDegree: { type: String },
        intakeYear: { type: String },
        intakeSemester: { type: String },
        budget: { type: String },
        highestEducation: { type: String },
        preferredCourse: { type: String },
        state: { type: String },
        otp: { type: String, required: true },
        otpExpires: { type: Date, required: true },
    },
    { timestamps: true }
);

// Expire documents after 1 hour automatically
PendingUserSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

export const PendingUser = mongoose.models.PendingUser || mongoose.model<IPendingUser>('PendingUser', PendingUserSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface IAcademicRecord {
    level: string;
    degree: string;
    institution: string;
    score: string;
    year: string;
}

export interface IWorkExperience {
    role: string;
    company: string;
    duration: string;
    description: string;
}

export interface IPAIAnalysis {
    overallScore: number;
    tier: 'Gold' | 'Silver' | 'Bronze';
    summary: string;
    strengths: string[];
    improvements: string[];
    targetUniversities: string[];
    recommendedCourses: string[];
    budgetFit: string;
    visaOutlook: string;
    nextSteps: string[];
    generatedAt: Date;
}

export interface IUser extends Document {
    fullName: string;
    email: string;
    passwordHash?: string;
    avatarUrl?: string;
    role: 'student' | 'admin' | 'counsellor' | 'employee';
    gender?: 'male' | 'female' | 'other';
    phone?: string;
    nationality?: string;
    bio?: string;
    skills?: string[];
    education?: IAcademicRecord[];
    experience?: IWorkExperience[];
    targetCountries?: string[];
    targetCourses?: string[];
    targetDegree?: string;
    specialization?: string;
    dob?: Date;
    budget?: string;
    intakeYear?: string;
    intakeSemester?: string;
    ieltsScore?: string;
    toeflScore?: string;
    greScore?: string;
    gmatScore?: string;
    onboardingCompleted: boolean;
    onboardingData?: any;
    paiAnalysis?: IPAIAnalysis;
    isWaitlistJoined: boolean;
    waitlistNumber?: number;
    resumeText?: string;
    savedPosts?: mongoose.Schema.Types.ObjectId[];
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
        gender: { type: String, enum: ['male', 'female', 'other'] },
        phone: { type: String },
        nationality: { type: String },
        bio: { type: String },
        skills: { type: [String], default: [] },
        education: { type: [Object], default: [] },
        experience: { type: [Object], default: [] },
        targetCountries: { type: [String], default: [] },
        targetCourses: { type: [String], default: [] },
        targetDegree: { type: String },
        specialization: { type: String },
        dob: { type: Date },
        budget: { type: String },
        intakeYear: { type: String },
        intakeSemester: { type: String },
        ieltsScore: { type: String },
        toeflScore: { type: String },
        greScore: { type: String },
        gmatScore: { type: String },
        onboardingCompleted: { type: Boolean, default: false },
        onboardingData: { type: Object },
        paiAnalysis: { type: Object },
        isWaitlistJoined: { type: Boolean, default: false },
        waitlistNumber: { type: Number },
        resumeText: { type: String },
        savedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    },
    { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { User } from '@/lib/db/models/User';
import { PendingUser } from '@/lib/db/models/PendingUser';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { 
      fullName, email, password, role, 
      phone, state
    } = await request.json();

    if (!fullName || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if a VERIFIED user already exists
    const existingVerifiedUser = await User.findOne({ email });
    if (existingVerifiedUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Upsert PendingUser (update if already exists, otherwise create)
    await PendingUser.findOneAndUpdate(
      { email },
      {
        fullName,
        passwordHash,
        role: role || 'student',
        phone,
        state,
        otp,
        otpExpires,
      },
      { upsert: true, new: true }
    );

    // Send OTP via email
    try {
      await transporter.sendMail({
        from: `"EAOverseas" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Verify your EAOverseas Account",
        text: `Your verification code is: ${otp}. It expires in 10 minutes.`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #6366f1;">Welcome to EAOverseas!</h2>
            <p>Your verification code for creating your account is:</p>
            <div style="font-size: 32px; font-weight: bold; color: #4338ca; letter-spacing: 5px; margin: 20px 0;">
              ${otp}
            </div>
            <p style="color: #666;">This code will expire in 10 minutes.</p>
            <p style="font-size: 12px; color: #999; margin-top: 40px;">If you didn't request this, please ignore this email.</p>
          </div>
        `,
      });
    } catch (mailError) {
      console.error("Failed to send OTP email:", mailError);
    }

    return NextResponse.json({ 
      message: "OTP sent successfully. Please verify your email.",
      success: true
    }, { status: 201 });

  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

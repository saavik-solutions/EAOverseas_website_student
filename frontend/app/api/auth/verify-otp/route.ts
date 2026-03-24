import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { User } from '@/lib/db/models/User';
import { PendingUser } from '@/lib/db/models/PendingUser';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const trimmedEmail = email.trim();
    const trimmedOtp = otp.trim();

    // Find in PendingUser
    const pendingUser = await PendingUser.findOne({ email: trimmedEmail });

    if (!pendingUser) {
      // Check if already verified
      const existingUser = await User.findOne({ email: trimmedEmail });
      if (existingUser) {
        return NextResponse.json({ message: "Email already verified", success: true }, { status: 200 });
      }
      return NextResponse.json({ error: "No pending registration found for this email" }, { status: 404 });
    }

    // Check OTP and expiration
    if (pendingUser.otp.trim() !== trimmedOtp) {
      return NextResponse.json({ error: "Invalid verification code" }, { status: 400 });
    }

    if (new Date() > pendingUser.otpExpires) {
      return NextResponse.json({ error: "Verification code expired" }, { status: 400 });
    }

    // Assign waitlist number at the moment of verification
    const waitlistNumber = (await User.countDocuments({ isWaitlistJoined: true })) + 755;

    // Create real User
    const newUser = await User.create({
      fullName: pendingUser.fullName,
      email: pendingUser.email,
      passwordHash: pendingUser.passwordHash,
      role: pendingUser.role,
      phone: pendingUser.phone,
      targetCountries: pendingUser.targetCountries,
      targetDegree: pendingUser.targetDegree,
      intakeYear: pendingUser.intakeYear,
      intakeSemester: pendingUser.intakeSemester,
      budget: pendingUser.budget,
      highestEducation: pendingUser.highestEducation,
      preferredCourse: pendingUser.preferredCourse,
      isEmailVerified: true,
      isWaitlistJoined: true,
      waitlistNumber,
      onboardingCompleted: true
    });

    // Delete PendingUser
    await PendingUser.deleteOne({ _id: pendingUser._id });

    return NextResponse.json({ 
      message: "Email verified successfully",
      success: true,
      user: { id: newUser._id, email: newUser.email, role: newUser.role }
    }, { status: 200 });

  } catch (error: any) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

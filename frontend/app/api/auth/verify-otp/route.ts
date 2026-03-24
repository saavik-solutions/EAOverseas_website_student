import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

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
      state: pendingUser.state,
      isEmailVerified: true,
      isWaitlistJoined: true,
      waitlistNumber,
      onboardingCompleted: false,
      detailedFilled: false
    });

    // Send Welcome Email
    try {
      await transporter.sendMail({
        from: `"EAOverseas" <${process.env.SMTP_USER}>`,
        to: newUser.email,
        subject: "Welcome to EAOverseas! 🌍",
        html: `
          <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #ffffff; border: 1px solid #f1f5f9; border-radius: 24px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center; margin-bottom: 32px;">
              <h1 style="color: #D946EF; font-size: 32px; font-weight: 900; margin: 0; letter-spacing: -0.025em;">EAOverseas</h1>
              <p style="color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; font-size: 12px; margin-top: 8px;">Your Global Education Journey Starts Here</p>
            </div>
            
            <div style="margin-bottom: 32px;">
              <h2 style="color: #0f172a; font-size: 24px; font-weight: 800; margin-bottom: 16px;">Welcome aboard, ${newUser.fullName}! ✨</h2>
              <p style="color: #475569; line-height: 1.6; margin-bottom: 24px;">Your account has been successfully verified! You're now part of a global community of students chasing their international dreams.</p>
              
              <div style="background-color: #f8fafc; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
                <h3 style="color: #0f172a; font-size: 16px; font-weight: 700; margin-top: 0;">Your Priority Status:</h3>
                <div style="display: flex; align-items: center; margin-top: 12px;">
                  <div style="background-color: #D946EF; color: white; font-weight: 900; padding: 12px 20px; border-radius: 12px; font-size: 20px;">
                    #${waitlistNumber}
                  </div>
                  <div style="margin-left: 16px;">
                    <p style="color: #64748b; font-size: 13px; font-weight: 500; margin: 0;">Waitlist Position</p>
                    <p style="color: #0f172a; font-size: 14px; font-weight: 700; margin: 0;">Elite Access Granted</p>
                  </div>
                </div>
              </div>
            </div>

            <div style="text-align: center;">
              <a href="https://eaoverseas.com/dashboard" style="display: inline-block; background-color: #D946EF; color: white; text-decoration: none; padding: 18px 36px; border-radius: 14px; font-weight: 800; font-size: 15px; transition: all 0.3s ease; box-shadow: 0 4px 14px 0 rgba(217, 70, 239, 0.39);">
                Go to Dashboard
              </a>
            </div>

            <div style="margin-top: 48px; padding-top: 32px; border-top: 1px solid #f1f5f9; text-align: center;">
              <p style="color: #94a3b8; font-size: 14px;">Need help? Reply to this email or visit our website.</p>
              <p style="color: #cbd5e1; font-size: 12px; margin-top: 16px;">© ${new Date().getFullYear()} EAOverseas. All rights reserved.</p>
            </div>
          </div>
        `,
      });
    } catch (mailError) {
      console.error("Failed to send welcome email:", mailError);
    }

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

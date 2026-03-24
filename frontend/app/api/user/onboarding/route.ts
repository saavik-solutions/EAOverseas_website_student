import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { User } from '@/lib/db/models/User';
import { auth } from '@/lib/auth';

export async function PUT(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    await connectToDatabase();

    // Securely update the user with the full onboarding data
    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      {
        onboardingCompleted: body.onboardingCompleted ?? false,
        onboardingData: body,
        fullName: body.fullName || session.user.name,
        gender: body.gender,
        phone: body.phone,
        nationality: body.nationality,
        dob: body.dob ? new Date(body.dob) : undefined,
        education: body.education || [],
        experience: body.experience || [],
        targetCountries: body.targetCountries || [],
        targetCourses: body.targetCourses ? [body.targetCourses] : [],
        targetDegree: body.targetDegree,
        specialization: body.specialization,
        budget: body.budget,
        intakeYear: body.intakeYear,
        intakeSemester: body.intakeSemester,
        ieltsScore: body.ieltsScore,
        toeflScore: body.toeflScore,
        greScore: body.greScore,
        gmatScore: body.gmatScore,
        paiAnalysis: body.paiAnalysis,
        isWaitlistJoined: true,
        waitlistNumber: (await User.countDocuments()) + 755,
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found in system' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: updatedUser }, { status: 200 });

  } catch (error) {
    console.error('Onboarding Update Error:', error);
    return NextResponse.json({ error: 'Failed to synchronize onboarding state' }, { status: 500 });
  }
}

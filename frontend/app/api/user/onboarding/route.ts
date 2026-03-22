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

    // Securely update the user flag directly in MongoDB
    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      {
        onboardingCompleted: true,
        // We can capture the form survey data here in the future
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

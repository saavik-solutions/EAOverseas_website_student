import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { User } from '@/lib/db/models/User';
import { auth } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { education, futurePlans, budget } = body;

    await connectToDatabase();

    // Transform education to the academic record format if it's a string
    const educationRecord = typeof education === 'string' 
      ? [{ level: education, degree: '', institution: '', score: '', year: '' }]
      : education;

    const user = await User.findByIdAndUpdate(
      session.user.id,
      {
        education: educationRecord,
        futurePlans,
        budget,
        isWaitlistJoined: true,
        // Waitlist number is total users + base offset
        waitlistNumber: (await User.countDocuments({ isWaitlistJoined: true })) + 755
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      count: user.waitlistNumber,
      user 
    });

  } catch (error) {
    console.error('Waitlist Join Error:', error);
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 });
  }
}

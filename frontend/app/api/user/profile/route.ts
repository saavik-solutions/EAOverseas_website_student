import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { User } from '@/lib/db/models/User';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();
    console.log("[DEBUG] Session:", !!session);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const user = await User.findById(session.user.id).select('-passwordHash');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    await connectToDatabase();

    const allowedFields = [
      'fullName', 'gender', 'bio', 'skills', 'education', 'experience', 
      'phone', 'nationality', 'targetCountries', 'targetCourses', 'targetDegree',
      'specialization', 'dob', 'budget', 'intakeYear', 'intakeSemester', 
      'ieltsScore', 'toeflScore', 'greScore', 'gmatScore',
      'waitlistNumber', 'isWaitlistJoined'
    ];
    const updateData: any = {};
    
    Object.keys(body).forEach(key => {
      if (allowedFields.includes(key)) {
        updateData[key] = body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      session.user.id,
      { $set: updateData },
      { new: true }
    ).select('-passwordHash');

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}

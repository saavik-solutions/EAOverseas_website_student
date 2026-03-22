import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { User } from '@/lib/db/models/User';

export async function GET() {
  try {
    await connectToDatabase();
    const students = await User.find({ role: 'student' })
      .select('-password')
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ students }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch students:', error);
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = await req.json();
    await connectToDatabase();
    await User.findByIdAndDelete(userId);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete student' }, { status: 500 });
  }
}

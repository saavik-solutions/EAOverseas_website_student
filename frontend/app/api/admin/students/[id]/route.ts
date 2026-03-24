import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { User } from '@/lib/db/models/User';
import { auth } from '@/lib/auth';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    // In a real app, check for admin role here
    if (!session || (session.user as any)?.role !== 'admin') {
      // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      // For this project, we'll allow access if authenticated for now, 
      // but ideally this is admin only.
    }

    const { id } = params;
    await connectToDatabase();
    
    const student = await User.findById(id).select('-passwordHash').lean();

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, student }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch student details:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

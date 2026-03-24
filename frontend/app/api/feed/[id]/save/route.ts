import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { User } from '@/lib/db/models/User';
import { auth } from '@/lib/auth';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized. Please login to save posts.' }, { status: 401 });
    }

    await connectToDatabase();
    
    // Find the user
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: 'User profile not found.' }, { status: 404 });
    }

    // Toggle save status
    const savedPosts = user.savedPosts || [];
    const postIdStr = params.id;
    
    const postIndex = (savedPosts as any[]).findIndex((id: any) => id.toString() === postIdStr);
    let isSaved = false;

    if (postIndex === -1) {
      // Not saved yet, add it
      user.savedPosts.push(postIdStr);
      isSaved = true;
    } else {
      // Already saved, remove it
      user.savedPosts.splice(postIndex, 1);
      isSaved = false;
    }

    await user.save();

    return NextResponse.json({ success: true, isSaved }, { status: 200 });

  } catch (error: any) {
    console.error('Failed to toggle bookmark:', error);
    return NextResponse.json({ error: 'Failed to update saved status.' }, { status: 500 });
  }
}

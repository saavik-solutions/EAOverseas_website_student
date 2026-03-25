import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import Notification from '@/lib/db/models/Notification';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    
    const session = await auth();
    const userId = session?.user?.id;

    // Fetch notifications: Global (userId=null) or targeted to this user
    const notifications = await Notification.find({
      $or: [
        { userId: null },
        { userId: userId }
      ]
    })
    .sort({ createdAt: -1 })
    .limit(20)
    .lean();

    return NextResponse.json({ notifications }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { notificationId } = await req.json();
    await connectToDatabase();
    
    await Notification.findByIdAndUpdate(notificationId, { read: true });
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update notification' }, { status: 500 });
  }
}

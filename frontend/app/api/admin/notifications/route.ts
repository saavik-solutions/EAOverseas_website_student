import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import Notification from '@/lib/db/models/Notification';

export async function GET() {
  try {
    await connectToDatabase();
    const notifications = await Notification.find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();
    return NextResponse.json({ notifications }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { notificationId, all } = await req.json();
    await connectToDatabase();
    
    if (all) {
      await Notification.deleteMany({});
      return NextResponse.json({ success: true, message: 'All notifications cleared' }, { status: 200 });
    }

    await Notification.findByIdAndDelete(notificationId);
    return NextResponse.json({ success: true, message: 'Notification neutralized' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

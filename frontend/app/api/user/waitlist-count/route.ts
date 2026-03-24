import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { User } from '@/lib/db/models/User';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Calculate total waitlist count
    // Base offset of 755 to simulate initial momentum
    const count = await User.countDocuments({ isWaitlistJoined: true });
    const totalCount = count + 755;

    return NextResponse.json({ 
      success: true, 
      count: totalCount 
    });
  } catch (error) {
    console.error('Waitlist Count API Error:', error);
    return NextResponse.json({ 
      success: false, 
      count: 751 // Fallback to safe number
    }, { status: 500 });
  }
}

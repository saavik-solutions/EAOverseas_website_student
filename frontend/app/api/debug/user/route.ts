import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { User } from '@/lib/db/models/User';

export async function GET() {
  try {
    await connectToDatabase();
    // Find absolute any user that has either onboardingData or paiAnalysis
    const users = await User.find({
      $or: [
        { onboardingData: { $exists: true, $ne: {} } },
        { paiAnalysis: { $exists: true } }
      ]
    }).select('fullName email onboardingCompleted onboardingData phone paiAnalysis').lean();
    
    return NextResponse.json({ 
      count: users.length,
      users: users.map(u => ({
        id: u._id,
        name: u.fullName,
        email: u.email,
        hasOnboarding: !!u.onboardingData,
        hasPAI: !!u.paiAnalysis,
        onboardingDataKeys: u.onboardingData ? Object.keys(u.onboardingData) : []
      }))
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to find users' });
  }
}

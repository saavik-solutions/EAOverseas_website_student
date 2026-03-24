import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import connectToDatabase from '@/lib/db/mongodb';
import { User } from '@/lib/db/models/User';
import { PAIEngine, ProfileData } from '@/lib/services/pai-engine';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.json();

    await connectToDatabase();
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Assemble the full profile data strictly typing what the engine expects
    const profile: ProfileData = {
      academic: {
        degree: formData.academic?.degree || user.education?.[0]?.level || 'Bachelors',
        gpa: formData.academic?.gpa || parseFloat(user.education?.[0]?.score || '8.5'),
        year: formData.academic?.year || parseInt(user.education?.[0]?.year || '2024'),
        field: formData.academic?.field || user.specialization || 'General Science'
      },
      tests: {
        ielts: formData.tests?.ielts || parseFloat(user.ieltsScore || '0') || undefined,
        toefl: formData.tests?.toefl || parseFloat(user.toeflScore || '0') || undefined,
        gre: formData.tests?.gre || user.greScore || undefined,
        gmat: formData.tests?.gmat || parseFloat(user.gmatScore || '0') || undefined
      },
      experience: formData.experience || user.experience || [],
      skills: formData.skills || user.skills || [],
      budget: formData.financial?.budget || parseInt(user.budget || '45000'),
      resumeText: user.resumeText || ''
    };

    const analysis = await PAIEngine.analyze(profile);

    // Persist analysis onto user record
    user.paiAnalysis = analysis;
    await user.save();

    return NextResponse.json({ success: true, analysis }, { status: 200 });
  } catch (error: any) {
    console.error('PAI Audit API Error:', error);
    return NextResponse.json({ error: 'Failed to generate PAI Audit', details: error.message }, { status: 500 });
  }
}

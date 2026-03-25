import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { ApiKey } from '@/lib/db/models/ApiKey';
import { auth } from '@/lib/auth';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized. Please login as Admin.' }, { status: 401 });
    }

    await connectToDatabase();
    
    let keyRecord = await ApiKey.findOne({ name: 'Main Website' });
    
    if (!keyRecord) {
      keyRecord = await ApiKey.create({
        name: 'Main Website',
        key: `ea_live_${crypto.randomUUID().replace(/-/g, '')}`,
        isActive: true
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Enterprise API Key is active',
      name: keyRecord.name,
      key: keyRecord.key,
      endpoint: '/api/external/collect'
    }, { status: 200 });

  } catch (error) {
    console.error('Setup Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

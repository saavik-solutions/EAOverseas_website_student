import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { ApiKey } from '@/lib/db/models/ApiKey';
import Lead from '@/lib/db/models/Lead';

export async function POST(req: Request) {
  try {
    const apiKeyHeader = req.headers.get('x-api-key');
    if (!apiKeyHeader) {
      return NextResponse.json({ error: 'Missing API Key' }, { status: 401 });
    }

    await connectToDatabase();
    
    // Validate API Key
    const keyRecord = await ApiKey.findOne({ key: apiKeyHeader, isActive: true });
    if (!keyRecord) {
      return NextResponse.json({ error: 'Invalid or Inactive API Key' }, { status: 403 });
    }

    // Capture Form Data
    const body = await req.json();
    const { source, ...formData } = body;

    const newLead = await Lead.create({
      source: source || keyRecord.name || 'External API',
      data: formData,
      status: 'new'
    });

    // Update Last Used
    await ApiKey.findByIdAndUpdate(keyRecord._id, { lastUsedAt: new Date() });

    return NextResponse.json({ 
      success: true, 
      leadId: newLead._id,
      message: 'Data captured successfully' 
    }, { status: 201 });

  } catch (error) {
    console.error('Lead Collection Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

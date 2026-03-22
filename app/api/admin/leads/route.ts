import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import Lead from '@/lib/db/models/Lead';

export async function GET() {
  try {
    await connectToDatabase();
    const leads = await Lead.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ leads }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { leadId, status } = await req.json();
    await connectToDatabase();
    await Lead.findByIdAndUpdate(leadId, { status });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}

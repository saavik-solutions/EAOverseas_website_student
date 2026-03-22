import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { Blog } from '@/lib/db/models/Blog';
import { Post } from '@/lib/db/models/Post';

export async function POST(req: Request) {
  try {
    const { type, targetId, model } = await req.json();

    if (!['view', 'click'].includes(type) || !targetId || !['Blog', 'Post'].includes(model)) {
      return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    await connectToDatabase();

    const updateQuery = type === 'view' ? { $inc: { views: 1 } } : { $inc: { clicks: 1 } };
    const ModelClass = model === 'Blog' ? Blog : Post;

    // Use findByIdAndUpdate for atomic increment, bypassing full document fetching
    const result = await ModelClass.findByIdAndUpdate(targetId, updateQuery, { new: true });

    if (!result) {
      return NextResponse.json({ error: 'Target not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json({ error: 'Failed to track engagement' }, { status: 500 });
  }
}

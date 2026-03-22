import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { Post } from '@/lib/db/models/Post';

export async function GET() {
  try {
    await connectToDatabase();
    const posts = await Post.find({ isGlobal: false })
      .populate('authorId', 'fullName email')
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { postId, ...updates } = await req.json();
    await connectToDatabase();
    await Post.findByIdAndUpdate(postId, updates);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { postId } = await req.json();
    await connectToDatabase();
    await Post.findByIdAndDelete(postId);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { Post } from '@/lib/db/models/Post';
import Notification from '@/lib/db/models/Notification';

export async function GET() {
  try {
    await connectToDatabase();
    const posts = await Post.find({ isGlobal: true })
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, content, flair, authorId } = await req.json();

    await connectToDatabase();

    const newGlobalPost = await Post.create({
      authorId: authorId || 'admin-system',
      authorName: 'EAOverseas Official',
      title,
      content,
      category: 'global',
      isGlobal: true,
      flair: flair || 'Announcement',
      published: true
    });

    await Notification.create({
      type: 'warning',
      message: `Official Update: "${title}"`,
      targetId: newGlobalPost._id.toString(),
      targetType: 'global'
    });

    return NextResponse.json({ success: true }, { status: 201 });
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

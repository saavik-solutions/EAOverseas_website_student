import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { Post } from '@/lib/db/models/Post';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    
    // Increment strict views implicitly when fetching a single specific post
    const post = await Post.findByIdAndUpdate(
      params.id,
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate('authorId', 'fullName avatarUrl role')
      .populate('commentsList.userId', 'fullName avatarUrl')
      .populate('commentsList.replies.userId', 'fullName avatarUrl')
      .lean();
      
    if (!post) {
      return NextResponse.json({ error: 'Post not found in the community database' }, { status: 404 });
    }
    
    return NextResponse.json({ post }, { status: 200 });
  } catch (error: any) {
    console.error('Failed to resolve single post:', error);
    return NextResponse.json({ error: 'Internal system fault during post hydration' }, { status: 500 });
  }
}

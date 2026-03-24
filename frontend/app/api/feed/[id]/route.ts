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

    // Check if current user saved the post
    const { auth } = await import('@/lib/auth');
    const { User } = await import('@/lib/db/models/User');
    const session = await auth();
    
    let isSavedByCurrentUser = false;
    if (session?.user?.id) {
      const user = await User.findById(session.user.id).select('savedPosts').lean();
      if (user && user.savedPosts) {
        isSavedByCurrentUser = user.savedPosts.some((id: any) => id.toString() === params.id);
      }
    }
    
    return NextResponse.json({ post: { ...post, isSavedByCurrentUser } }, { status: 200 });
  } catch (error: any) {
    console.error('Failed to resolve single post:', error);
    return NextResponse.json({ error: 'Internal system fault during post hydration' }, { status: 500 });
  }
}

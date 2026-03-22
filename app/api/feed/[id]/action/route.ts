import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { Post } from '@/lib/db/models/Post';
import { auth } from '@/lib/auth';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, text, commentId } = await req.json();
    const postId = params.id;
    const userId = session.user.id;

    await connectToDatabase();

    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    if (action === 'like') {
      const hasLiked = post.upvotes.includes(userId);
      if (hasLiked) {
        // Unlike
        post.upvotes = post.upvotes.filter((id: any) => id.toString() !== userId);
      } else {
        // Like
        post.upvotes.push(userId);
      }
      await post.save();
    } else if (action === 'comment') {
      if (!text) {
        return NextResponse.json({ error: 'Comment text required' }, { status: 400 });
      }
      post.commentsList.push({
        userId,
        text,
        createdAt: new Date()
      });
      await post.save();
    } else if (action === 'reply') {
      if (!text || !commentId) {
        return NextResponse.json({ error: 'Text and target commentId required' }, { status: 400 });
      }
      const targetComment = post.commentsList.find((c: any) => c._id.toString() === commentId);
      if (!targetComment) return NextResponse.json({ error: 'Target comment not found' }, { status: 404 });
      
      if (!targetComment.replies) targetComment.replies = [];
      targetComment.replies.push({
        userId,
        text,
        createdAt: new Date()
      });
      await post.save();
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Return the updated post
    const updatedPost = await Post.findById(postId)
      .populate('authorId', 'fullName avatarUrl role')
      .populate('commentsList.userId', 'fullName avatarUrl')
      .lean();

    return NextResponse.json({ post: updatedPost }, { status: 200 });
  } catch (error) {
    console.error('Failed to perform action:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { Post } from '@/lib/db/models/Post';
import { auth } from '@/lib/auth';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();

    const { action, text, commentId } = await req.json();
    const postId = params.id;
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || 'unknown-ip';
    const userId = session?.user?.id || null;
    const userIp = session?.user?.id ? null : ip;
    const userName = session?.user?.name || 'Anonymous Student';

    console.log(`[ACTION_API] Processing ${action} for post ${postId}`);

    await connectToDatabase();

    const post = await Post.findById(postId);
    if (!post) {
      console.error(`[ACTION_API] Post not found: ${postId}`);
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    if (action === 'like') {
      const identifier = userId || userIp || 'unknown';
      const hasLiked = post.upvotes.includes(identifier);
      if (hasLiked) {
        post.upvotes = post.upvotes.filter((id: string) => id !== identifier);
      } else {
        post.upvotes.push(identifier);
      }
      await post.save();
    } else if (action === 'comment') {
      if (!text) {
        return NextResponse.json({ error: 'Comment text required' }, { status: 400 });
      }
      const commentPayload: any = {
        userName,
        text,
        createdAt: new Date()
      };
      if (userId) commentPayload.userId = userId;
      if (userIp) commentPayload.userIp = userIp;
      
      post.commentsList.push(commentPayload);
      await post.save();
    } else if (action === 'reply') {
      if (!text || !commentId) {
        return NextResponse.json({ error: 'Text and target commentId required' }, { status: 400 });
      }
      const targetComment = post.commentsList.find((c: any) => c._id.toString() === commentId);
      if (!targetComment) return NextResponse.json({ error: 'Target comment not found' }, { status: 404 });
      
      if (!targetComment.replies) targetComment.replies = [];
      const replyPayload: any = {
        userName,
        text,
        createdAt: new Date()
      };
      if (userId) replyPayload.userId = userId;
      if (userIp) replyPayload.userIp = userIp;

      targetComment.replies.push(replyPayload);
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
  } catch (error: any) {
    console.error('[ACTION_API] CRITICAL ERROR:', error.message, error.stack);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

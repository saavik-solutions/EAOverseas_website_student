import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { Post } from '@/lib/db/models/Post';
import { User } from '@/lib/db/models/User';
import Notification from '@/lib/db/models/Notification';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Fetch all posts with populated author details
    const posts = await Post.find()
      .populate({ path: 'authorId', model: User, select: 'fullName avatarUrl role' })
      .populate({ path: 'commentsList.userId', model: User, select: 'fullName avatarUrl' })
      .sort({ createdAt: -1 })
      .lean();
    
    const totalPosts = await Post.countDocuments();
    
    const topContributors = totalPosts > 0 ? await Post.aggregate([
      {
         $group: {
           _id: { $ifNull: ["$authorName", "Anonymous Student"] },
           posts: { $sum: 1 }
         }
      },
      { $sort: { posts: -1 } },
      { $limit: 5 },
      { $project: { name: "$_id", posts: 1, _id: 0 } }
    ]) : [];
    
    const onlineNow = Math.floor(Math.random() * 42) + 128;

    return NextResponse.json({ posts, stats: { totalPosts, onlineNow, topContributors } }, { status: 200 });
  } catch (error: any) {
    console.error('[FEED_API_GET_ERROR] Failed to fetch feed:', error);
    return NextResponse.json({ error: 'Failed to fetch feed', details: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const { content, title, category, tags, flair } = await req.json();

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    await connectToDatabase();

    const authorNameFallback = 'Anonymous Student';
    const postPayload: any = {
      authorName: session?.user?.name || authorNameFallback,
      title: title || 'Community Discussion',
      content,
      category: category || 'general',
      tags: tags || [],
      flair: flair || 'Discussion',
    };

    if (session?.user?.id) {
      postPayload.authorId = session.user.id;
    }

    const newPost = await Post.create(postPayload);

    const populatedPost = await Post.findById(newPost._id)
      .populate('authorId', 'fullName avatarUrl role')
      .lean();

    // Create a notification for the community
    await Notification.create({
      type: 'info',
      message: `New Community Post: "${title || 'Untitled'}" by ${session?.user?.name || authorNameFallback}`,
      targetId: newPost._id.toString(),
      targetType: 'post'
    });

    return NextResponse.json({ post: populatedPost }, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create post:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

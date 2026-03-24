import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { Post } from '@/lib/db/models/Post';
import Notification from '@/lib/db/models/Notification';
import mongoose from 'mongoose';

export async function GET() {
  try {
    const conn = await connectToDatabase();
    
    // Check both ways to be sure
    let posts = [];
    if (mongoose.connection.db) {
      const cursor = await mongoose.connection.db.collection('community').find({ isGlobal: true }).sort({ createdAt: -1 });
      posts = await cursor.toArray();
      console.log('[BROADCAST_API_GET] Total global posts found via raw drive:', posts.length);
    } else {
      posts = await Post.find({ isGlobal: true }).sort({ createdAt: -1 }).lean();
    }

    return NextResponse.json({ posts, debug: { db: mongoose.connection.name, count: posts.length } }, { status: 200 });
  } catch (error: any) {
    console.error('[BROADCAST_API_GET_ERROR]', error);
    return NextResponse.json({ error: 'Failed', details: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, flair, authorId, imageUrl } = body;

    console.log('[BROADCAST_API_POST] Data received:', JSON.stringify(body, null, 2));

    await connectToDatabase();

    const postData: any = {
      authorId: authorId ? new mongoose.Types.ObjectId(authorId) : new mongoose.Types.ObjectId(),
      authorName: 'EAOverseas Official',
      title,
      content,
      imageUrl: imageUrl || '',
      category: 'global',
      isGlobal: true,
      flair: flair || 'Announcement',
      published: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    let newPostId;
    if (mongoose.connection.db) {
      const result = await mongoose.connection.db.collection('community').insertOne(postData);
      newPostId = result.insertedId;
      console.log('[BROADCAST_API_POST] Inserted directly to collection "community":', newPostId);
    } else {
      const newGlobalPost = await Post.create(postData);
      newPostId = newGlobalPost._id;
      console.log('[BROADCAST_API_POST] Created via Mongoose model:', newPostId);
    }

    try {
      await Notification.create({
        type: 'warning',
        message: `Official Update: "${title}"`,
        targetId: newPostId.toString(),
        targetType: 'global'
      });
    } catch (notificationError) {
      console.error('[BROADCAST_API_NOTIFICATION_ERROR]', notificationError);
    }

    return NextResponse.json({ success: true, postId: newPostId }, { status: 201 });
  } catch (error: any) {
    console.error('[BROADCAST_API_POST_ERROR]', error);
    return NextResponse.json({ error: 'Failed', details: error.message }, { status: 500 });
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
    if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
       return NextResponse.json({ error: 'Invalid Intel Identifier' }, { status: 400 });
    }

    await connectToDatabase();
    
    // 1. Terminate the broadcast record
    // We try both Mongoose and direct collection to be absolutely sure
    const deletedPost = await Post.findByIdAndDelete(postId);
    
    if (!deletedPost && mongoose.connection.db) {
       await mongoose.connection.db.collection('community').deleteOne({ _id: new mongoose.Types.ObjectId(postId) });
    }
    
    // 2. Cascade: Neutralize associated notification signals
    try {
       await Notification.deleteMany({ targetId: postId.toString() });
    } catch (notifErr) {
       console.error('[BROADCAST_DELETE_CASCADE_ERROR]', notifErr);
    }
    
    console.log(`[BROADCAST_API_DELETE] Item ${postId} terminated and signals neutralized.`);
    return NextResponse.json({ success: true, message: 'Institutional record terminated.' }, { status: 200 });
  } catch (error: any) {
    console.error('[BROADCAST_API_DELETE_ERROR]', error);
    return NextResponse.json({ error: 'Termination Failed', details: error.message }, { status: 500 });
  }
}

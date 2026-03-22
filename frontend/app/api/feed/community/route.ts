import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { Post } from '@/lib/db/models/Post';
import { User } from '@/lib/db/models/User';

export async function GET() {
  try {
    await connectToDatabase();
    // Fetch posts and populate author details if needed
    const posts = await Post.find().sort({ createdAt: -1 }).limit(20);
    return NextResponse.json(posts);
  } catch (error: any) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Fail fast if DB connection takes too long
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Database operation timed out. Please check IP Whitelist.')), 8000)
    );

    const dbOperation = async () => {
      await connectToDatabase();
      const body = await request.json();
      
      // For now, use a mock user if none exists (until auth is fully integrated)
      let mockUser = await User.findOne({ email: 'demo@eaoverseas.com' });
      if (!mockUser) {
        mockUser = await User.create({
          fullName: 'Demo User',
          email: 'demo@eaoverseas.com',
          avatarUrl: 'https://ui-avatars.com/api/?name=Demo+User&background=6366f1&color=fff',
          role: 'student'
        });
      }

      const { title, content, category, tags } = body;

      const newPost = await Post.create({
        authorId: mockUser._id,
        authorName: mockUser.fullName,
        authorAvatar: mockUser.avatarUrl,
        title,
        content,
        category: category || 'general',
        tags: tags || [],
        upvotes: 0,
        comments: 0
      });

      return NextResponse.json(newPost, { status: 201 });
    };

    return await Promise.race([dbOperation(), timeoutPromise]) as NextResponse;

  } catch (error: any) {
    console.error("Failed to create post:", error);
    return NextResponse.json({ error: error.message || "Database connection failed." }, { status: 500 });
  }
}

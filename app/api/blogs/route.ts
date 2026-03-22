import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { Blog } from '@/lib/db/models/Blog';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    await connectToDatabase();
    const blogs = await Blog.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, content, category, excerpt, featuredImage } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    await connectToDatabase();

    const newBlog = await Blog.create({
      title,
      slug: title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
      content,
      category,
      excerpt,
      featuredImage,
      authorId: session.user.id,
      published: true
    });

    return NextResponse.json({ blog: newBlog }, { status: 201 });
  } catch (error) {
    console.error('Blog creation error:', error);
    return NextResponse.json({ error: 'Failed to publish blog' }, { status: 500 });
  }
}

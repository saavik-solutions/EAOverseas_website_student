import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { Blog } from '@/lib/db/models/Blog';

// AUTH NEUTRALIZED AS PER USER REQUEST - OPEN ACCESS FOR ADMIN OPS
export async function GET() {
  try {
    await connectToDatabase();
    const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    console.error('[ADMIN_BLOGS_GET_ERROR]:', error);
    return NextResponse.json({ error: 'Failed to synchronize editorial repository' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await connectToDatabase();

    // Auto-generate slug if not provided or empty
    if (!data.slug || data.slug.trim() === '') {
      data.slug = data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }

    const blog = await Blog.create(data);
    return NextResponse.json({ success: true, blog }, { status: 201 });
  } catch (error: any) {
    console.error('[ADMIN_BLOGS_POST_ERROR]:', error);
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Slug Conflict: An article with this institutional identifier already exists.' }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'Failed to deploy intelligence node' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, ...updates } = await req.json();
    await connectToDatabase();
    
    // Auto-generate slug on update if title changed and no slug provided
    if (updates.title && (!updates.slug || updates.slug.trim() === '')) {
      updates.slug = updates.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }

    const blog = await Blog.findByIdAndUpdate(id, updates, { new: true });
    
    if (!blog) {
       return NextResponse.json({ error: 'Intelligence Node Not Found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, blog }, { status: 200 });
  } catch (error: any) {
    console.error('[ADMIN_BLOGS_PATCH_ERROR]:', error);
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Slug Conflict: Target identifier is already allocated.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to refine intelligence node' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await connectToDatabase();
    const blog = await Blog.findByIdAndDelete(id);
    
    if (!blog) {
       return NextResponse.json({ error: 'Intelligence Node Not Found' }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[ADMIN_BLOGS_DELETE_ERROR]:', error);
    return NextResponse.json({ error: 'Failed to terminate intelligence node' }, { status: 500 });
  }
}

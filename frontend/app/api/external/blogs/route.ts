import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { Blog } from '@/lib/db/models/Blog';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    
    await connectToDatabase();
    
    let query: any = { published: true };
    if (category) {
      query.tags = { $in: [category] }; // Using tags as categories for external fetch
    }

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .select('title slug excerpt coverImage readTime tags createdAt')
      .lean();

    return NextResponse.json({ 
      success: true, 
      count: blogs.length,
      blogs 
    }, { 
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}

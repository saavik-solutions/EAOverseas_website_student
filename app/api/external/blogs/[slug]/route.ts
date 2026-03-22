import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { Blog } from '@/lib/db/models/Blog';

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    await connectToDatabase();
    
    // Fetch individual intelligence node with full content payload
    const blog = await Blog.findOne({ slug, published: true })
      .select('title slug content excerpt coverImage readTime tags authorName createdAt')
      .lean();

    if (!blog) {
      return NextResponse.json({ success: false, error: 'Intelligence Node Not Found' }, { 
        status: 404,
        headers: { 'Access-Control-Allow-Origin': '*' }
      });
    }

    // Standard institutional delivery with CORS
    return NextResponse.json({ 
      success: true, 
      blog 
    }, { 
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to retrieve intelligence payload' }, { 
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
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

import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { Blog } from '@/lib/db/models/Blog';
import { ApiKey } from '@/lib/db/models/ApiKey';

export async function GET(req: Request) {
  try {
    const apiKey = req.headers.get('x-api-key');

    if (!apiKey) {
      return NextResponse.json({ error: 'Missing x-api-key header' }, { status: 401 });
    }

    await connectToDatabase();

    // Strict validation of API Key
    const validKey = await ApiKey.findOneAndUpdate(
      { key: apiKey, isActive: true },
      { lastUsedAt: new Date() },
      { new: true }
    );

    if (!validKey) {
      return NextResponse.json({ error: 'Invalid or inactive API Key' }, { status: 403 });
    }

    // Fetch published blogs only
    const blogs = await Blog.find({ published: true })
      .select('-__v -authorId -clicks') // Exclude internal analytics from public CMS API
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    console.error('External Blogs API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

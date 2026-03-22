import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { Blog } from '@/lib/db/models/Blog';
import { User } from '@/lib/db/models/User';
import { Post } from '@/lib/db/models/Post';

// AUTH NEUTRALIZED AS PER USER REQUEST - OPEN ACCESS FOR ADMIN METRICS
export async function GET() {
  try {
    await connectToDatabase();

    // 1. Blog Metrics (Published vs Draft)
    const publishedBlogs = await Blog.countDocuments({ published: true });
    const draftBlogs = await Blog.countDocuments({ published: false });

    // 2. User Growth (Last 30 days)
    const totalUsers = await User.countDocuments();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newUsersLast30Days = await User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });

    // 3. Social Broadcasts
    const totalBroadcasts = await Post.countDocuments({ category: 'global' });

    // 4. Active Students
    const activeStudents = await User.countDocuments({ role: 'student' });

    // 5. Daily Growth Strategy (Mocking for UI chart until telemetry table ready)
    const dailyGrowth = [
      { date: 'Mon', count: 12 },
      { date: 'Tue', count: 18 },
      { date: 'Wed', count: 15 },
      { date: 'Thu', count: 22 },
      { date: 'Fri', count: 30 },
      { date: 'Sat', count: 25 },
      { date: 'Sun', count: 28 },
    ];

    return NextResponse.json({
      totalUsers,
      totalBlogs: publishedBlogs + draftBlogs,
      publishedBlogs,
      draftBlogs,
      totalPosts: totalBroadcasts,
      userGrowth: newUsersLast30Days,
      activeStudents,
      dailyGrowth,
      maxDaily: 35
    }, { status: 200 });
  } catch (error) {
    console.error('[ADMIN_METRICS_ERROR]:', error);
    return NextResponse.json({ error: 'Failed to synchronize system telemetry' }, { status: 500 });
  }
}

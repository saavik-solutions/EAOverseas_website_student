import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import Lead from '@/lib/db/models/Lead';
import mongoose from 'mongoose';

// Ensure the models are registered
import '@/lib/db/models/User';
import '@/lib/db/models/Blog';
import '@/lib/db/models/Post';

export async function GET() {
  try {
    await connectToDatabase();
    
    const adminId = new mongoose.Types.ObjectId();
    const User = mongoose.models.User;
    const Blog = mongoose.models.Blog;
    const Post = mongoose.models.Post;
    console.log('--- Ephemeral Seeding Protocol Active ---');

    // 1. Students
    const studentData = [
      { fullName: 'Vikram Malhotra', email: 'vikram@overseas.com', role: 'student' },
      { fullName: 'Ananya Iyer', email: 'ananya@overseas.com', role: 'student' },
      { fullName: 'Zaid Khan', email: 'zaid@overseas.com', role: 'student' }
    ];
    for (const s of studentData) {
      await User.findOneAndUpdate({ email: s.email }, s, { upsert: true });
    }

    // 2. Blogs
    const blogData = [
      { 
        title: 'Mastering the 2026 UK Visa Interview', 
        slug: 'uk-visa-interview-2026',
        excerpt: 'The ultimate guide to passing your credibility interview with flying colors.',
        content: 'Content detailing specific questions around financial capability and academic intent...',
        published: true,
        category: 'visa'
      },
      { 
        title: 'Housing in Melbourne: A Student Perspective', 
        slug: 'melbourne-housing-guide',
        excerpt: 'Finding affordable student housing in the heart of Melbourne.',
        content: 'Deep dive into suburb rankings and rental costs...',
        published: true,
        category: 'accommodation'
      }
    ];
    for (const b of blogData) {
      await Blog.findOneAndUpdate({ slug: b.slug }, b, { upsert: true });
    }

    // 3. Broadcasts
    const broadcasts = [
      {
        authorId: adminId,
        authorName: 'EAOverseas Official',
        title: 'Important: IELTS Score Requirements Updated',
        content: 'Several Australian universities have increased minimum band requirements for the 2026 intake.',
        category: 'global',
        isGlobal: true,
        flair: 'Update',
        published: true
      }
    ];
    for (const b of broadcasts) {
      await Post.findOneAndUpdate({ title: b.title }, b, { upsert: true });
    }

    // 4. Leads
    const leadData = [
      { source: 'External Web Form', data: { name: 'Siddharth Rao', email: 'sid@gmail.com', city: 'Mumbai' }, status: 'new' },
      { source: 'Fair Intake', data: { name: 'Neha Sharma', email: 'neha@gmail.com', interest: 'MBA' }, status: 'contacted' }
    ];
    for (const l of leadData) {
      await Lead.create(l);
    }

    return NextResponse.json({ success: true, message: 'Production intelligence seeded successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

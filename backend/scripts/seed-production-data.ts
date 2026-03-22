import mongoose from 'mongoose';
import connectToDatabase from '../lib/db/mongodb';
import { User } from '../lib/db/models/User';
import { Blog } from '../lib/db/models/Blog';
import { Post } from '../lib/db/models/Post';
import Lead from '../lib/db/models/Lead';
import crypto from 'crypto';

async function seedData() {
  await connectToDatabase();
  console.log('--- Initializing Data Seeding Protocol ---');

  // 1. Seed Students
  const students = [
    { fullName: 'Aarav Sharma', email: 'aarav@example.com', role: 'student' },
    { fullName: 'Priya Patel', email: 'priya@example.com', role: 'student' },
    { fullName: 'Rahul Verma', email: 'rahul@example.com', role: 'student' },
    { fullName: 'Ishani Gupta', email: 'ishani@example.com', role: 'student' },
  ];

  for (const s of students) {
    await User.findOneAndUpdate({ email: s.email }, s, { upsert: true, new: true });
  }
  console.log('✔ Students Seeded');

  // 2. Seed Blogs
  const blogs = [
    { 
      title: 'Top 10 UK Universities for STEM in 2026', 
      slug: 'top-10-uk-stem-2026',
      excerpt: 'A comprehensive review of the UKs leading STEM institutions...',
      content: 'Full analysis of Oxford, Cambridge, Imperial, and more...',
      published: true,
      category: 'university'
    },
    { 
      title: 'Draft: Australia Visa Changes', 
      slug: 'australia-visa-changes-draft',
      excerpt: 'Internal draft regarding upcoming subclass 500 changes.',
      content: 'Confidential draft content...',
      published: false,
      category: 'visa'
    }
  ];

  for (const b of blogs) {
    await Blog.findOneAndUpdate({ slug: b.slug }, b, { upsert: true });
  }
  console.log('✔ Blogs Seeded');

  // 3. Seed Global Broadcasts
  const admin = await User.findOne({ role: 'admin' });
  const adminId = admin?._id || new mongoose.Types.ObjectId();

  const broadcasts = [
    {
      authorId: adminId,
      authorName: 'EAOverseas Official',
      title: 'Spring 2026 Intake Now Open!',
      content: 'Global applications for the Spring 2026 session are officially open today.',
      category: 'global',
      isGlobal: true,
      flair: 'Announcement',
      published: true
    },
    {
      authorId: adminId,
      authorName: 'EAOverseas Official',
      title: 'Urgent: Housing Shortage Alert',
      content: 'Critical shortage of accommodation in Manchester area. Apply to university halls immediately.',
      category: 'global',
      isGlobal: true,
      flair: 'Alerts',
      published: true
    }
  ];

  for (const b of broadcasts) {
    await Post.findOneAndUpdate({ title: b.title }, b, { upsert: true });
  }
  console.log('✔ Global Broadcasts Seeded');

  // 4. Seed Community Posts
  const student = await User.findOne({ role: 'student' });
  const studentId = student?._id || new mongoose.Types.ObjectId();

  const communityPosts = [
    {
      authorId: studentId,
      authorName: student?.fullName || 'Aarav Sharma',
      title: 'Looking for roommates in London',
      content: 'Hey guys, I am starting at UCL this September. Anyone looking for a flat?',
      category: 'general',
      isGlobal: false,
      flair: 'Housing',
      published: true
    }
  ];

  for (const cp of communityPosts) {
    await Post.findOneAndUpdate({ title: cp.title }, cp, { upsert: true });
  }
  console.log('✔ Community Posts Seeded');

  // 5. Seed Leads
  const leads = [
    { source: 'London Landing Page', data: { name: 'Vikram Singh', email: 'vikram@example.com', phone: '9876543210' }, status: 'new' },
    { source: 'USA Education Fair', data: { name: 'Sanya Malhotra', email: 'sanya@example.com', interest: 'Computer Science' }, status: 'contacted' },
  ];

  for (const l of leads) {
    await Lead.create(l);
  }
  console.log('✔ Leads Seeded');

  console.log('--- Seeding Completed Successfully ---');
  process.exit(0);
}

seedData().catch(err => {
  console.error('Seeding Error:', err);
  process.exit(1);
});

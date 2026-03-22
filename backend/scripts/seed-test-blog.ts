import connectToDatabase from '../lib/db/mongodb';
import { Blog } from '../lib/db/models/Blog';

async function seedTestBlog() {
  await connectToDatabase();
  
  const testBlog = {
    title: "New Zealand Short-Term Graduate Work Visa – Full Guide",
    slug: "nz-graduate-visa-guide-2026",
    excerpt: "Eligibility, benefits, duration, and application process for international students looking to stay and work after...",
    content: "# NZ Graduate Visa Guide\n\nFull details on the 2026 policy...",
    coverImage: "https://images.unsplash.com/photo-1589330273594-fade1ee91647?auto=format&fit=crop&q=80&w=800",
    readTime: "4 min read",
    published: true,
    tags: ["Guides", "NEW ZEALAND"]
  };

  try {
    const existing = await Blog.findOne({ slug: testBlog.slug });
    if (!existing) {
      await Blog.create(testBlog);
      console.log('✅ Test blog deployed to repository.');
    } else {
      console.log('ℹ️ Test blog already exists in repository.');
    }
  } catch (err) {
    console.error('❌ Deployment failure:', err);
  } finally {
    process.exit(0);
  }
}

seedTestBlog();

import mongoose from 'mongoose';
import connectToDatabase from './lib/db/mongodb';
import { Post } from './lib/db/models/Post';
import { User } from './lib/db/models/User';

async function test() {
  try {
    console.log("Connecting...");
    await connectToDatabase();
    console.log("Connected.");

    let user = await User.findOne({ email: 'test@example.com' });
    if (!user) {
      user = await User.create({
        fullName: 'Test Auditor',
        email: 'test@example.com',
        role: 'student'
      });
      console.log("Created test user.");
    }

    const post = await Post.create({
      authorId: user._id,
      authorName: user.fullName,
      title: 'Verification Post',
      content: 'This is a test post for #verification and #database checking.',
      category: 'general',
      tags: ['verification', 'database']
    });
    console.log("Created test post:", post._id);

    const found = await Post.findById(post._id);
    console.log("Found post:", found?.title);

    await Post.deleteOne({ _id: post._id });
    console.log("Cleaned up test post.");

    process.exit(0);
  } catch (error) {
    console.error("Test failed:", error);
    process.exit(1);
  }
}

test();

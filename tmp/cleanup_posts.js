const mongoose = require('mongoose');
const dns = require('dns');

// Fix for MongoDB Atlas DNS issues on Windows
dns.setDefaultResultOrder('ipv4first');

const MONGODB_URI = 'mongodb+srv://prasenjeet:shreeram%400322@cluster0.k51id.mongodb.net/eaoverseas';

const PostSchema = new mongoose.Schema({
  authorId: mongoose.Schema.Types.Mixed
});

const Post = mongoose.model('Post', PostSchema, 'community');

async function cleanData() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const count = await Post.countDocuments({ authorId: '::1' });
    console.log(`Found ${count} posts with authorId: "::1"`);
    
    if (count > 0) {
      const result = await Post.deleteMany({ authorId: '::1' });
      console.log(`Deleted ${result.deletedCount} corrupted posts`);
    }
  } catch (err) {
    console.error('Error during cleanup:', err);
  } finally {
    await mongoose.connection.close();
    console.log('Connection closed');
  }
}

cleanData();

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve('frontend/.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

async function cleanup() {
  try {
    await mongoose.connect(MONGODB_URI);
    const result = await mongoose.connection.db.collection('users').deleteMany({ isEmailVerified: false });
    console.log(`Deleted ${result.deletedCount} unverified users from 'users' collection.`);
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

cleanup();

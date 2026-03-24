import connectToDatabase from './frontend/lib/db/mongodb.ts';
import { User } from './frontend/lib/db/models/User.ts';

async function debugUser() {
  await connectToDatabase();
  const user = await User.findOne({ fullName: /Prince Kumar/i }).lean();
  console.log('USER DATA:', JSON.stringify(user, null, 2));
  process.exit(0);
}

debugUser();

import mongoose from 'mongoose';
import connectToDatabase from './lib/db/mongodb';
import { User } from './lib/db/models/User';
import bcrypt from 'bcryptjs';

async function seed() {
  try {
    console.log("Connecting to database...");
    await connectToDatabase();
    
    const adminEmail = 'admin@eaoverseas.com';
    const existing = await User.findOne({ email: adminEmail });
    
    if (existing) {
      console.log("Admin user already exists.");
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash('admin123', 12);
    
    await User.create({
      fullName: 'System Admin',
      email: adminEmail,
      passwordHash,
      role: 'admin',
      avatarUrl: 'https://ui-avatars.com/api/?name=Admin&background=000&color=fff'
    });

    console.log("Admin user created successfully!");
    console.log("Email: admin@eaoverseas.com");
    console.log("Password: admin123");
    
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();

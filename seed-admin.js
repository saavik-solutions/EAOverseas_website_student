const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Minimal model definition for JS
const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String },
    role: { type: String, enum: ['student', 'admin', 'counsellor', 'employee'], default: 'student' },
    avatarUrl: { type: String }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seed() {
  const MONGODB_URI = "mongodb://saaviksolutions:364133@ac-gqutlts-shard-00-00.7mdh40j.mongodb.net:27017,ac-gqutlts-shard-00-01.7mdh40j.mongodb.net:27017,ac-gqutlts-shard-00-02.7mdh40j.mongodb.net:27017/?replicaSet=atlas-m0z6p1-shard-0&authSource=admin&tls=true";
  
  try {
    console.log("Connecting to database...");
    await mongoose.connect(MONGODB_URI);
    
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

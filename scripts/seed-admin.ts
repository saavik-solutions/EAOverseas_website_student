import fs from 'fs';
import path from 'path';

async function seedAdmin() {
  try {
    const envFile = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf8');
    envFile.split('\n').forEach(line => {
      const [key, ...values] = line.split('=');
      if (key && values.length > 0) {
        process.env[key.trim()] = values.join('=').trim().replace(/['"]/g, '');
      }
    });
  } catch(e) {}

  const connectToDatabase = (await import('../lib/db/mongodb')).default;
  const { User } = await import('../lib/db/models/User');
  const bcrypt = (await import('bcryptjs')).default;

  console.log('Connecting to database...');
  await connectToDatabase();
  console.log('Validating admin record...');

  const email = 'princekumar3641@gmail.com';
  const password = '364133';

  const existingAdmin = await User.findOne({ email });

  if (existingAdmin) {
    console.log(`Admin ${email} already seeded.`);
    process.exit(0);
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  await User.create({
    fullName: 'Prince Kumar',
    email,
    passwordHash,
    role: 'admin',
    onboardingCompleted: true
  });

  console.log(`SUCCESS: Admin account ${email} securely provisioned with DB-level onboarding bypass.`);
  process.exit(0);
}

seedAdmin().catch(console.error);

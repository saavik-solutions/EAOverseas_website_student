import connectToDatabase from '../lib/db/mongodb';
import { ApiKey } from '../lib/db/models/ApiKey';
import crypto from 'crypto';

async function seedApiKey() {
  await connectToDatabase();
  
  const existing = await ApiKey.findOne({ name: 'Main Website' });
  if (existing) {
    console.log('API Key for "Main Website" already exists:', existing.key);
    return;
  }

  const newKey = await ApiKey.create({
    name: 'Main Website',
    key: `ea_live_${crypto.randomUUID().replace(/-/g, '')}`,
    isActive: true
  });

  console.log('--- ENTERPRISE API KEY GENERATED ---');
  console.log('Name:', newKey.name);
  console.log('Key:', newKey.key);
  console.log('Endpoint: /api/external/collect');
  console.log('------------------------------------');
  process.exit(0);
}

seedApiKey().catch(err => {
  console.error(err);
  process.exit(1);
});

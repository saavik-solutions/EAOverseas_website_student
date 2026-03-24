const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve('frontend/.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI not found');
  process.exit(1);
}

async function getOtp() {
  try {
    await mongoose.connect(MONGODB_URI);
    const User = mongoose.connection.db.collection('users');
    const user = await User.findOne({ email: 'testuser12345@example.com' });
    if (user && user.otp) {
      console.log('OTP_FOUND:' + user.otp);
    } else {
      console.log('OTP_NOT_FOUND');
    }
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

getOtp();

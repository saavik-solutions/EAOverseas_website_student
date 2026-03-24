const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve('frontend/.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

async function getPendingOtp() {
  try {
    await mongoose.connect(MONGODB_URI);
    const PendingUser = mongoose.connection.db.collection('pendingusers');
    const user = await PendingUser.findOne({ email: 'test_pending@example.com' });
    if (user && user.otp) {
      console.log('PENDING_OTP_FOUND:' + user.otp);
    } else {
      console.log('PENDING_OTP_NOT_FOUND');
    }
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

getPendingOtp();

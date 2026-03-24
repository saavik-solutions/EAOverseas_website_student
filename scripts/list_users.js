const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../frontend/.env.local') });

async function listUsers() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const UserSchema = new mongoose.Schema({ fullName: String, email: String }, { collection: 'users' });
        const User = mongoose.models.User || mongoose.model('User', UserSchema);
        const users = await User.find({}, 'fullName email').limit(10);
        console.log('Users:', users);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

listUsers();

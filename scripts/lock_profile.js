const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../frontend/.env.local') });

async function lockProfile() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const UserSchema = new mongoose.Schema({
            fullName: String,
            isLocked: Boolean
        }, { collection: 'users' });
        
        const User = mongoose.models.User || mongoose.model('User', UserSchema);
        
        const res = await User.updateOne({ fullName: 'Prince' }, { isLocked: true });
        console.log('Update result:', res);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

lockProfile();

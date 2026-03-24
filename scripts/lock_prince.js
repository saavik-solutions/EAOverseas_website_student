const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../frontend/.env.local') });

async function lockPrince() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const UserSchema = new mongoose.Schema({ email: String, isLocked: Boolean }, { collection: 'users' });
        const User = mongoose.models.User || mongoose.model('User', UserSchema);
        
        const res = await User.updateMany(
            { email: { $in: ['princegutpa3641@gmail.com', 'peicne@sd.io'] } }, 
            { isLocked: true }
        );
        console.log('Update result:', res);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

lockPrince();

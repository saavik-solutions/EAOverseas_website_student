import mongoose from 'mongoose';
import { User } from './frontend/lib/db/models/User';
import dotenv from 'dotenv';

dotenv.config({ path: './frontend/.env.local' });

async function lockProfile() {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        const user = await User.findOneAndUpdate({ fullName: 'Prince' }, { isLocked: true }, { new: true });
        console.log('User locked:', !!user?.isLocked);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

lockProfile();

import connectToDatabase from './frontend/lib/db/mongodb';
import { User } from './frontend/lib/db/models/User';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function runTest() {
    try {
        console.log("Connecting to database...");
        await connectToDatabase();

        const testEmail = "test_onboarding@example.com";
        
        // 1. Cleanup old test user
        await User.deleteOne({ email: testEmail });
        console.log("Cleaned up old test user.");

        // 2. Create a basic user (simulating post-signup/OTP)
        const user = await User.create({
            fullName: "Test Student",
            email: testEmail,
            phone: "1234567890",
            state: "Maharashtra",
            role: "student",
            isEmailVerified: true,
            detailedFilled: false
        });
        console.log("Created initial test user:", user._id);

        // 3. Simulate detailed profile update
        const detailedData = {
            targetCountries: ["UK", "Canada"],
            targetDegree: "Master's",
            intakeYear: "2025",
            intakeSemester: "Fall",
            budget: "25L - 50L",
            highestEducation: "Bachelor's Degree",
            preferredCourse: "Computer Science"
        };

        console.log("Updating detailed profile...");
        const updatedUser = await User.findOneAndUpdate(
            { email: testEmail },
            {
                ...detailedData,
                detailedFilled: true
            },
            { new: true }
        );

        // 4. Verify storage
        if (updatedUser && updatedUser.detailedFilled === true && updatedUser.preferredCourse === "Computer Science") {
            console.log("✅ SUCCESS: Data stored correctly!");
            console.log("Stored Data:", {
                detailedFilled: updatedUser.detailedFilled,
                preferredCourse: updatedUser.preferredCourse,
                targetCountries: updatedUser.targetCountries,
                targetDegree: updatedUser.targetDegree
            });
        } else {
            console.error("❌ FAILURE: Data storage verification failed!");
            console.log("Updated User State:", updatedUser);
        }

        // 5. Cleanup
        await User.deleteOne({ email: testEmail });
        await mongoose.disconnect();
        console.log("Test user removed and disconnected.");

    } catch (error) {
        console.error("Test failed with error:", error);
        process.exit(1);
    }
}

runTest();

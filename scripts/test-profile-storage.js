const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: '.env.local' });

// Define a minimal User model for testing
const UserSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    state: String,
    role: String,
    isEmailVerified: Boolean,
    detailedFilled: Boolean,
    targetCountries: [String],
    targetDegree: String,
    intakeYear: String,
    intakeSemester: String,
    budget: String,
    highestEducation: String,
    preferredCourse: String
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function runTest() {
    try {
        console.log("Connecting to database...");
        const mongodbUri = process.env.MONGODB_URI;
        if (!mongodbUri) throw new Error("MONGODB_URI not found in .env.local");

        await mongoose.connect(mongodbUri);
        console.log("Connected to MongoDB.");

        const testEmail = "test_onboarding_js@example.com";
        
        // 1. Cleanup old test user
        await User.deleteOne({ email: testEmail });
        console.log("Cleaned up old test user.");

        // 2. Create a basic user (simulating post-signup/OTP)
        const user = await User.create({
            fullName: "Test Student JS",
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
            preferredCourse: "Data Science"
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
        if (updatedUser && updatedUser.detailedFilled === true && updatedUser.preferredCourse === "Data Science") {
            console.log("✅ SUCCESS: Data stored correctly in collection!");
            console.log("Stored Data Snapshot:", JSON.stringify({
                detailedFilled: updatedUser.detailedFilled,
                preferredCourse: updatedUser.preferredCourse,
                targetCountries: updatedUser.targetCountries,
                targetDegree: updatedUser.targetDegree
            }, null, 2));
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

import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import { User } from '@/lib/db/models/User';
import { auth } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();
        const data = await request.json();

        const updatedUser = await User.findOneAndUpdate(
            { email: session.user.email },
            {
                ...data,
                detailedFilled: true
            },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Profile updated successfully",
            success: true,
            user: updatedUser
        });

    } catch (error: any) {
        console.error("Complete profile error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

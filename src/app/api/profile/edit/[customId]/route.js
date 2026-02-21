import { verifyToken } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import User from "../../../../../../models/User";

export async function PUT(req) {
    try {
        const userId = await verifyToken(req); 

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { name, email, password } = body;

        // ✅ Gunakan findById karena userId adalah _id
        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        let hasChanges = false;

        if (name && user.name !== name) {
            user.name = name;
            hasChanges = true;
        }

        if (email && user.email !== email) {
            // ✅ Fix: cek email duplikat pakai _id bukan customId
            const existingUser = await User.findOne({ 
                email, 
                _id: { $ne: userId } 
            });
            if (existingUser) {
                return NextResponse.json(
                    { message: "Email already in use" },
                    { status: 400 }
                );
            }
            user.email = email;
            hasChanges = true;
        }

        if (password) {
            const isSamePassword = await user.matchPassword(password);
            if (!isSamePassword) {
                user.password = password;
                hasChanges = true;
            }
        }

        if (!hasChanges) {
            return NextResponse.json({ message: "Nothing to update" }, { status: 200 });
        }

        const updatedUser = await user.save();

        return NextResponse.json(
            { message: "User updated", updated: updatedUser },
            { status: 200 }
        );
    } catch (error) {
        console.error("Update user error:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
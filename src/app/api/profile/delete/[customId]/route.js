import { verifyToken } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import User from "../../../../../../models/User";
import Challenge from "../../../../../../models/Challenge"; 

export async function DELETE(req) {
    const userId = await verifyToken(req); 

    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findById(userId);

    if (!user) {
        return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }

    const userName = user.name;

    await Challenge.deleteMany({ userId: user._id });

    await user.deleteOne();

    const response = NextResponse.json(
        { message: `User ${userName} deleted successfully` },
        { status: 200 }
    );

    response.cookies.delete('token');
    response.cookies.delete('lastActivity');

    return response;
}

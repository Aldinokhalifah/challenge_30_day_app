import { verifyToken } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import User from "../../../../../../models/User";
import Challenge from "../../../../../../models/Challenge"; 

export async function DELETE(req, { params }) {
    const userId = await verifyToken(req);
    const { customId } = params;

    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ customId: userId, customId });

    if (!user) {
        return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }

    const userName = user.name;

    await Challenge.deleteMany({ userId });

    await user.deleteOne();

    return NextResponse.json(
        { message: `User ${userName} deleted successfully` },
        { status: 200 }
    );
}

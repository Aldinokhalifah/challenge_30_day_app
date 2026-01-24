import { NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/auth";
import Challenge from "../../../../../../models/Challenge";

export async function PUT(req, { params }) {
    try {
        const { customId } = await params;
        const userId = await verifyToken(req);
        const { isPublic } = await req.json();

        if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

        // Gunakan findOneAndUpdate agar lebih atomik dan cepat
        const challenge = await Challenge.findOneAndUpdate(
            { customId, userId },
            { $set: { isPublic: isPublic } },
            { new: true } // kembalikan data terbaru
        ).lean();

        if (!challenge) {
            return NextResponse.json({ message: 'Challenge not found' }, { status: 404 });
        }

        return NextResponse.json({ 
            message: `Visibility updated to ${isPublic ? "public" : "private"}`,
            challenge 
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
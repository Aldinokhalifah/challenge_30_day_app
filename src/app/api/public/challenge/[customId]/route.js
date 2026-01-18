import { NextResponse } from "next/server";
import Challenge from "../../../../../../models/Challenge";
import User from "../../../../../../models/User";

export async function GET(req, {params}) {
    try {
        const { customId } = params;
        const numericId = parseInt(customId, 10);

        if (isNaN(numericId)) {
            return NextResponse.json({ message: "Invalid challenge ID format" }, { status: 400 });
        }

        // Pakai .lean() agar performa kencang
        const challenge = await Challenge.findOne({
            customId: numericId,
            isPublic: true
        }).lean();

        if (!challenge) {
            return NextResponse.json({ message: "Challenge not found or not public" }, { status: 404 });
        }

        // Cari User dengan .lean() dan hanya ambil field 'name'
        const user = await User.findById(challenge.userId).select('name').lean();

        // Destructuring untuk memisahkan userId dan data lainnya
        const { userId, ...challengeData } = challenge;
        
        const safeData = {
            ...challengeData,
            creator: user?.name || "Unknown Creator"
        };

        return NextResponse.json({
            message: "Challenge fetched successfully",
            data: safeData
        }, { status: 200 });

    }catch (error) {
        console.error("Error fetching public challenge:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
import { NextResponse } from "next/server";
import Challenge from "../../../../../../models/Challenge";

export async function GET(req, {params}) {
    try {
        const {customId} = params;
        
        // Convert customId to Number
        const numericId = parseInt(customId, 10);
        
        if (isNaN(numericId)) {
            return NextResponse.json(
                { message: "Invalid challenge ID format" },
                { status: 400 }
            );
        }

        const challenge = await Challenge.findOne({
            customId: numericId,
            isPublic: true
        });

        if (!challenge) {
            return NextResponse.json(
                { message: "Challenge not found or not public" },
                { status: 404 }
            );
        }

        // Convert to object and remove sensitive data
        const challengeObj = challenge.toObject();
        const { userId, ...safeData } = challengeObj;

        return NextResponse.json({
            message: "Challenge fetched successfully",
            data: safeData
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching public challenge:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
import { NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/auth";
import Challenge from "../../../../../../models/Challenge";

export async function PUT(req, {params}) {
    try {
        const {customId} = params;
        const userId = await verifyToken(req);
        const { isPublic } = await req.json();

        if(!userId) {
            return NextResponse.json(
                {message: 'Unauthorized'},
                {status: 401}
            );
        }

        const challenge = await Challenge.findOne({customId, userId});

        if(!challenge) {
            return NextResponse.json(
                {message: 'Challenge not found'},
                {status: 404}
            );
        }

        challenge.isPublic = isPublic;
        await challenge.save();

        return NextResponse.json(
            { message: `Challenge visibility updated to ${isPublic ? "public" : "private"}` },
            { status: 200 }
        );
    } catch (error) {
        console.error("Update challenge error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
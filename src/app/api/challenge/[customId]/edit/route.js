import { verifyToken } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import Challenge from "../../../../../../models/Challenge";

export async function PUT(req,{params}) {
    try {
        const userId = await verifyToken(req);
        const customId = parseInt(params.customId);

        if (!userId) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
        }

        const body = await req.json();
        const { title, description, startDate } = body;

        const challenge = await Challenge.findOne({ customId, userId });

        if (!challenge) {
        return NextResponse.json(
            { message: "Challenge tidak ditemukan" },
            { status: 404 }
        );
        }

        if (title) challenge.title = title;
        if (description) challenge.description = description;
        if (startDate) challenge.startDate = startDate;

        const updatedChallenge = await challenge.save();

        return NextResponse.json(
        { message: "Challenge berhasil diupdate", updated: updatedChallenge },
        { status: 200 }
        );
    } catch (err) {
        console.error("Update challenge error:", err);
        return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
        );
    }
}
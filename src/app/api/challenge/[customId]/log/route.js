import { verifyToken } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import Challenge from "../../../../../../models/Challenge";

export async function POST(req, { params }) {
    const userId = await verifyToken(req);
    const { customId } = await params;

    if (!userId) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    const challengeId = parseInt(customId);
    const { day, note, status } = await req.json();

    const challenge = await Challenge.findOne({ customId: challengeId, userId });

    if (!challenge) {
        return NextResponse.json(
            { message: "Challenge tidak ditemukan" },
            { status: 404 }
        );
    }


    const logExists = challenge.logs.find(log => log.day === day);
    if (!logExists) {
        return NextResponse.json(
            { message: `Log hari ke-${day} tidak ditemukan` },
            { status: 404 }
        );
    }

    challenge.logs = challenge.logs.map(log => {
        if(log.day === day) {
            return {
                ...log,
                status,
                note,
                date: new Date()
            };
        }
        return log
    });

    await challenge.save();

    return NextResponse.json(
        {
            message: "Log berhasil ditambahkan",
            log: challenge.logs.find(log => log.day === day)
        },
        { status: 201 }
    );
}

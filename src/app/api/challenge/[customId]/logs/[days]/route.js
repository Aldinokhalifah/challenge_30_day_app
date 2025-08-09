import { connectToDatabase } from "@/app/lib/mongoose";
import { NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/auth";
import Challenge from "../../../../../../../models/Challenge";

export async function PUT(req, {params}) {
    await connectToDatabase();
    const userId = await verifyToken(req);
    const { customId, days } = params;
    const { day, note, status } = await req.json();


    if(!userId) {
        return NextResponse.json(
            {message: 'Unauthorized'},
            {status: 401}
        )
    }

    const dayNumber = parseInt(params.days);
    const challengeId = parseInt(customId);

    const challenge = await Challenge.findOne( {customId: challengeId, userId} );

    if(!challenge) {
        return NextResponse.json(
            {message: 'Challenge tidak ditemukan'},
            {status: 404}
        )
    }

    const logExists = await challenge.logs.find(log => log.day === dayNumber);
    
    if(!logExists) {
        return NextResponse.json(
            {message: `Log hari ke-${dayNumber} tidak ditemukan`},
            {status: 404}
        )
    }

    if(!logExists.note ||logExists.note.trim() === "") {
        return NextResponse.json(
            {message: `Log hari ke-${dayNumber} belum terisi`},
            {status: 400}
        )
    } else {
        const result = await Challenge.updateOne(
            { customId: challengeId, userId, "logs.day": dayNumber },
            { $set: {
                "logs.$.status": status,
                "logs.$.note": note,
                "logs.$.date": new Date()
            }}
        );
    }

    const updatedChallenge = await Challenge.findOne({ customId: challengeId, userId });
    const updatedLog = updatedChallenge.logs.find(log => log.day === dayNumber);

    return NextResponse.json(
        {
            message: "Log berhasil diperbarui",
            log: JSON.parse(JSON.stringify(updatedLog))
        },
        { status: 200 }
    );
}
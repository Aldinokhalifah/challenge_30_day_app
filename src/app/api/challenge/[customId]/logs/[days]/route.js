import { NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/auth";
import Challenge from "../../../../../../../models/Challenge";

export async function PUT(req, {params}) {
    const userId = await verifyToken(req);
    const { customId, days } = params;
    const { note, status } = await req.json();

    if(!userId) {
        return NextResponse.json(
            {message: 'Unauthorized'},
            {status: 401}
        )
    }

    const dayNumber = parseInt(days); 
    const challengeId = parseInt(customId);

    // Validasi note dari request body
    if(!note || note.trim() === "") {
        return NextResponse.json(
            {message: `Note tidak boleh kosong`},
            {status: 400}
        )
    }

    const challenge = await Challenge.findOne( {customId: challengeId, userId} );

    if(!challenge) {
        return NextResponse.json(
            {message: 'Challenge tidak ditemukan'},
            {status: 404}
        )
    }

    const logExists = challenge.logs.find(log => log.day === dayNumber);
    
    if(!logExists) {
        return NextResponse.json(
            {message: `Log hari ke-${dayNumber} tidak ditemukan`},
            {status: 404}
        )
    }

    // Update log dengan note dan status baru
    const result = await Challenge.updateOne(
        { customId: challengeId, userId, "logs.day": dayNumber },
        { $set: {
            "logs.$.status": status,
            "logs.$.note": note,
            "logs.$.date": new Date()
        }}
    );

    if(result.modifiedCount === 0) {
        return NextResponse.json(
            {message: 'Gagal memperbarui log'},
            {status: 500}
        )
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
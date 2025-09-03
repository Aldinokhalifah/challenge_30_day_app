import { verifyToken } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import Challenge from "../../../../../../../../models/Challenge";

export async function DELETE(req, {params}) {
    const userId = await verifyToken(req);
    if(!userId) {
        return NextResponse.json(
            {message: 'Unauthorized'},
            {status: 401}
        )
    }

    const { customId, days } = params;

    const dayNumber = parseInt(days);
    const challengeId = parseInt(customId);

    const challenge = await Challenge.findOne( {customId: challengeId, userId} );
    
    if(!challenge) {
        return NextResponse.json(
            {message: 'Challenge tidak ditemukan'},
            {status: 404}
        )
    }
    
    const logExists =  challenge.logs.find(log => log.day === dayNumber);
        
    if(!logExists) {
        return NextResponse.json(
            {message: `Log hari ke-${dayNumber} tidak ditemukan`},
            {status: 404}
        )
    }

    const result = await Challenge.updateOne(
        { 
            customId: challengeId, 
            userId, 
            "logs.day": dayNumber 
        },
        { 
            $set: {
                "logs.$.note": "",
                "logs.$.status": "pending",
                "logs.$.date": null
            }
        }
    );

    if (result.modifiedCount === 0) {
        return NextResponse.json(
            { message: "Gagal mengosongkan log" },
            { status: 400 }
        );
    }

    const updatedChallenge = await Challenge.findOne({ customId: challengeId, userId });
    const updatedLog = updatedChallenge.logs.find(log => log.day === dayNumber);

    return NextResponse.json(
        { 
            message: `Log hari ke-${dayNumber} berhasil dikosongkan`,
            log: JSON.parse(JSON.stringify(updatedLog))
        }, 
        { status: 200 }
    );
}
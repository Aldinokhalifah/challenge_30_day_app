import { verifyToken } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import Challenge from "../../../../../../models/Challenge";

export async function GET(req, {params}) {
    const userId = await verifyToken(req);
    const customId = parseInt(params.customId);

    if(!userId) {
        return NextResponse.json(
            {message: 'Unauthorized'},
            {status: 401}
        )
    }
    
    const challenge = await Challenge.findOne( {customId: customId, userId});

    if(!challenge) {
        return NextResponse.json(
            {message: 'Challenge tidak ditemukan'},
            {status: 404}
        )
    }

    const logs = challenge.logs.map(log => {
        return {
            day: log.day,
            status: log.status,
            note: log.note,
            date: log.date
        };
    });

    return NextResponse.json(
        {message: 'Logs berhasil diambil',
            logs: logs
        },
        {status: 200}
    )
}
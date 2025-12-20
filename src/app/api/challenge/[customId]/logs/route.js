import { verifyToken } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import Challenge from "../../../../../../models/Challenge";
import User from "../../../../../../models/User";
import { toZonedTime } from "date-fns-tz";
import { format } from "date-fns";

export async function GET(req, {params}) {
    const userId = await verifyToken(req);
    const {customId} = await params;

    if(!userId) {
        return NextResponse.json(
            {message: 'Unauthorized'},
            {status: 401}
        )
    }
    
    const challengeId = parseInt(customId);
    const challenge = await Challenge.findOne({customId: challengeId, userId});

    if(!challenge) {
        return NextResponse.json(
            {message: 'Challenge tidak ditemukan'},
            {status: 404}
        )
    }

    const user = await User.findById(userId);
    const userTimezone = user?.timezone || "UTC";

    const now = new Date();
    const zonedNow = toZonedTime(now, userTimezone);
    const todayKey = format(zonedNow, "yyyy-MM-dd");

    let canFillToday, filledDayToday;
    
    if(challenge.lastFilled?.dateISO === todayKey) {
        canFillToday = false;
        filledDayToday = challenge.lastFilled.day;
    } else {
        canFillToday = true;
        filledDayToday = null;
    }

    // Hitung next day yang harus diisi
    const filledLogs = challenge.logs
        .filter(log => log.status !== 'pending')
        .sort((a, b) => a.day - b.day);
    
    const lastFilledLog = filledLogs[filledLogs.length - 1];
    const nextDayToFill = lastFilledLog ? lastFilledLog.day + 1 : 1;

    const logs = challenge.logs.map(log => ({
        day: log.day,
        status: log.status,
        note: log.note,
        date: log.date,
        filledAt: log.filledAt
    }));

    return NextResponse.json({
        message: 'Logs berhasil diambil',
        logs: logs,
        canFillToday: canFillToday,
        filledDayToday: filledDayToday,
        nextDayToFill: nextDayToFill 
    }, {status: 200})
}
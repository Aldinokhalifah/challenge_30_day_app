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

    // Ambil timezone user
    const user = await User.findById(userId);
    const userTimezone = user?.timezone || "UTC";

    // Get tanggal hari ini di timezone user
    const now = new Date();
    const zonedNow = toZonedTime(now, userTimezone);
    const todayKey = format(zonedNow, "yyyy-MM-dd");

    // Cek apakah sudah isi log hari ini
    let canFillToday = true;
    let filledDayToday = challenge.lastFilled.day || null;

    if(challenge.lastFilled?.dateISO === todayKey) {
        canFillToday = false;
        filledDayToday = challenge.lastFilled.day;
    }

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
        filledDayToday: filledDayToday
    }, {status: 200})
}
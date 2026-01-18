import { verifyToken } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import Challenge from "../../../../../../models/Challenge";
import User from "../../../../../../models/User";
import { toZonedTime } from "date-fns-tz";
import { format } from "date-fns";

export async function GET(req, { params }) {
    try {
        const userId = await verifyToken(req);
        const { customId } = await params;

        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const challengeId = parseInt(customId);

        // 1. Optimasi Database: Ambil field yang diperlukan saja & gunakan .lean()
        const challenge = await Challenge.findOne({ customId: challengeId, userId })
            .select("logs lastFilled")
            .lean();

        if (!challenge) {
            return NextResponse.json({ message: 'Challenge tidak ditemukan' }, { status: 404 });
        }

        // 2. Ambil timezone user (hanya field timezone)
        const user = await User.findById(userId).select("timezone").lean();
        const userTimezone = user?.timezone || "UTC";

        // Logika Waktu
        const now = new Date();
        const zonedNow = toZonedTime(now, userTimezone);
        const todayKey = format(zonedNow, "yyyy-MM-dd");

        let canFillToday, filledDayToday;

        if (challenge.lastFilled?.dateISO === todayKey) {
            canFillToday = false;
            filledDayToday = challenge.lastFilled.day;
        } else {
            canFillToday = true;
            filledDayToday = null;
        }

        // 3. Optimasi Kalkulasi Logs
        const logs = challenge.logs || [];
        
        // Cari log terakhir yang tidak pending tanpa perlu filter seluruh array dulu
        // Kita bisa langsung cari dari belakang untuk efisiensi
        const lastFilledLog = [...logs]
            .reverse()
            .find(log => log.status !== 'pending');

        const nextDayToFill = lastFilledLog ? lastFilledLog.day + 1 : 1;

        // Map data untuk dikirim ke frontend
        const formattedLogs = logs.map(log => ({
            day: log.day,
            status: log.status,
            note: log.note,
            date: log.date,
            filledAt: log.filledAt
        }));

        return NextResponse.json({
            message: 'Logs berhasil diambil',
            logs: formattedLogs,
            canFillToday,
            filledDayToday,
            nextDayToFill
        }, { status: 200 });

    } catch (error) {
        console.error("Error Fetching Logs:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
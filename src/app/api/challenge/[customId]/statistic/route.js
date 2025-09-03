import { verifyToken } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import Challenge from "../../../../../../models/Challenge";

export async function GET(req, {params}) {
    const { customId } = params;
    const userId = await verifyToken(req);
    if(!userId) {
        return NextResponse.json(
            {message: 'Unauthorized'},
            {status: 401}
        )
    }

    const challenge = await Challenge.findOne({
        customId: customId,
        userId: userId
    });

    const log = challenge.logs;
    const totalDays = challenge.logs.length;
    const completedDays = challenge.logs.filter(log => log.status === "completed").length;
    const pendingDays = challenge.logs.filter(log => log.status === "pending").length;
    const progressPercentage = ((completedDays / totalDays) * 100).toFixed(2);

    let longestStreak = 0, currentStreak = 0, totalStreak = 0, streakCount = 0;

    log.forEach(log => {
        if(log.status === 'completed') {
            currentStreak++;
            if (currentStreak > longestStreak) longestStreak = currentStreak;
        } else {
            if(currentStreak > 0) {
                totalStreak += currentStreak;
                streakCount++;
            }
            currentStreak = 0;
        }
    });

    if(currentStreak > 0) {
        totalStreak += currentStreak;
        streakCount++;
    }

    const averageStreak = streakCount > 0 ? (totalStreak / streakCount).toFixed(2) : 0;

    let insight = "";
    if (longestStreak >= 5) {
        insight = "Kamu sedang konsisten, lanjutkan!";
    } else if (pendingDays > completedDays) {
        insight = "Ayo coba mulai lebih cepat agar progress lebih merata.";
    } else if (progressPercentage >= 80) {
        insight = "Hampir selesai, sedikit lagi!";
    } else {
        insight = "Tetap semangat, progress berjalan!";
    }

    return NextResponse.json(
        {
            totalDays,
            completedDays,
            pendingDays,
            progressPercentage,
            totalStreak,
            averageStreak,
            longestStreak,
            insight
        },
        {
            status: 200
        }
    )
}
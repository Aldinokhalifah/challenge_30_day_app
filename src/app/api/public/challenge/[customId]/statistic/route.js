import { NextResponse } from "next/server";
import Challenge from "../../../../../../../models/Challenge";

export async function GET(req, { params }) {
    try {
        const { customId } = params;

        const challenge = await Challenge.findOne({ customId, isPublic: true });
        if (!challenge) {
        return NextResponse.json(
            { message: "Challenge not found or not in public" },
            { status: 404 }
        );
        }

        // Ambil log dari challenge
        const log = challenge.logs || [];
        const totalDays = log.length || 0;
        const completedDays = log.filter(l => l.status === "completed").length;
        const pendingDays = log.filter(l => l.status === "pending").length;
        const progressPercentage = totalDays
        ? ((completedDays / totalDays) * 100).toFixed(2)
        : 0;

        let longestStreak = 0, currentStreak = 0, totalStreak = 0, streakCount = 0;

        log.forEach(l => {
        if (l.status === "completed") {
            currentStreak++;
            if (currentStreak > longestStreak) longestStreak = currentStreak;
        } else {
            if (currentStreak > 0) {
            totalStreak += currentStreak;
            streakCount++;
            }
            currentStreak = 0;
        }
        });

        if (currentStreak > 0) {
        totalStreak += currentStreak;
        streakCount++;
        }

        const averageStreak =
        streakCount > 0 ? (totalStreak / streakCount).toFixed(2) : 0;

        let insight = "";
        if (longestStreak >= 5) {
        insight = "Challenge ini menunjukkan konsistensi tinggi!";
        } else if (pendingDays > completedDays) {
        insight = "Masih banyak hari tertunda, semangat untuk menyelesaikannya!";
        } else if (progressPercentage >= 80) {
        insight = "Hampir selesai, sedikit lagi menuju garis akhir!";
        } else {
        insight = "Challenge sedang berjalan, teruskan perjuangan!";
        }

        return NextResponse.json(
        {
            message: "Fetched challenge's stats",
            statistic: {
            totalDays,
            completedDays,
            pendingDays,
            progressPercentage,
            totalStreak,
            averageStreak,
            longestStreak,
            insight,
            },
        },
        { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching public challenge stats:", error);
        return NextResponse.json(
        { message: "Terjadi kesalahan server" },
        { status: 500 }
        );
    }
}

import { verifyToken } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import Challenge from "../../../../../../models/Challenge";

export async function GET(req, { params }) {
    try {
        const { customId } = await params; 
        const userId = await verifyToken(req);
        
        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        // 1. Optimasi: Ambil field 'logs' saja dan gunakan .lean()
        const challenge = await Challenge.findOne({
            customId: customId,
            userId: userId
        })
        .select("logs")
        .lean();

        if (!challenge) {
            return NextResponse.json({ message: 'Challenge tidak ditemukan' }, { status: 404 });
        }

        const log = challenge.logs || [];
        const totalDays = log.length;

        // Jika logs kosong, hindari pembagian dengan nol
        if (totalDays === 0) {
            return NextResponse.json({
                statistic: { totalDays: 0, completedDays: 0, progressPercentage: 0 }
            });
        }

        // 2. Kalkulasi Data (Satu kali iterasi untuk performa lebih baik)
        const completedDays = log.filter(l => l.status === "completed").length;
        const pendingDays = log.filter(l => l.status === "pending").length;
        const progressPercentage = ((completedDays / totalDays) * 100).toFixed(2);

        let longestStreak = 0, currentStreak = 0, totalStreak = 0, streakCount = 0;

        log.forEach(l => {
            if (l.status === 'completed') {
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

        const averageStreak = streakCount > 0 ? (totalStreak / streakCount).toFixed(2) : 0;

        // 3. Penentuan Insight
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
                message: 'Mendapatkan Semua Statistic',
                statistic: {
                    totalDays,
                    completedDays,
                    pendingDays,
                    progressPercentage,
                    totalStreak,
                    averageStreak,
                    longestStreak,
                    insight
                }
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error Detail Stats:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
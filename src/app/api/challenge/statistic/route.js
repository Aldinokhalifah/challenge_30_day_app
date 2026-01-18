import { NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/auth";
import Challenge from "../../../../../models/Challenge";

export async function GET(req) {
    try {
        const userId = await verifyToken(req);

        if(!userId) {
            return NextResponse.json({message: 'Unauthorized'}, {status: 401})
        }

        // 1. Gunakan .lean() dan hanya pilih field 'logs'
        // Ini akan menghemat penggunaan RAM server secara signifikan
        const challenges = await Challenge.find({userId: userId})
            .select("logs")
            .lean();

        if (!challenges.length) {
            return NextResponse.json({ 
                totalChallenges: 0,
                completedChallenges: 0,
                activeChallenges: 0,
                overallProgress: 0,
                completedDays: 0,
                totalStreak: 0
            }, { status: 200 });
        }

        // 2. Kalkulasi Data
        const challengesWithProgress = challenges.map(challenge => {
            const logs = challenge.logs || [];
            
            // Gunakan satu loop untuk mendapatkan semua data
            let completedDays = 0;
            let longestStreak = 0;
            let currentStreak = 0;
            let totalStreak = 0;
            let streakCount = 0;

            logs.forEach(log => {
                if(log.status === 'completed') {
                    completedDays++;
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

            // Handle sisa streak di akhir array
            if (currentStreak > 0) {
                totalStreak += currentStreak;
            }
            
            const progress = Math.round((completedDays / 30) * 100);

            return {
                progress,
                totalStreak,
                completedDays
            };
        });

        // 3. Agregasi Stats Final
        const totalChallenges = challengesWithProgress.length;
        const completedChallenges = challengesWithProgress.filter(c => c.progress == 100).length;
        const activeChallenges = totalChallenges - completedChallenges;
        
        // Gunakan reduce sekali saja untuk mengambil semua sum
        const totals = challengesWithProgress.reduce((acc, current) => {
            acc.days += current.completedDays;
            acc.streak += current.totalStreak;
            acc.progressSum += current.progress;
            return acc;
        }, { days: 0, streak: 0, progressSum: 0 });

        const overallProgress = Math.min(Math.round(totals.progressSum / totalChallenges), 100);

        return NextResponse.json({
            totalChallenges,
            completedChallenges,
            activeChallenges,
            overallProgress,
            completedDays: totals.days,
            totalStreak: totals.streak,
        });
    } catch (error) {
        console.error("❌ Error overview stats:", error.message);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
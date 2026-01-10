import { NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/auth";
import Challenge from "../../../../../models/Challenge";

export async function GET(req) {
    try {
        const userId = await verifyToken(req);

        if(!userId) {
            return NextResponse.json(
                {message: 'Unauthorized'},
                {status: 401}
            )
        }

        const challenges = await Challenge.find({userId: userId});

        if (!challenges.length) {
            return NextResponse.json({ 
                message: "Belum ada challenge",
                totalChallenges: 0,
                completedChallenges: 0,
                activeChallenges: 0,
                overallProgress: 0
            }, { status: 200 });
        }

        const challengesWithProgress = challenges.map(challenge => {
            const completedDays = challenge.logs.filter(log => log.status === 'completed').length;
            const progress = Math.round((completedDays / 30) * 100); // Convert ke persentase

            let longestStreak = 0, currentStreak = 0, totalStreak = 0, streakCount = 0;

            challenge.logs.forEach(log => {
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
            
            return {
                progress,
                totalStreak,
                longestStreak,
                completedDays
            };
        });

        console.log("📊 Challenges progress:", challengesWithProgress);

        // Hitung stats
        const totalChallenges = challengesWithProgress.length;
        const completedChallenges = challengesWithProgress.filter(c => c.progress >= 100).length;
        const activeChallenges = totalChallenges - completedChallenges;
        const completedDays = challengesWithProgress.reduce((acc, current) => acc + current.completedDays, 0);
        const totalStreak = challengesWithProgress.reduce((acc, current) => acc + current.totalStreak, 0);
        
        let overallProgress = 0;
        if (totalChallenges > 0) {
            const sumProgress = challengesWithProgress.reduce((sum, c) => sum + c.progress, 0);
            overallProgress = Math.round(sumProgress / totalChallenges);
            overallProgress = Math.min(overallProgress, 100);
            
            console.log("📊 Calculation:", {
                totalChallenges,
                completedChallenges,
                activeChallenges,
                overallProgress,
                completedDays,
                totalStreak,
            });
        }

        return NextResponse.json({
            totalChallenges,
            completedChallenges,
            activeChallenges,
            overallProgress,
            completedDays,
            totalStreak,
        });
    } catch (error) {
        console.error("❌ Error overview stats:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
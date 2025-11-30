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
            
            return {
                progress
            };
        });

        console.log("📊 Challenges progress:", challengesWithProgress);

        // Hitung stats
        const totalChallenges = challengesWithProgress.length;
        const completedChallenges = challengesWithProgress.filter(c => c.progress >= 100).length;
        const activeChallenges = totalChallenges - completedChallenges;
        
        let overallProgress = 0;
        if (totalChallenges > 0) {
            const sumProgress = challengesWithProgress.reduce((sum, c) => sum + c.progress, 0);
            overallProgress = Math.round(sumProgress / totalChallenges);
            overallProgress = Math.min(overallProgress, 100);
            
            console.log("📊 Calculation:", {
                sumProgress,
                totalChallenges,
                overallProgress
            });
        }

        return NextResponse.json({
            totalChallenges,
            completedChallenges,
            activeChallenges,
            overallProgress,
        });
    } catch (error) {
        console.error("❌ Error overview stats:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
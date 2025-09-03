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

        // Ambil semua challenge user (bisa filter pakai userId kalau sudah ada auth)
        const challenges = await Challenge.find({userId: userId});

        if (!challenges.length) {
        return NextResponse.json({ message: "Belum ada challenge" }, { status: 200 });
        }

        // Hitung stats gabungan
        const totalChallenges = challenges.length;
        const completedChallenges = challenges.filter(c => c.progress >= 100).length;
        const activeChallenges = totalChallenges - completedChallenges;
        let overallProgress = 0;
        if (totalChallenges > 0) {
            const sumProgress = challenges.reduce((sum, c) => sum + (c.progress || 0), 0);
            overallProgress = Math.round(sumProgress / totalChallenges);
            // Pastikan progress tidak lebih dari 100
            overallProgress = Math.min(overallProgress, 100);
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
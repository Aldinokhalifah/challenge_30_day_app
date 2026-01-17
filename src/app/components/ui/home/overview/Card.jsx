import { useState, useEffect } from "react";
import StatCard from "./StatCard";
import { Target, Trophy, Zap, TrendingUp } from "lucide-react";

export default function Card({ animatedValues, overviewStats }) {
    // const [animatedValues, setAnimatedValues] = useState({});

    // useEffect(() => {
    //     if (overviewStats) {
    //         setTimeout(() => {
    //             setAnimatedValues({
    //             totalChallenges: overviewStats.totalChallenges,
    //             completedChallenges: overviewStats.completedChallenges,
    //             activeChallenges: overviewStats.activeChallenges,
    //             overallProgress: overviewStats.overallProgress,
    //             });
    //         }, 300);
    //     }
    // }, [overviewStats]);

    const cards = [
            {
            label: "Total Challenges",
            value: animatedValues.totalChallenges || 0,
            actualValue: overviewStats.totalChallenges,
            icon: Target,
            gradient: "from-cyan-500 to-blue-600",
            glowColor: "cyan-500",
            description: "Challenges created",
        },
        {
            label: "Completed",
            value: animatedValues.completedChallenges || 0,
            actualValue: overviewStats.completedChallenges,
            icon: Trophy,
            gradient: "from-emerald-500 to-green-600",
            glowColor: "emerald-500",
            description: "Finished successfully",
        },
        {
            label: "Active Now",
            value: animatedValues.activeChallenges || 0,
            actualValue: overviewStats.activeChallenges,
            icon: Zap,
            gradient: "from-orange-500 to-red-600",
            glowColor: "orange-500",
            description: "In progress",
        },
        {
            label: "Success Rate",
            value: `${animatedValues.overallProgress || 0}%`,
            actualValue: overviewStats.overallProgress,
            icon: TrendingUp,
            gradient: "from-purple-500 to-pink-600",
            glowColor: "purple-500",
            description: "Overall progress",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((item, idx) => (
            <StatCard key={idx} item={item} delay={idx * 0.1} />
        ))}
        </div>
    );
}

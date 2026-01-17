import { motion } from "framer-motion";
import { BarChart3, Flame, CheckCircle } from "lucide-react";
import InsightBadge from "./InsightBadge";

export default function Header({overviewStats}) {

    const insights = {
        totalStreak: overviewStats.totalStreak,
        completedDays: overviewStats.completedDays,
        avgCompletion: Math.round(overviewStats.overallProgress || 0)
    };


    return (
        <motion.div
        className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        >
        {/* Title */}
        <div className="flex items-center gap-4">
            <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/50 group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Your Statistics
                </h2>
                <p className="text-gray-400 text-sm">
                    Real-time performance overview
                </p>
            </div>
        </div>

        {/* Quick Insights Badges */}
        <div className="flex flex-wrap gap-3">
            <InsightBadge
            icon={<Flame className="w-4 h-4" />}
            value={insights.totalStreak}
            label="total streak"
            color="orange"
            />
            <InsightBadge
            icon={<CheckCircle className="w-4 h-4" />}
            value={insights.completedDays}
            label="days done"
            color="emerald"
            />
        </div>
        </motion.div>
    );
}

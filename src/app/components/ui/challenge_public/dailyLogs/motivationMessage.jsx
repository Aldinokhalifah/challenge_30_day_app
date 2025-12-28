import { motion } from "framer-motion";
import { TrendingUp, Flame } from "lucide-react";

export default function MotivationMessage({completedCount,  length, currentStreak }) {
    
    const getMotivationMessage = (completed, total) => {
        const percentage = (completed / total) * 100;
        if (percentage >= 90) return "🎉 Amazing! You're almost at the finish line!";
        if (percentage >= 70) return "🔥 Incredible progress! Keep the momentum!";
        if (percentage >= 50) return "💪 Halfway there! You're crushing it!";
        if (percentage >= 25) return "🚀 Great start! Stay consistent!";
        return "✨ Every journey starts with a single step!";
    };

    return (
        <motion.div
        className="flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl border border-indigo-500/20 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        >
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
            <div className="text-white font-semibold text-sm">
            {getMotivationMessage(completedCount, length)}
            </div>
            <div className="text-gray-400 text-xs">Keep pushing forward! 💪</div>
        </div>
        {currentStreak >= 7 && (
            <div className="flex items-center gap-1 px-3 py-1.5 bg-orange-500/20 rounded-full border border-orange-500/30">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-orange-300 text-xs font-bold">
                {currentStreak}🔥
            </span>
            </div>
        )}
        </motion.div>
    );
}

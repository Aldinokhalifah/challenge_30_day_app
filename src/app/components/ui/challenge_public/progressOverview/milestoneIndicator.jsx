import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function MilestoneIndicator({ totalDays, completedDays, missedDays, progressPercentage }) {

    return (
        <motion.div
            className="flex items-center gap-3 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl border border-cyan-500/20 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
        >
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
            <div className="text-white font-semibold text-sm">
                {progressPercentage >= 90
                ? "🎉 Almost there! Final push!"
                : progressPercentage >= 50
                ? "💪 Halfway milestone reached!"
                : "🚀 Keep the momentum going!"}
            </div>
            <div className="text-gray-400 text-xs">
                {totalDays - (completedDays + missedDays)} days until completion
            </div>
            </div>
        </motion.div>
    );
}
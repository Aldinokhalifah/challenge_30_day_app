import { motion } from "framer-motion";

export default function BarProgress({ completedDays, totalDays, progressPercentage }) {
    return (
        <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
        >
            <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400 font-medium">Daily Progress</span>
            <span className="text-cyan-400 font-bold">
                {completedDays}/{totalDays}
            </span>
            </div>

            <div className="relative h-6 bg-slate-800/60 rounded-2xl overflow-hidden border border-white/10 group/bar cursor-pointer">
            <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl relative"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage.slice(0, 2)}%` }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 1.2 }}
            >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-fast"></div>

                {/* Glowing Edge */}
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/60 blur-sm"></div>
            </motion.div>

            {/* Percentage Label on Bar */}
            {progressPercentage > 15 && (
                <motion.div
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white font-bold text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                >
                {progressPercentage.slice(0, 2)}% Complete
                </motion.div>
            )}
            </div>
        </motion.div>
    );
}
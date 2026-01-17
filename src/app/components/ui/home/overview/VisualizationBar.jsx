import { motion } from "framer-motion";
import { Activity } from "lucide-react";

export default function VisualizationBar({completedChallenges, totalChallenges}) {
    return (
        <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        >
        <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400 font-medium flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Overall Achievement
            </span>
            <span className="text-indigo-400 font-bold">
            {completedChallenges}/{totalChallenges}{" "}
            Challenges
            </span>
        </div>

        <div className="relative h-5 bg-slate-800/60 rounded-full overflow-hidden border border-white/10">
            <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500 rounded-full relative"
            initial={{ width: 0 }}
            animate={{
                width: `${
                (completedChallenges /
                    totalChallenges) *
                100
                }%`,
            }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
            >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-fast"></div>
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/60 blur-sm"></div>
            </motion.div>
        </div>
        </motion.div>
    );
}

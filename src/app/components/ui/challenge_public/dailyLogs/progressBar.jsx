import { motion } from "framer-motion";

export default function ProgressBar({ completedCount, length }) {
    return (
        <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        >
        <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400 font-medium">Challenge Progress</span>
            <span className="text-indigo-400 font-bold">
            {completedCount}/{length} Days
            </span>
        </div>

        <div className="relative h-4 bg-slate-800/60 rounded-full overflow-hidden border border-white/10">
            <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500 rounded-full relative"
            initial={{ width: 0 }}
            animate={{
                width: `${(completedCount / length) * 100}%`,
            }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
            >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-fast"></div>
            </motion.div>
        </div>
        </motion.div>
    );
}

import { motion } from "framer-motion";
import { Trophy, Crown, Flame } from "lucide-react";

export default function CircularAchievement({overallProgress, totalChallenges,}) {
    return (
        <div className="relative">
        <svg className="w-72 h-72 md:w-80 md:h-80 transform -rotate-90">
            {/* Background Circle */}
            <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="currentColor"
            strokeWidth="16"
            fill="none"
            className="text-slate-800/40"
            />
            {/* Progress Circle */}
            <motion.circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="url(#heroGradient)"
            strokeWidth="16"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 144}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 144 }}
            animate={{
                strokeDashoffset:
                2 * Math.PI * 144 * (1 - overallProgress / 100),
            }}
            transition={{ duration: 2, ease: "easeOut", delay: 1 }}
            strokeLinecap="round"
            className="drop-shadow-glow-pink"
            />
            <defs>
            <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
            </defs>
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
            className="text-7xl md:text-8xl font-black bg-gradient-to-br from-pink-400 via-purple-400 to-orange-400 bg-clip-text text-transparent"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, type: "spring" }}
            >
                {overallProgress}%
            </motion.div>
            <div className="text-gray-400 text-sm font-semibold mt-2">
                Success Rate
            </div>
            <div className="flex items-center gap-2 mt-3 px-4 py-2 bg-slate-800/80 backdrop-blur-sm rounded-full border border-pink-500/30">
                <Trophy className="w-4 h-4 text-pink-400" />
                <span className="text-white font-bold text-sm">
                    {totalChallenges} Challenges
                </span>
            </div>
        </div>

        {/* Orbiting Icons */}
        <motion.div
            className="absolute top-0 right-8 w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl shadow-pink-500/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
            <Crown className="w-7 h-7 text-white" />
        </motion.div>
        <motion.div
            className="absolute bottom-0 left-8 w-14 h-14 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl shadow-orange-500/50"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
            <Flame className="w-7 h-7 text-white" />
        </motion.div>
        </div>
    );
}

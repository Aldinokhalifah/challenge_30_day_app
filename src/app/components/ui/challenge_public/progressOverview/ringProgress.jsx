import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Trophy, Flame } from "lucide-react";

export default function RingProgress({ progressPercentage, streakPercentage, completedDays, totalDays, longetStreak }) {

    const progressControls = useAnimation();
    const streakControls = useAnimation();

    useEffect(() => {
        // Animate outer progress ring    
        progressControls.start({
            strokeDashoffset:
            2 * Math.PI * 90 * (1 - progressPercentage / 100),
            transition: { duration: 1.8, ease: "easeInOut", delay: 0.2 },
        });

        // Animate inner streak ring
        streakControls.start({
            strokeDashoffset: 2 * Math.PI * 70 * (1 - completedDays / 100),
            transition: { duration: 1.8, ease: "easeInOut", delay: 0.5 },
        });
        }, [progressControls, streakControls, progressPercentage, completedDays,]
    );


    return (
        <motion.div
        className="flex flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        >
        <div className="relative">
            <svg
            className="w-72 h-72 transform -rotate-90 drop-shadow-2xl"
            viewBox="0 0 200 200"
            >
            {/* Outer Ring Background */}
            <circle
                cx="100"
                cy="100"
                r="90"
                stroke="currentColor"
                strokeWidth="16"
                fill="transparent"
                className="text-slate-800/40"
            />

            {/* Inner Ring Background */}
            <circle
                cx="100"
                cy="100"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-slate-800/40"
            />

            {/* Outer Progress Ring (Overall Progress) */}
            <motion.circle
                cx="100"
                cy="100"
                r="90"
                stroke="url(#progress-gradient)"
                strokeWidth="16"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 90}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 90 }}
                animate={progressControls}
                strokeLinecap="round"
                className="drop-shadow-glow-cyan"
            />

            {/* Inner Streak Ring */}
            <motion.circle
                cx="100"
                cy="100"
                r="70"
                stroke="url(#streak-gradient)"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 70}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                animate={streakControls}
                strokeLinecap="round"
                className="drop-shadow-glow-orange"
            />

            {/* Gradients */}
            <defs>
                <linearGradient
                id="progress-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
                >
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <linearGradient
                id="streak-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
                >
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
            </defs>
            </svg>

            {/* Center Content - Animated */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                    className="text-6xl font-black bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                >
                    {progressPercentage.slice(0, 2)}%
                </motion.div>
            <div className="text-gray-400 text-sm font-semibold mt-2">
                Overall Progress
            </div>
            <div className="flex items-center gap-2 mt-3 px-4 py-2 bg-slate-800/80 backdrop-blur-sm rounded-full border border-cyan-500/30">
                <span className="text-white font-bold">{completedDays}</span>
                <span className="text-gray-400">/</span>
                <span className="text-gray-400">{totalDays} days</span>
            </div>
            </div>

            {/* Floating Labels */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg shadow-cyan-500/50 text-white text-xs font-bold">
                <Trophy className="w-3 h-3" />
                Overall
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full shadow-lg shadow-orange-500/50 text-white text-xs font-bold">
                <Flame className="w-3 h-3" />
                Streak: {longetStreak}
            </div>
        </div>
        </motion.div>
    );
}

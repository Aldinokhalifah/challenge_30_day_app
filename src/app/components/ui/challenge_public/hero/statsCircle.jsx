import { motion } from "framer-motion";
import { Circle, TrendingUp, Award } from "lucide-react";

export default function StatsCircle({ completionRate, currentDay, length, startDate  }) {
    return (
        <motion.div
            className="lg:col-span-2 flex flex-col items-center justify-center gap-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            >
            {/* Circular Progress - Large & Prominent */}
            <div className="relative">
                {/* Background Circle */}
                <svg className="w-56 h-56 md:w-64 md:h-64 transform -rotate-90">
                <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    stroke="currentColor"
                    strokeWidth="14"
                    fill="none"
                    className="text-slate-800/50"
                />
                {/* Progress Circle with Gradient */}
                <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    stroke="url(#progressGradient)"
                    strokeWidth="14"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 112}`}
                    strokeDashoffset={`${
                    2 * Math.PI * 112 * (1 - completionRate / 100)
                    }`}
                    strokeLinecap="round"
                    className="transition-all duration-1000 drop-shadow-glow-pink"
                />
                <defs>
                    <linearGradient
                    id="progressGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                    >
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                </defs>
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-6xl md:text-7xl font-black bg-gradient-to-br from-pink-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
                    {completionRate}%
                </div>
                <div className="text-gray-400 text-sm font-semibold mt-2">
                    Complete
                </div>

                {/* Day Counter - Floating Badge */}
                <div className="mt-4 px-4 py-2 bg-slate-800/80 backdrop-blur-sm rounded-full border border-pink-500/30">
                    <span className="text-white font-bold">Day {currentDay}</span>
                    <span className="text-gray-400 font-medium">
                    {" "}
                    / {length}
                    </span>
                </div>
                </div>

                {/* Orbiting Icons */}
                <motion.div
                className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                <TrendingUp className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/50"
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                <Award className="w-6 h-6 text-white" />
                </motion.div>
            </div>

            {/* Started Date - Subtle */}
            <div className="text-center">
                <div className="text-gray-500 text-xs font-medium mb-1">
                Challenge Started
                </div>
                <div className="text-gray-300 font-semibold">
                {new Date(startDate).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                })}
                </div>
            </div>
        </motion.div>
    );
}

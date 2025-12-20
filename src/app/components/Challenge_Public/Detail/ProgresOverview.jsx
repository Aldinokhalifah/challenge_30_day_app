import { TrendingUp } from "lucide-react";
import { motion, useAnimation } from "framer-motion"; 
import { useEffect } from "react";

export default function ProgressOverviewPublic({ challenge, statistic }) {
    const stats = statistic || {
        completedDays: challenge.logs.filter(l => l.status === "completed").length,
        progressPercentage: (completedDays / 30) * 100, 
        streakPercentage: (getStreakCount() / 30) * 100 || 50
    };

    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            strokeDashoffset: 2 * Math.PI * 90 * (1 - stats.progressPercentage / 100),
            transition: { duration: 1.5, ease: "easeOut" }
        });
    }, [controls, stats.progressPercentage]);

    return (
        <>
            {/* Progress Overview */}
            <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden relative">
                {/* Background enhancements - Radial gradients dan orbit SVG */}
                <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-gradient-radial from-blue-500/20 to-indigo-500/10 rounded-full blur-3xl opacity-70"></div>
                <div className="absolute bottom-[-15%] right-[-10%] w-80 h-80 bg-gradient-radial from-purple-500/20 to-pink-500/10 rounded-full blur-2xl opacity-60 animate-pulse slow"></div>
                {/* Orbit lines untuk unik */}
                <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="5,5" />
                    <circle cx="55" cy="45" r="35" stroke="purple" strokeWidth="0.3" fill="none" strokeDasharray="3,3" />
                </svg>
                {/* Placeholder for particles */}
                {/* <div id="particles-js" className="absolute inset-0"></div> */}

                <div className="space-y-6 md:mr-12"> {/* Asymmetrical shift untuk unik */}

                    {/* Header - Tambah hover interaksi */}
                    <motion.div 
                        className="flex items-center gap-4 transition-all duration-300 hover:scale-105 cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Progress Overview</h2>
                            <p className="text-gray-400">Track your journey to success</p>
                        </div>
                    </motion.div>

                    {/* Multi-Ring Circular Progress - Interaktif dengan hover */}
                    <motion.div 
                        className="flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/40 cursor-pointer"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        title={`Progress: ${Math.round(stats.progressPercentage)}% | Streak: ${Math.round(stats.streakPercentage)}%`} // Simple tooltip
                    >
                        <div className="relative w-48 h-48">
                            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 200 200">
                                {/* Background circles */}
                                <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-700" />
                                <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-700" /> {/* Inner ring bg */}

                                {/* Outer Progress circle (total progress) */}
                                <motion.circle
                                    cx="100"
                                    cy="100"
                                    r="90"
                                    stroke="url(#progress-gradient)"
                                    strokeWidth="12"
                                    fill="transparent"
                                    strokeDasharray={`${2 * Math.PI * 90}`}
                                    initial={{ strokeDashoffset: 2 * Math.PI * 90 }}
                                    animate={controls}
                                    strokeLinecap="round"
                                />
                                {/* Inner Streak circle */}
                                <motion.circle
                                    cx="100"
                                    cy="100"
                                    r="70"
                                    stroke="url(#streak-gradient)"
                                    strokeWidth="8"
                                    fill="transparent"
                                    strokeDasharray={`${2 * Math.PI * 70}`}
                                    initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                                    animate={{
                                        strokeDashoffset: 2 * Math.PI * 70 * (1 - stats.streakPercentage / 100),
                                        transition: { duration: 1.5, ease: "easeOut", delay: 0.5 }
                                    }}
                                    strokeLinecap="round"
                                />

                                {/* Gradients */}
                                <defs>
                                    <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#3b82f6" />
                                        <stop offset="50%" stopColor="#8b5cf6" />
                                        <stop offset="100%" stopColor="#ec4899" />
                                    </linearGradient>
                                    <linearGradient id="streak-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#f59e0b" />
                                        <stop offset="100%" stopColor="#ef4444" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            {/* Center content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="text-4xl font-black text-white">{Math.round(stats.progressPercentage)}%</div>
                                <div className="text-gray-400 text-sm">Complete</div>
                                <div className="text-white font-semibold mt-1">{stats.completedDays}/30 days</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Linear Progress Bar - Enhanced shimmer */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm text-gray-400">
                            <span>Daily Progress</span>
                            <span>{stats.completedDays} of 30 days completed</span>
                        </div>
                        <motion.div 
                            className="relative h-4 bg-slate-800/60 rounded-full overflow-hidden transition-all duration-300 hover:h-5 hover:shadow-purple-500/40"
                            initial={{ width: 0 }}
                            animate={{ width: "100%", transition: { duration: 1.2, ease: "easeOut" } }}
                        >
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full relative"
                                style={{ width: `${stats.progressPercentage}%` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}
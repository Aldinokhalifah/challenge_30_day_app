import { Calendar, Clock, CheckCircle, XCircle, Lock, Sparkles, TrendingUp, Award, Flame } from "lucide-react";
import { motion } from "framer-motion";

export default function DailyLogsPublic({ challenge }) {

    const getStatusIcon = (status) => {
        switch (status) {
            case "completed":
                return <CheckCircle className="w-5 h-5" />;
            case "pending":
                return <Clock className="w-5 h-5" />;
            case "missed":
                return <XCircle className="w-5 h-5" />;
            default:
                return <Lock className="w-5 h-5" />;
        }
    };

    const getStatusGradient = (status) => {
        switch (status) {
            case "completed":
                return "from-emerald-500 to-green-600";
            case "pending":
                return "from-amber-500 to-orange-600";
            case "missed":
                return "from-red-500 to-pink-600";
            default:
                return "from-gray-600 to-slate-700";
        }
    };

    const getStatusBgGlow = (status) => {
        switch (status) {
            case "completed":
                return "bg-emerald-500/10 shadow-emerald-500/30";
            case "pending":
                return "bg-amber-500/10 shadow-amber-500/30";
            case "missed":
                return "bg-red-500/10 shadow-red-500/30";
            default:
                return "bg-slate-700/10";
        }
    };

    const getStatusBorder = (status) => {
        switch (status) {
            case "completed":
                return "border-emerald-500/40 hover:border-emerald-500/80";
            case "pending":
                return "border-amber-500/40 hover:border-amber-500/80";
            case "missed":
                return "border-red-500/40 hover:border-red-500/80";
            default:
                return "border-slate-700/40";
        }
    };

    // Calculate stats for insights
    const completedCount = challenge.logs.filter(l => l.status === "completed").length;
    const missedCount = challenge.logs.filter(l => l.status === "missed").length;
    const pendingCount = challenge.logs.filter(l => l.status === "pending").length;
    const currentStreak = getCurrentStreak(challenge.logs);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            transition: { 
                type: "spring",
                stiffness: 100,
                damping: 15
            } 
        }
    };

    return (
        <div className="relative rounded-[2.5rem] overflow-hidden group">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-3xl"></div>
            
            {/* Animated Orbs */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-radial from-indigo-500/30 via-purple-500/15 to-transparent rounded-full blur-3xl animate-float"></div>
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-gradient-radial from-pink-500/30 via-purple-500/15 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
            
            {/* Decorative Grid */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(90deg, white 1px, transparent 1px),
                                     linear-gradient(0deg, white 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 border border-indigo-500/20 rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl p-8 md:p-10">
                
                {/* Header with Stats */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
                    {/* Title */}
                    <motion.div 
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="relative">
                            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/50 group-hover:scale-110 transition-transform">
                                <Calendar className="w-7 h-7 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full animate-pulse"></div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                30-Day Journey
                            </h2>
                            <p className="text-gray-400">Complete visual timeline</p>
                        </div>
                    </motion.div>

                    {/* Quick Stats Badges */}
                    <motion.div 
                        className="flex flex-wrap gap-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <StatBadge icon={<CheckCircle className="w-4 h-4" />} value={completedCount} label="Done" color="emerald" />
                        <StatBadge icon={<Clock className="w-4 h-4" />} value={pendingCount} label="Left" color="amber" />
                        <StatBadge icon={<Flame className="w-4 h-4" />} value={currentStreak} label="Streak" color="orange" />
                    </motion.div>
                </div>

                {/* Calendar Grid - Main Content */}
                <motion.div 
                    className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-10 gap-3 mb-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {challenge.logs.map((log) => (
                        <motion.div
                            key={log.day}
                            className="group/card"
                            variants={itemVariants}
                            whileHover={{ scale: 1.1, zIndex: 50 }}
                        >
                            <div
                                className={`
                                    relative aspect-square rounded-2xl border-2 transition-all duration-300 cursor-pointer
                                    ${getStatusBorder(log.status)}
                                    ${getStatusBgGlow(log.status)}
                                    backdrop-blur-sm overflow-hidden
                                    hover:shadow-2xl
                                `}
                            >
                                {/* Background Gradient on Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${getStatusGradient(log.status)} opacity-0 group-hover/card:opacity-20 transition-opacity`}></div>
                                
                                {/* Icon Badge - Top Right */}
                                <div className={`absolute top-1 right-1 w-6 h-6 bg-gradient-to-br ${getStatusGradient(log.status)} rounded-lg flex items-center justify-center shadow-lg transform transition-transform group-hover/card:scale-110`}>
                                    <div className="text-white">
                                        {getStatusIcon(log.status)}
                                    </div>
                                </div>

                                {/* Day Number - Center */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <div className="text-2xl md:text-3xl font-black text-white mb-1">
                                        {log.day}
                                    </div>
                                    <div className="text-[8px] md:text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                                        Day
                                    </div>
                                </div>

                                {/* Completed Sparkle Effect */}
                                {log.status === "completed" && (
                                    <motion.div 
                                        className="absolute top-2 left-2"
                                        animate={{ 
                                            rotate: [0, 15, -15, 0],
                                            scale: [1, 1.2, 1]
                                        }}
                                        transition={{ 
                                            duration: 2,
                                            repeat: Infinity,
                                            repeatDelay: 3
                                        }}
                                    >
                                        <Sparkles className="w-3 h-3 text-emerald-400" />
                                    </motion.div>
                                )}

                                {/* Tooltip on Hover */}
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                                    <div className="bg-slate-900 border border-white/20 text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-2xl whitespace-nowrap backdrop-blur-xl">
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(log.status)}
                                            <span className="capitalize">Day {log.day} - {log.status}</span>
                                        </div>
                                        {/* Tooltip Arrow */}
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 border-r border-b border-white/20 transform rotate-45"></div>
                                    </div>
                                </div>

                                {/* Pulse Ring for Current Day */}
                                {log.status === "pending" && log.day === pendingCount + completedCount + missedCount - 29 && (
                                    <div className="absolute inset-0 rounded-2xl border-2 border-amber-500 animate-ping"></div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Progress Bar & Legend Section */}
                <div className="space-y-6">
                    
                    {/* Overall Progress Bar */}
                    <motion.div
                        className="space-y-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400 font-medium">Challenge Progress</span>
                            <span className="text-indigo-400 font-bold">{completedCount}/{challenge.logs.length} Days</span>
                        </div>
                        
                        <div className="relative h-4 bg-slate-800/60 rounded-full overflow-hidden border border-white/10">
                            <motion.div
                                className="h-full bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500 rounded-full relative"
                                initial={{ width: 0 }}
                                animate={{ width: `${(completedCount / challenge.logs.length) * 100}%` }}
                                transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-fast"></div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Legend with Stats */}
                    <motion.div 
                        className="flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-white/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        <LegendItem
                            gradient="from-emerald-500 to-green-600"
                            label="Completed"
                            count={completedCount}
                        />
                        <LegendItem
                            gradient="from-amber-500 to-orange-600"
                            label="Pending"
                            count={pendingCount}
                        />
                        <LegendItem
                            gradient="from-red-500 to-pink-600"
                            label="Missed"
                            count={missedCount}
                        />
                    </motion.div>

                    {/* Motivation Message */}
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
                                {getMotivationMessage(completedCount, challenge.logs.length)}
                            </div>
                            <div className="text-gray-400 text-xs">
                                Keep pushing forward! 💪
                            </div>
                        </div>
                        {currentStreak >= 7 && (
                            <div className="flex items-center gap-1 px-3 py-1.5 bg-orange-500/20 rounded-full border border-orange-500/30">
                                <Flame className="w-4 h-4 text-orange-400" />
                                <span className="text-orange-300 text-xs font-bold">{currentStreak}🔥</span>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Custom CSS */}
            <style jsx>{`
                @keyframes shimmer-fast {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer-fast { animation: shimmer-fast 2s infinite; }
            `}</style>
        </div>
    );
}

// Helper Components
function StatBadge({ icon, value, label, color }) {
    const colorClasses = {
        emerald: "from-emerald-500 to-green-500",
        amber: "from-amber-500 to-orange-500",
        orange: "from-orange-500 to-red-500"
    };

    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 backdrop-blur-md rounded-full border border-white/10 hover:border-white/30 transition-all">
            <div className={`w-7 h-7 bg-gradient-to-br ${colorClasses[color]} rounded-lg flex items-center justify-center shadow-lg`}>
                <div className="text-white">
                    {icon}
                </div>
            </div>
            <div className="flex items-baseline gap-1">
                <span className="text-white font-bold text-lg">{value}</span>
                <span className="text-gray-400 text-xs font-medium">{label}</span>
            </div>
        </div>
    );
}

function LegendItem({ gradient, label, count }) {
    return (
        <motion.div 
            className="flex items-center gap-2.5 bg-slate-800/50 px-5 py-3 rounded-2xl border border-white/10 hover:border-white/30 hover:scale-105 transition-all cursor-pointer"
            whileHover={{ y: -2 }}
        >
            <div className={`w-5 h-5 bg-gradient-to-br ${gradient} rounded-lg shadow-lg`}></div>
            <span className="text-gray-300 font-medium text-sm">{label}</span>
            <span className="text-white font-bold text-sm bg-slate-700/50 px-2 py-0.5 rounded-full">{count}</span>
        </motion.div>
    );
}

// Helper Functions
function getCurrentStreak(logs) {
    let streak = 0;
    for (let i = logs.length - 1; i >= 0; i--) {
        if (logs[i].status === "completed") {
            streak++;
        } else if (logs[i].status !== "pending") {
            break;
        }
    }
    return streak;
}

function getMotivationMessage(completed, total) {
    const percentage = (completed / total) * 100;
    if (percentage >= 90) return "🎉 Amazing! You're almost at the finish line!";
    if (percentage >= 70) return "🔥 Incredible progress! Keep the momentum!";
    if (percentage >= 50) return "💪 Halfway there! You're crushing it!";
    if (percentage >= 25) return "🚀 Great start! Stay consistent!";
    return "✨ Every journey starts with a single step!";
}
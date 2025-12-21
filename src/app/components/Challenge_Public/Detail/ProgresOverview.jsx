import { TrendingUp, Zap, Trophy, Target, Sparkles, Award, Crown, Flame } from "lucide-react";
import { motion, useAnimation } from "framer-motion"; 
import { useEffect } from "react";

export default function ProgressOverviewPublic({ challenge, statistic }) {
    const completedDays = challenge.logs.filter(l => l.status === "completed").length;
    const missedDays = challenge.logs.filter(l => l.status === "missed").length;
    const totalDays = challenge.logs.length;
    
    const stats = statistic || {
        completedDays: completedDays,
        missedDays: missedDays,
        progressPercentage: Math.round((completedDays / totalDays) * 100), 
        streakPercentage: Math.round((getStreakCount() / totalDays) * 100) || 50,
        longestStreak: getStreakCount() || 0
    };

    const progressControls = useAnimation();
    const streakControls = useAnimation();

    useEffect(() => {
        // Animate outer progress ring
        progressControls.start({
            strokeDashoffset: 2 * Math.PI * 90 * (1 - stats.progressPercentage / 100),
            transition: { duration: 1.8, ease: "easeInOut", delay: 0.2 }
        });
        
        // Animate inner streak ring
        streakControls.start({
            strokeDashoffset: 2 * Math.PI * 70 * (1 - stats.streakPercentage / 100),
            transition: { duration: 1.8, ease: "easeInOut", delay: 0.5 }
        });
    }, [progressControls, streakControls, stats.progressPercentage, stats.streakPercentage]);

    // Calculate achievement level
    const getAchievementLevel = () => {
        if (stats.progressPercentage >= 90) return { title: "Legend", color: "from-yellow-400 to-orange-500", icon: Crown };
        if (stats.progressPercentage >= 70) return { title: "Champion", color: "from-purple-400 to-pink-500", icon: Trophy };
        if (stats.progressPercentage >= 50) return { title: "Warrior", color: "from-blue-400 to-purple-500", icon: Award };
        if (stats.progressPercentage >= 30) return { title: "Rising Star", color: "from-cyan-400 to-blue-500", icon: Sparkles };
        return { title: "Beginner", color: "from-gray-400 to-slate-500", icon: Target };
    };

    const achievement = getAchievementLevel();
    const AchievementIcon = achievement.icon;

    return (
        <div className="relative rounded-[2.5rem] overflow-hidden group">
            {/* Dynamic Background - Matching Hero Style */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-3xl"></div>
            
            {/* Animated Orbs */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-gradient-radial from-cyan-500/30 via-blue-500/15 to-transparent rounded-full blur-3xl animate-float"></div>
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-gradient-radial from-purple-500/30 via-pink-500/15 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                    backgroundSize: '30px 30px'
                }}></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 border border-cyan-500/20 rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl p-8 md:p-10">
                
                {/* Header with Achievement Badge */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <motion.div 
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="relative">
                            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/50 group-hover:scale-110 transition-transform">
                                <TrendingUp className="w-7 h-7 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full animate-pulse"></div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Progress Journey
                            </h2>
                            <p className="text-gray-400">Your path to greatness</p>
                        </div>
                    </motion.div>

                    {/* Achievement Level Badge */}
                    <motion.div
                        className={`flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r ${achievement.color} rounded-full shadow-lg relative overflow-hidden`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        whileHover={{ scale: 1.1 }}
                    >
                        <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                        <AchievementIcon className="w-5 h-5 text-white relative z-10" />
                        <span className="text-white font-bold text-sm relative z-10">{achievement.title}</span>
                        <Sparkles className="w-4 h-4 text-white relative z-10 animate-pulse" />
                    </motion.div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    
                    {/* Left Side - Dual Ring Progress */}
                    <motion.div 
                        className="flex flex-col items-center justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <div className="relative">
                            <svg className="w-72 h-72 transform -rotate-90 drop-shadow-2xl" viewBox="0 0 200 200">
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
                                    <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#06b6d4" />
                                        <stop offset="50%" stopColor="#3b82f6" />
                                        <stop offset="100%" stopColor="#8b5cf6" />
                                    </linearGradient>
                                    <linearGradient id="streak-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
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
                                    {stats.progressPercentage}%
                                </motion.div>
                                <div className="text-gray-400 text-sm font-semibold mt-2">Overall Progress</div>
                                <div className="flex items-center gap-2 mt-3 px-4 py-2 bg-slate-800/80 backdrop-blur-sm rounded-full border border-cyan-500/30">
                                    <span className="text-white font-bold">{stats.completedDays}</span>
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
                                Streak: {stats.streakPercentage}%
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Stats & Bar */}
                    <div className="space-y-6">
                        
                        {/* Quick Stats Grid */}
                        <motion.div 
                            className="grid grid-cols-2 gap-4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <MiniStatCard
                                icon={<Zap className="w-5 h-5" />}
                                value={stats.completedDays}
                                label="Completed"
                                gradient="from-emerald-500 to-green-500"
                                delay={0.7}
                            />
                            <MiniStatCard
                                icon={<Target className="w-5 h-5" />}
                                value={totalDays - stats.completedDays}
                                label="Remaining"
                                gradient="from-blue-500 to-cyan-500"
                                delay={0.8}
                            />
                            <MiniStatCard
                                icon={<Flame className="w-5 h-5" />}
                                value={stats.longestStreak}
                                label="Best Streak"
                                gradient="from-orange-500 to-red-500"
                                delay={0.9}
                            />
                            <MiniStatCard
                                icon={<Trophy className="w-5 h-5" />}
                                value={`${stats.progressPercentage}%`}
                                label="Success Rate"
                                gradient="from-purple-500 to-pink-500"
                                delay={1.0}
                            />
                        </motion.div>

                        {/* Linear Progress Bar with Gradient */}
                        <motion.div 
                            className="space-y-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.1 }}
                        >
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400 font-medium">Daily Progress</span>
                                <span className="text-cyan-400 font-bold">{stats.completedDays}/{totalDays}</span>
                            </div>
                            
                            <div className="relative h-6 bg-slate-800/60 rounded-2xl overflow-hidden border border-white/10 group/bar cursor-pointer">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl relative"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${stats.progressPercentage}%` }}
                                    transition={{ duration: 1.5, ease: "easeOut", delay: 1.2 }}
                                >
                                    {/* Shimmer Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-fast"></div>
                                    
                                    {/* Glowing Edge */}
                                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/60 blur-sm"></div>
                                </motion.div>
                                
                                {/* Percentage Label on Bar */}
                                {stats.progressPercentage > 15 && (
                                    <motion.div 
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white font-bold text-xs"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.8 }}
                                    >
                                        {stats.progressPercentage}% Complete
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>

                        {/* Milestone Indicator */}
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
                                    {stats.progressPercentage >= 90 
                                        ? "🎉 Almost there! Final push!" 
                                        : stats.progressPercentage >= 50 
                                        ? "💪 Halfway milestone reached!"
                                        : "🚀 Keep the momentum going!"}
                                </div>
                                <div className="text-gray-400 text-xs">
                                    {totalDays - stats.completedDays} days until completion
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Custom CSS */}
            <style jsx>{`
                @keyframes shimmer-fast {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer-fast { animation: shimmer-fast 2s infinite; }
                .drop-shadow-glow-cyan { filter: drop-shadow(0 0 20px rgba(6, 182, 212, 0.6)); }
                .drop-shadow-glow-orange { filter: drop-shadow(0 0 15px rgba(251, 146, 60, 0.6)); }
            `}</style>
        </div>
    );
}

// Mini Stat Card Component
function MiniStatCard({ icon, value, label, gradient, delay }) {
    return (
        <motion.div
            className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:border-cyan-500/50 transition-all cursor-pointer group relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            whileHover={{ scale: 1.05, y: -4 }}
        >
            {/* Hover Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
            
            <div className="relative z-10">
                <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg mb-3 group-hover:scale-110 transition-transform`}>
                    <div className="text-white">
                        {icon}
                    </div>
                </div>
                <div className="text-3xl font-black text-white mb-1">{value}</div>
                <div className="text-xs text-gray-400 font-medium">{label}</div>
            </div>
        </motion.div>
    );
}
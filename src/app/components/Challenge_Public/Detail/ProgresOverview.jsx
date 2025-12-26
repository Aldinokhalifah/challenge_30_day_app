import { CheckCircle, Target, Flame, XCircle } from "lucide-react";
import { motion } from "framer-motion"; 
import MiniStatCard from "../../ui/challenge_public/progressOverview/miniStatCard";
import AchievementLevel from "../../ui/challenge_public/progressOverview/achieveMentLevel";
import RingProgress from "../../ui/challenge_public/progressOverview/ringProgress";
import BarProgress from "../../ui/challenge_public/progressOverview/barProgress";
import MilestoneIndicator from "../../ui/challenge_public/progressOverview/milestoneIndicator";
import HeaderBadge from "../../ui/challenge_public/progressOverview/headerBadge";

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
                    <HeaderBadge />

                    {/* Achievement Level Badge */}
                    <AchievementLevel progressPercentage={stats.progressPercentage}/>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    
                    {/* Left Side - Dual Ring Progress */}
                    <RingProgress progressPercentage={stats.progressPercentage} streakPercentage={stats.completedDays} completedDays={stats.completedDays} totalDays={totalDays} longetStreak={stats.longestStreak}/>

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
                                icon={<CheckCircle className="w-5 h-5" />}
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
                                icon={<XCircle className="w-5 h-5" />}
                                value={missedDays}
                                label="Missed Days"
                                gradient="from-red-500 to-pink-500"
                                delay={1.0}
                            />
                        </motion.div>

                        {/* Linear Progress Bar with Gradient */}
                        <BarProgress completedDays={stats.completedDays} totalDays={totalDays} progressPercentage={stats.progressPercentage}/>

                        {/* Milestone Indicator */}
                        <MilestoneIndicator totalDays={totalDays} completedDays={stats.completedDays} missedDays={missedDays} progressPercentage={stats.progressPercentage}/>
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
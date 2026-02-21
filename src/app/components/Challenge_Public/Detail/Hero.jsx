import { useMemo } from "react";
import { Target, Flame, CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";
import PublicBadge from "../../ui/challenge_public/hero/publicBadge";
import ShareButton from "../../ui/challenge_public/hero/shareButton";
import StatsCircle from "../../ui/challenge_public/hero/statsCircle";
import StatCard from "../../ui/challenge_public/hero/statsCard";
import StatsSocial from "../../ui/challenge_public/hero/statsSocial";
import CreatorInfo from "../../ui/challenge_public/hero/creatorInfo";

export default function HeroChallengeDetailPublic({ challenge, statistic }) {
    const stats = statistic || {
        completedDays: useMemo(() => {
            return challenge.logs.filter(l => l.status === "completed").length
        }, [challenge.logs]),
        pendingDays: useMemo(() => {
            return challenge.logs.filter(l => l.status === "pending").length
        }, [challenge.logs]),
        longestStreak: getStreakCount(),
    };

    // mock data
    const totalViews = 120;
    const participants = 55;

    const completionRate = Math.round((stats.completedDays / challenge.logs.length) * 100);
    const currentDay = useMemo(() => {
        return challenge.logs.filter(l => l.status !== "pending").length + 1
    }, [challenge.logs]);

    return (
        <>
            {/* Main Hero Container - Asymmetric Design */}
            <div className="relative rounded-[2.5rem] overflow-hidden">
                {/* Dynamic Gradient Background - More vibrant */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-600/20 via-40% to-orange-500/20 backdrop-blur-3xl"></div>
                
                {/* Animated Orbs - More dramatic */}
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-radial from-pink-500/40 via-purple-500/20 to-transparent rounded-full blur-3xl animate-float"></div>
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-radial from-orange-500/40 via-amber-500/20 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-purple-500/30 to-transparent rounded-full blur-2xl animate-pulse-slow"></div>

                {/* Diagonal Grid Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(45deg, white 1px, transparent 1px),
                                         linear-gradient(-45deg, white 1px, transparent 1px)`,
                        backgroundSize: '30px 30px'
                    }}></div>
                </div>

                {/* Content Container */}
                <div className="relative z-10 border border-pink-500/30 rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl p-8 md:p-12"
                >
                    
                    {/* Top Bar - Public Badge + Social Stats */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                        {/* Public Badge - Glowing */}
                        <motion.div 
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full shadow-lg shadow-pink-500/50 relative overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <PublicBadge />
                        </motion.div>

                        {/* Social Stats - Floating */}
                        < StatsSocial totalViews={totalViews} participants={participants}/>
                    </div>

                    {/* Main Content Grid - Asymmetric Layout */}
                    <div className="grid lg:grid-cols-5 gap-8 items-start">
                        
                        {/* Left Side - Title & Description (3 cols) */}
                        <div className="lg:col-span-3 space-y-6">
                            
                            {/* Title - Massive & Gradient */}
                            <motion.h1 
                                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-orange-400 bg-clip-text text-transparent inline-block animate-gradient bg-[length:200%_auto]">
                                    {challenge.title}
                                </span>
                            </motion.h1>

                            {/* Description */}
                            <motion.p 
                                className="text-gray-300 text-lg md:text-xl leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                {challenge.description}
                            </motion.p>

                            {/* Creator Info - Card Style */}
                            <CreatorInfo name={challenge.creator}/>

                            {/* Share Button - Call to Action */}
                            <ShareButton customId={challenge.customId}/>
                        </div>

                        {/* Right Side - Stats Circle (2 cols) */}
                        <StatsCircle completionRate={completionRate} currentDay={currentDay} length={challenge.logs.length} startDate={challenge.startDate}/>
                    </div>

                    {/* Bottom Stats Bar - Horizontal Cards */}
                    <motion.div 
                        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <StatCard
                            icon={<CheckCircle className="w-6 h-6" />}
                            value={stats.completedDays}
                            label="Completed"
                            gradient="from-emerald-500 to-green-500"
                            glowColor="emerald"
                        />
                        <StatCard
                            icon={<Clock className="w-6 h-6" />}
                            value={stats.pendingDays}
                            label="Pending"
                            gradient="from-amber-500 to-orange-500"
                            glowColor="amber"
                        />
                        <StatCard
                            icon={<Flame className="w-6 h-6" />}
                            value={stats.longestStreak}
                            label="Best Streak"
                            gradient="from-orange-500 to-red-500"
                            glowColor="orange"
                        />
                        <StatCard
                            icon={<Target className="w-6 h-6" />}
                            value={stats.pendingDays}
                            label="To Go"
                            gradient="from-purple-500 to-pink-500"
                            glowColor="purple"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes float {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(30px, -30px) scale(1.1); }
                }
                @keyframes float-delayed {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(-30px, 30px) scale(1.1); }
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.05); }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-shimmer { animation: shimmer 3s infinite; }
                .animate-float { animation: float 8s ease-in-out infinite; }
                .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite; }
                .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
                .animate-spin-slow { animation: spin-slow 8s linear infinite; }
                .animate-gradient { animation: gradient 3s ease infinite; }
                .drop-shadow-glow-pink { filter: drop-shadow(0 0 20px rgba(236, 72, 153, 0.6)); }
            `}</style>
        </>
    );
}
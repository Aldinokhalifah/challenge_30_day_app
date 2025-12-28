import { useMemo } from "react";
import { Clock, CheckCircle, Flame } from "lucide-react";
import { motion } from "framer-motion";
import Title from "../../ui/challenge_public/dailyLogs/title";
import StatBadge from "../../ui/challenge_public/dailyLogs/statsBadge";
import LegendItem from "../../ui/challenge_public/dailyLogs/legendItem";
import MotivationMessage from "../../ui/challenge_public/dailyLogs/motivationMessage";
import ProgressBar from "../../ui/challenge_public/dailyLogs/progressBar";
import Logs from "../../ui/challenge_public/dailyLogs/logs";

export default function DailyLogsPublic({ challenge, statistic }) {

    // Calculate stats for insights
    const completedCount = useMemo(() => {
        return challenge.logs.filter(l => l.status === "completed").length
    }, [challenge.logs]);
    const missedCount = useMemo(() => {
        return challenge.logs.filter(l => l.status === "missed").length
    }, [challenge.logs]);
    const pendingCount = useMemo(() => {
        return challenge.logs.filter(l => l.status === "pending").length
    }, [challenge.logs]);
    const currentStreak = statistic.longestStreak;

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
                    <Title />

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
                <Logs challenge={challenge} completedCount={completedCount} pendingCount={pendingCount} missedCount={missedCount}/>

                {/* Progress Bar & Legend Section */}
                <div className="space-y-6">
                    
                    {/* Overall Progress Bar */}
                    <ProgressBar completedCount={completedCount} length={challenge.logs.length}/>

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
                    <MotivationMessage currentStreak={currentStreak} length={challenge.logs.length} completedCount={completedCount}/>
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
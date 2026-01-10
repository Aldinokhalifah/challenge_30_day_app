"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
    Trophy, 
    Target, 
    Zap, 
    TrendingUp, 
    Flame,
    Award,
    CheckCircle,
    Activity,
    Sparkles,
    BarChart3,
} from "lucide-react";

export default function OverviewStats({ overviewStats }) {
    const [animatedValues, setAnimatedValues] = useState({});

    useEffect(() => {
        if (overviewStats) {
            setTimeout(() => {
                setAnimatedValues({
                    totalChallenges: overviewStats.totalChallenges,
                    completedChallenges: overviewStats.completedChallenges,
                    activeChallenges: overviewStats.activeChallenges,
                    overallProgress: overviewStats.overallProgress,
                });
            }, 300);
        }
    }, [overviewStats]); 

    // Loading skeleton - Enhanced
    if (!overviewStats) {
        return (
            <section className="mt-12 space-y-8">
                <div className="relative rounded-[2.5rem] overflow-hidden">
                    <div className="p-8 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem]">
                        <div className="text-center space-y-4 mb-8">
                            <div className="w-48 h-8 bg-gray-700/50 rounded-2xl mx-auto animate-pulse"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[...Array(4)].map((_, idx) => (
                                <div key={idx} className="bg-slate-800/50 rounded-2xl p-6 animate-pulse">
                                    <div className="space-y-4">
                                        <div className="w-12 h-12 bg-gray-600/50 rounded-xl"></div>
                                        <div className="w-16 h-8 bg-gray-600/50 rounded"></div>
                                        <div className="w-24 h-4 bg-gray-600/50 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    const cards = [
        { 
            label: "Total Challenges", 
            value: animatedValues.totalChallenges || 0,
            actualValue: overviewStats.totalChallenges,
            icon: Target,
            gradient: "from-cyan-500 to-blue-600",
            glowColor: "cyan-500",
            description: "Challenges created"
        },
        { 
            label: "Completed", 
            value: animatedValues.completedChallenges || 0,
            actualValue: overviewStats.completedChallenges,
            icon: Trophy,
            gradient: "from-emerald-500 to-green-600",
            glowColor: "emerald-500",
            description: "Finished successfully"
        },
        { 
            label: "Active Now", 
            value: animatedValues.activeChallenges || 0,
            actualValue: overviewStats.activeChallenges,
            icon: Zap,
            gradient: "from-orange-500 to-red-600",
            glowColor: "orange-500",
            description: "In progress"
        },
        { 
            label: "Success Rate", 
            value: `${animatedValues.overallProgress || 0}%`,
            actualValue: overviewStats.overallProgress,
            icon: TrendingUp,
            gradient: "from-purple-500 to-pink-600",
            glowColor: "purple-500",
            description: "Overall progress"
        },
    ];

    // Calculate additional insights
    const insights = {
        totalStreak: overviewStats.totalStreak,
        completedDays: overviewStats.completedDays,
        avgCompletion: Math.round(overviewStats.overallProgress || 0)
    };

    return (
        <section className="mt-12 space-y-8">
            
            {/* Main Stats Container - Bold Design */}
            <div className="relative rounded-[2.5rem] overflow-hidden">
                
                {/* Dynamic Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-3xl"></div>
                
                {/* Animated Orbs */}
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-radial from-indigo-500/30 via-purple-500/15 to-transparent rounded-full blur-3xl animate-float"></div>
                <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-gradient-radial from-pink-500/30 via-purple-500/15 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(90deg, white 1px, transparent 1px),
                                         linear-gradient(0deg, white 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>

                {/* Content */}
                <div className="relative z-10 border border-indigo-500/20 rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl p-8 md:p-10">
                    
                    {/* Header */}
                    <motion.div 
                        className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Title */}
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/50 group-hover:scale-110 transition-transform">
                                    <BarChart3 className="w-7 h-7 text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full animate-pulse"></div>
                            </div>
                            <div>
                                <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    Your Statistics
                                </h2>
                                <p className="text-gray-400 text-sm">Real-time performance overview</p>
                            </div>
                        </div>

                        {/* Quick Insights Badges */}
                        <div className="flex flex-wrap gap-3">
                            <InsightBadge icon={<Flame className="w-4 h-4" />} value={insights.totalStreak} label="total streak" color="orange" />
                            <InsightBadge icon={<CheckCircle className="w-4 h-4" />} value={insights.completedDays} label="days done" color="emerald" />
                        </div>
                    </motion.div>

                    {/* Stats Grid - Enhanced Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {cards.map((item, idx) => (
                            <StatCard 
                                key={idx}
                                item={item}
                                delay={idx * 0.1}
                            />
                        ))}
                    </div>

                    {/* Progress Visualization Bar */}
                    <motion.div
                        className="space-y-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400 font-medium flex items-center gap-2">
                                <Activity className="w-4 h-4" />
                                Overall Achievement
                            </span>
                            <span className="text-indigo-400 font-bold">
                                {overviewStats.completedChallenges}/{overviewStats.totalChallenges} Challenges
                            </span>
                        </div>
                        
                        <div className="relative h-5 bg-slate-800/60 rounded-full overflow-hidden border border-white/10">
                            <motion.div
                                className="h-full bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500 rounded-full relative"
                                initial={{ width: 0 }}
                                animate={{ 
                                    width: `${(overviewStats.completedChallenges / overviewStats.totalChallenges) * 100}%` 
                                }}
                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-fast"></div>
                                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/60 blur-sm"></div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Bottom Info Pills */}
                    <motion.div 
                        className="flex flex-wrap justify-center gap-3 pt-6 border-t border-white/10 mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <InfoPill icon={<Activity className="w-3 h-3" />} text="Live tracking" />
                        <InfoPill icon={<Sparkles className="w-3 h-3" />} text="Auto-updated" />
                        <InfoPill icon={<Award className="w-3 h-3" />} text={`${insights.avgCompletion}% avg completion`} />
                    </motion.div>
                </div>

                {/* Custom CSS */}
                <style jsx>{`
                    @keyframes float {
                        0%, 100% { transform: translate(0, 0) scale(1); }
                        50% { transform: translate(30px, -30px) scale(1.1); }
                    }
                    @keyframes float-delayed {
                        0%, 100% { transform: translate(0, 0) scale(1); }
                        50% { transform: translate(-30px, 30px) scale(1.1); }
                    }
                    @keyframes shimmer-fast {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                    .animate-float { animation: float 8s ease-in-out infinite; }
                    .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite; }
                    .animate-shimmer-fast { animation: shimmer-fast 2s infinite; }
                `}</style>
            </div>
        </section>
    );
}

// ========================================
// Stat Card Component
// ========================================
function StatCard({ item, delay }) {
    const Icon = item.icon;

    return (
        <motion.div
            className="group relative bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all cursor-pointer overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -4 }}
        >
            {/* Hover Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
            
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 space-y-4">
                {/* Icon */}
                <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center shadow-lg shadow-${item.glowColor}/50 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                </div>

                {/* Value */}
                <div className="space-y-1">
                    <div className={`text-4xl font-black bg-gradient-to-br ${item.gradient} bg-clip-text text-transparent`}>
                        <AnimatedNumber 
                            value={typeof item.actualValue === 'number' ? item.actualValue : parseInt(item.actualValue)} 
                            suffix={item.label.includes('Rate') ? '%' : ''}
                        />
                    </div>
                    
                    <p className="text-white font-semibold text-sm">
                        {item.label}
                    </p>
                    
                    <p className="text-gray-500 text-xs">
                        {item.description}
                    </p>
                </div>
            </div>

            {/* Glow Effect on Hover */}
            <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity bg-gradient-to-br ${item.gradient} blur-xl`}></div>
        </motion.div>
    );
}

// ========================================
// Insight Badge Component
// ========================================
function InsightBadge({ icon, value, label, color }) {
    const colors = {
        orange: "from-orange-500 to-red-500",
        emerald: "from-emerald-500 to-green-500",
        purple: "from-purple-500 to-pink-500"
    };

    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 backdrop-blur-md rounded-full border border-white/10 hover:border-white/30 transition-all">
            <div className={`w-7 h-7 bg-gradient-to-br ${colors[color]} rounded-lg flex items-center justify-center shadow-lg`}>
                <div className="text-white">
                    {icon}
                </div>
            </div>
            <div className="flex items-baseline gap-1">
                <span className="text-white font-bold text-sm">{value}</span>
                <span className="text-gray-400 text-xs">{label}</span>
            </div>
        </div>
    );
}

// ========================================
// Info Pill Component
// ========================================
function InfoPill({ icon, text }) {
    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="text-gray-400">
                {icon}
            </div>
            <span className="text-gray-400 text-xs font-medium">{text}</span>
        </div>
    );
}

// ========================================
// Animated Number Component
// ========================================
function AnimatedNumber({ value, suffix = '' }) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let startTime = Date.now();
        const duration = 1500;
        
        const animateNumber = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easeOutCubic * value);
            
            setDisplayValue(currentValue);
            
            if (progress < 1) {
                requestAnimationFrame(animateNumber);
            }
        };
        
        if (value > 0) {
            requestAnimationFrame(animateNumber);
        }
    }, [value]);

    return <span>{displayValue}{suffix}</span>;
}
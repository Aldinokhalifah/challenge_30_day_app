"use client";

import { useEffect, useState } from "react";

export default function OverviewStats() {
    const [stats, setStats] = useState(null);
    const [animatedValues, setAnimatedValues] = useState({});

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');

                const res = await fetch("/api/challenge/statistic", {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await res.json();
                setStats(data);
                
                // Animate numbers from 0 to actual value
                setTimeout(() => {
                    setAnimatedValues({
                        totalChallenges: data.totalChallenges,
                        completedChallenges: data.completedChallenges,
                        activeChallenges: data.activeChallenges,
                        overallProgress: data.overallProgress
                    });
                }, 300);
            } catch (error) {
                console.error("❌ Error fetch overview stats:", error);
            }
        };
        fetchStats();
    }, []);

    // Loading skeleton
    if (!stats) {
        return (
            <section className="mt-12 space-y-8">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/10 animate-pulse">
                        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                        <div className="w-32 h-4 bg-gray-600 rounded"></div>
                    </div>
                    <div className="w-48 h-8 bg-gray-700 rounded mx-auto animate-pulse"></div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, idx) => (
                        <div key={idx} className="bg-slate-800/50 rounded-3xl p-6 animate-pulse">
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-gray-600 rounded-2xl"></div>
                                <div className="w-16 h-8 bg-gray-600 rounded"></div>
                                <div className="w-24 h-4 bg-gray-600 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    const cards = [
        { 
            label: "Total Challenges", 
            value: animatedValues.totalChallenges || 0,
            actualValue: stats.totalChallenges,
            icon: "🎯",
            gradient: "from-blue-500 via-indigo-600 to-purple-700",
            glowColor: "blue-500/30",
            bgGradient: "from-blue-500/10 to-indigo-600/5"
        },
        { 
            label: "Completed", 
            value: animatedValues.completedChallenges || 0,
            actualValue: stats.completedChallenges,
            icon: "🏆",
            gradient: "from-emerald-500 via-green-600 to-teal-700",
            glowColor: "emerald-500/30",
            bgGradient: "from-emerald-500/10 to-green-600/5"
        },
        { 
            label: "Active", 
            value: animatedValues.activeChallenges || 0,
            actualValue: stats.activeChallenges,
            icon: "⚡",
            gradient: "from-orange-500 via-amber-600 to-yellow-700",
            glowColor: "orange-500/30",
            bgGradient: "from-orange-500/10 to-amber-600/5"
        },
        { 
            label: "Progress", 
            value: `${animatedValues.overallProgress || 0} %`,
            actualValue: stats.overallProgress,
            icon: "📊",
            gradient: "from-pink-500 via-rose-600 to-red-700",
            glowColor: "pink-500/30",
            bgGradient: "from-pink-500/10 to-rose-600/5"
        },
    ];

    return (
        <section className="mt-12 space-y-10">
            {/* Section Header */}
            <div className="text-center space-y-6 relative">
                {/* Background decoration */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-80 h-24 bg-gradient-to-r from-indigo-600/5 via-purple-600/10 to-blue-600/5 blur-3xl rounded-full"></div>
                </div>

                <div className="relative z-10 space-y-4">
                    {/* Status badge */}
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl">
                        <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-white font-medium">Statistics Overview</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent py-2">
                        Your Progress Dashboard
                    </h2>

                    <div className="flex items-center justify-center gap-4">
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent flex-1 max-w-24"></div>
                        <div className="w-2 h-2 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full animate-spin"></div>
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent flex-1 max-w-24"></div>
                    </div>
                </div>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
                {cards.map((item, idx) => (
                    <div
                        key={idx}
                        className={`group relative bg-gradient-to-br from-slate-900/90 to-slate-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl hover:shadow-${item.glowColor} transition-all duration-700 transform hover:-translate-y-2 hover:scale-105 cursor-pointer overflow-hidden`}
                        style={{
                            animationDelay: `${idx * 200}ms`
                        }}
                    >
                        {/* Background gradient overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
                        
                        {/* Floating background elements */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-xl"></div>

                        <div className="relative z-10 space-y-6">
                            {/* Icon container with 3D effect */}
                            <div className="relative">
                                <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500`}>
                                    <span className="text-2xl filter drop-shadow-lg">{item.icon}</span>
                                </div>
                                <div className={`absolute inset-0 w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500`}></div>
                            </div>

                            {/* Value with animation */}
                            <div className="space-y-2">
                                <div className={`text-4xl lg:text-5xl font-black bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent transition-all duration-500 group-hover:scale-110 transform-gpu`}>
                                    <AnimatedNumber 
                                        value={typeof item.actualValue === 'number' ? item.actualValue : parseInt(item.actualValue)} 
                                        suffix={item.label === 'Progress' ? '%' : ''}
                                    />
                                </div>
                                
                                <p className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors duration-300">
                                    {item.label}
                                </p>
                            </div>

                            {/* Progress indicator for non-progress cards */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>{item.label === 'Progress' ? 'Progress' : 'Overall'}</span>
                                    <span>
                                        {item.label === 'Progress' 
                                            ? `${item.value}` 
                                            : `+${item.value}%`
                                        }
                                    </span>
                                </div>
                                <div className="w-full bg-slate-800/60 rounded-full h-1.5">
                                    <div 
                                        className={`bg-gradient-to-r ${item.gradient} h-1.5 rounded-full transition-all duration-1000 ease-out`}
                                        style={{ 
                                            width: item.actualValue > 0 
                                                ? `${Math.min(item.actualValue)}%`
                                                : `0%`
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Hover glow effect */}
                        <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${item.gradient} blur-2xl`}></div>
                    </div>
                ))}
            </div>

            {/* Bottom insights */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-xl backdrop-blur-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Real-time data</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-xl backdrop-blur-sm">
                    <span>📈</span>
                    <span>Updated continuously</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-xl backdrop-blur-sm">
                    <span>🎯</span>
                    <span>Track your journey</span>
                </div>
            </div>
        </section>
    );
}

// Animated Number Component
function AnimatedNumber({ value, suffix = '' }) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let startTime = Date.now();
        const duration = 1500; // 1.5 seconds
        
        const animateNumber = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
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

    return (
        <span>
            {displayValue}{suffix}
        </span>
    );
}
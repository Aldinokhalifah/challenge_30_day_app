import { TrendingUp } from "lucide-react";
import { useMemo } from "react";

export default function ProgressOverview({ challenge, statistic }) {
    const stats = statistic || {
        completedDays : useMemo(() => {
            return challenge.logs.filter(l => l.status === "completed").length
        }, [challenge.logs]),
        progressPercentage : (completedDays / 30) * 100
    };
        
    return (
        <>
            {/* Progress Overview */}
            <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Progress Overview</h2>
                            <p className="text-gray-400">Track your journey to success</p>
                        </div>
                    </div>

                    {/* Circular Progress */}
                    <div className="flex items-center justify-center">
                        <div className="relative w-48 h-48">
                            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 200 200">
                                {/* Background circle */}
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="90"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="transparent"
                                    className="text-slate-700"
                                />
                                {/* Progress circle */}
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="90"
                                    stroke="url(#progress-gradient)"
                                    strokeWidth="12"
                                    fill="transparent"
                                    strokeDasharray={`${2 * Math.PI * 90}`}
                                    strokeDashoffset={`${2 * Math.PI * 90 * (1 - stats.progressPercentage / 100)}`}
                                    className="transition-all duration-1000 ease-out"
                                    strokeLinecap="round"
                                />
                                {/* Gradient definition */}
                                <defs>
                                    <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#3b82f6" />
                                        <stop offset="50%" stopColor="#8b5cf6" />
                                        <stop offset="100%" stopColor="#ec4899" />
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
                    </div>

                    {/* Linear Progress Bar */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm text-gray-400">
                            <span>Daily Progress</span>
                            <span>{stats.completedDays} of 30 days completed</span>
                        </div>
                        <div className="relative h-4 bg-slate-800/60 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out relative"
                                style={{ width: `${stats.progressPercentage}%` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
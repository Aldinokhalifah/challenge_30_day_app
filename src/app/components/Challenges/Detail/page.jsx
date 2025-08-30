import { useState } from "react";
import AnimatedGradientBg from "../../animatedBgGradient";
import ProtectedRoute from "../../protectedRoute";
import Sidebar from "../../sidebar";
import { Menu, Calendar, Target, TrendingUp, Award, Flame, CheckCircle, Clock, XCircle } from "lucide-react";

export default function ChallengeDetail({ challenge }) {
    const completedDays = challenge.logs.filter(l => l.status === "completed").length;
    const pendingDays = challenge.logs.filter(l => l.status === "pending").length;
    const missedDays = challenge.logs.filter(l => l.status === "missed").length;
    const progressPercentage = (completedDays / 30) * 100;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const getStreakCount = () => {
        let currentStreak = 0;
        for (let i = challenge.logs.length - 1; i >= 0; i--) {
            if (challenge.logs[i].status === "completed") {
                currentStreak++;
            } else {
                break;
            }
        }
        return currentStreak;
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "completed":
                return <CheckCircle className="w-4 h-4" />;
            case "pending":
                return <Clock className="w-4 h-4" />;
            case "missed":
                return <XCircle className="w-4 h-4" />;
            default:
                return <Clock className="w-4 h-4" />;
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
                return "from-gray-500 to-slate-600";
        }
    };

    return (
        <ProtectedRoute>
            <AnimatedGradientBg>
                <div className="min-h-screen">
                    {/* Sidebar */}
                    <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                    
                    {/* Main Content */}
                    <div className="lg:ml-52 flex flex-col min-h-screen">

                        {/* Header */}
                        <header className="sticky top-0 z-30 flex items-center bg-slate-900/40 backdrop-blur-md border-b border-white/10 px-4 py-3 lg:hidden">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="p-2 rounded-lg hover:bg-white/10 text-indigo-200 transition-colors"
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                            <h1 className="ml-3 text-lg font-semibold text-white">Challenge Details</h1>
                        </header>
                        
                        {/* Content */}
                        <main className="flex-1 p-4 lg:p-8 space-y-8">

                            {/* Hero Card - Challenge Info */}
                            <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
                                {/* Background decorations */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl"></div>

                                <div className="relative z-10 space-y-6">
                                    {/* Status Badge */}
                                    <div className="flex items-center gap-4">
                                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-600/20 to-green-600/20 backdrop-blur-sm rounded-2xl border border-emerald-500/30">
                                            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                                            <span className="text-emerald-300 font-semibold">Active Challenge</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-white/10">
                                            <Calendar className="w-4 h-4 text-indigo-400" />
                                            <span className="text-gray-300 text-sm">
                                                Started {new Date(challenge.startDate).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Title and Description */}
                                    <div className="space-y-4">
                                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-white via-indigo-200 to-blue-400 bg-clip-text text-transparent leading-tight">
                                            {challenge.title}
                                        </h1>
                                        <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
                                            {challenge.description}
                                        </p>
                                    </div>

                                    {/* Quick Stats */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                                                    <CheckCircle className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <div className="text-2xl font-bold text-white">{completedDays}</div>
                                                    <div className="text-xs text-gray-400">Completed</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                                                    <Clock className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <div className="text-2xl font-bold text-white">{pendingDays}</div>
                                                    <div className="text-xs text-gray-400">Pending</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                                                    <Flame className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <div className="text-2xl font-bold text-white">{getStreakCount()}</div>
                                                    <div className="text-xs text-gray-400">Streak</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                                                    <Target className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <div className="text-2xl font-bold text-white">{30 - completedDays}</div>
                                                    <div className="text-xs text-gray-400">Remaining</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Section */}
                            <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                                <div className="space-y-6">
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
                                                    strokeDashoffset={`${2 * Math.PI * 90 * (1 - progressPercentage / 100)}`}
                                                    className="transition-all duration-1000 ease-out"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            
                                            {/* Center content */}
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <div className="text-4xl font-black text-white">{Math.round(progressPercentage)}%</div>
                                                <div className="text-gray-400 text-sm">Complete</div>
                                                <div className="text-white font-semibold mt-1">{completedDays}/30 days</div>
                                            </div>

                                            {/* Gradient definition */}
                                            <defs>
                                                <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#3b82f6" />
                                                    <stop offset="50%" stopColor="#8b5cf6" />
                                                    <stop offset="100%" stopColor="#ec4899" />
                                                </linearGradient>
                                            </defs>
                                        </div>
                                    </div>

                                    {/* Linear Progress Bar */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-sm text-gray-400">
                                            <span>Daily Progress</span>
                                            <span>{completedDays} of 30 days completed</span>
                                        </div>
                                        
                                        <div className="relative h-4 bg-slate-800/60 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out relative"
                                                style={{ width: `${progressPercentage}%` }}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Daily Logs Grid */}
                            <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                                            <Award className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-white">Daily Log</h2>
                                            <p className="text-gray-400">Your 30-day journey tracker</p>
                                        </div>
                                    </div>

                                    {/* Days Grid */}
                                    <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-10 gap-3">
                                        {challenge.logs.map((log, i) => (
                                            <div
                                                key={i}
                                                className={`group relative p-4 rounded-2xl text-center cursor-pointer transition-all duration-300 transform hover:scale-105 border`}
                                                style={{
                                                    background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                                                }}
                                            >
                                                {/* Status-based styling */}
                                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${getStatusGradient(log.status)} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                                                <div className={`absolute inset-0 rounded-2xl border ${
                                                    log.status === "completed" ? "border-emerald-500/30" :
                                                    log.status === "pending" ? "border-amber-500/30" :
                                                    "border-red-500/30"
                                                }`}></div>

                                                <div className="relative z-10 space-y-2">
                                                    <div className={`flex items-center justify-center w-8 h-8 rounded-xl mx-auto ${
                                                        log.status === "completed" ? "bg-emerald-500/20 text-emerald-400" :
                                                        log.status === "pending" ? "bg-amber-500/20 text-amber-400" :
                                                        "bg-red-500/20 text-red-400"
                                                    }`}>
                                                        {getStatusIcon(log.status)}
                                                    </div>
                                                    
                                                    <div className="text-white font-bold text-sm">
                                                        Day {log.day}
                                                    </div>
                                                    
                                                    <div className={`text-xs capitalize ${
                                                        log.status === "completed" ? "text-emerald-300" :
                                                        log.status === "pending" ? "text-amber-300" :
                                                        "text-red-300"
                                                    }`}>
                                                        {log.status === "completed" ? "✓ Completed" :
                                                        log.status === "pending" ? "○ Pending" :
                                                        "✗ Missed"}
                                                    </div>
                                                </div>

                                                {/* Hover tooltip */}
                                                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 whitespace-nowrap">
                                                    Day {log.day} - {log.status}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Legend */}
                                    <div className="flex items-center justify-center gap-6 pt-6 border-t border-white/10">
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg"></div>
                                            <span className="text-gray-400 text-sm">Completed</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg"></div>
                                            <span className="text-gray-400 text-sm">Pending</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg"></div>
                                            <span className="text-gray-400 text-sm">Missed</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </AnimatedGradientBg>
        </ProtectedRoute>
    );
}
'use client';

import { MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ChallengeCard({ data, onDeleted }) {
    const { customId, title, description, progress, completedDays, startDate } = data;
    const [menuOpen, setMenuOpen] = useState(false);
    
    const getProgressGradient = (progress) => {
        if (progress >= 80) return 'from-emerald-400 via-green-500 to-teal-600';
        if (progress >= 60) return 'from-blue-400 via-indigo-500 to-purple-600';
        if (progress >= 40) return 'from-orange-400 via-amber-500 to-yellow-600';
        return 'from-pink-400 via-red-500 to-rose-600';
    };

    const getCardGlow = (progress) => {
        if (progress >= 80) return 'hover:shadow-emerald-500/30';
        if (progress >= 60) return 'hover:shadow-indigo-500/30';
        if (progress >= 40) return 'hover:shadow-orange-500/30';
        return 'hover:shadow-pink-500/30';
    };

    const getStatusIcon = (progress) => {
        if (progress >= 80) return '🔥';
        if (progress >= 60) return '⚡';
        if (progress >= 40) return '💪';
        return '🌱';
    };

    const getDayStarted = Math.ceil((new Date() - new Date(startDate)) / (1000 * 60 * 60 * 24));

    const handleDelete = async (customId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`/api/challenge/${customId}/delete`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Delete failed:", errorText);
                return;
            }

            const data = await response.json();
            console.log("Challenge deleted:", data.message);
            
            if (response.ok) {
                if (onDeleted) onDeleted(); // reload data di parent
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div className={`group relative overflow-hidden bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-0 shadow-2xl ${getCardGlow(progress)} transition-all duration-700 transform hover:-translate-y-3 hover:scale-[1.03] cursor-pointer w-full`}>
            
            {/* Dynamic background pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
            </div>

            <div className="p-6 relative z-10">
                {/* Header with floating elements */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex-1 space-y-3">
                        {/* Status badge */}
                        <div className="flex items-center gap-2">
                            <div className={`px-3 py-1 bg-gradient-to-r ${getProgressGradient(progress)} rounded-full flex items-center gap-2`}>
                                <span className="text-white text-xs font-bold">{getStatusIcon(progress)}</span>
                                <span className="text-white text-xs font-bold">{progress.toFixed(0)}%</span>
                            </div>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight group-hover:from-indigo-300 group-hover:to-blue-400 transition-all duration-500 capitalize">
                            {title}
                        </h3>
                    </div>

                    <div className="flex items-center gap-2">
                    {/* Titik tiga (More menu) */}
                    <div className="relative">
                        <button
                            type="button"
                            className="w-12 h-12 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10 transition-all duration-500"
                            onClick={() => setMenuOpen((open) => !open)}
                        >
                            <MoreVertical className="w-6 h-6 text-indigo-400 group-hover:text-white transition-colors rotate-90" />
                        </button>
                        {/* Dropdown menu */}
                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-slate-900 border border-white/10 rounded-xl shadow-lg z-20">
                                <Link
                                    href={`/pages/Challenges/${customId}`}
                                    className="block px-4 py-2 text-sm text-indigo-300 hover:bg-indigo-600/20 hover:text-white rounded-t-xl transition"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    More Detail
                                </Link>
                                <button
                                    className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-600/20 hover:text-white rounded-b-xl transition"
                                    onClick={() => {
                                        setMenuOpen(false);
                                        handleDelete(customId);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
            </div>
                </div>

                {/* Description with glass effect */}
                <div className="mb-6 p-4 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/5">
                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                        {description}
                    </p>
                </div>

                {/* Circular Progress Visualization */}
                <div className="flex items-center gap-6 mb-6">
                    <div className="relative w-20 h-20">
                        {/* Background circle */}
                        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                stroke="currentColor"
                                strokeWidth="6"
                                fill="transparent"
                                className="text-slate-700"
                            />
                            {/* Progress circle */}
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                stroke="url(#progress-gradient)"
                                strokeWidth="6"
                                fill="transparent"
                                strokeDasharray={`${2 * Math.PI * 45}`}
                                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                                className="transition-all duration-1000 ease-out"
                                strokeLinecap="round"
                            />
                        </svg>
                        
                        {/* Center text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-white font-bold text-sm">{completedDays}</span>
                            <span className="text-gray-400 text-xs">days</span>
                        </div>

                        {/* Gradient definition */}
                        <defs>
                            <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#60a5fa" />
                                <stop offset="50%" stopColor="#a855f7" />
                                <stop offset="100%" stopColor="#ec4899" />
                            </linearGradient>
                        </defs>
                    </div>

                    {/* Stats */}
                    <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">Progress</span>
                            <span className="text-white font-semibold">{progress.toFixed(1)}%</span>
                        </div>
                        
                        <div className="relative h-2 bg-slate-800/60 rounded-full overflow-hidden">
                            <div 
                                className={`h-full bg-gradient-to-r ${getProgressGradient(progress)} rounded-full transition-all duration-1000 ease-out relative`}
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline footer */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl backdrop-blur-sm border border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-xl flex items-center justify-center">
                            <span className="text-lg">🎯</span>
                        </div>
                        <div>
                            <div className="text-white font-semibold text-sm">Day {completedDays}</div>
                            <div className="text-gray-400 text-xs">of 30 days</div>
                        </div>
                    </div>
                    
                    <div className="text-right">
                        <div className="text-white font-semibold text-sm">
                            Started {new Date(startDate).toLocaleDateString("id-ID", { 
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            })}
                        </div>
                        <div className="text-gray-400 text-xs">
                            {getDayStarted} days {getDayStarted > 0 ? 'ago' : 'later'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Hover overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
        </div>
    );
}
import Link from "next/link";
import { Award, Clock, CheckCircle, XCircle, ArrowRightToLine } from "lucide-react";

export default function DailyLogsPublic({ challenge }) {

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
        <>
            {/* Daily Logs Grid */}
            <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="space-y-6">
                    {/* /* Header */}
                    <div className="flex md:justify-between flex-col md:flex-row gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                                <Award className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Daily Log</h2>
                                <p className="text-gray-400">Your 30-day journey tracker</p>
                            </div>
                        </div>
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3">
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

                                <div className="relative space-y-2">
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
                                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-1 rounded-lg opacity-0 z-50 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
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
        </>
    );
}
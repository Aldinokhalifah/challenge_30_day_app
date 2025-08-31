import { Calendar, Target, Flame, CheckCircle, Clock } from "lucide-react";

export default function HeroChallengeDetail({ challenge }) {
    const completedDays = challenge.logs.filter(l => l.status === "completed").length;
    const pendingDays = challenge.logs.filter(l => l.status === "pending").length;

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

    return(
        <>
            {/* Hero Card - Challenge Info */}
            <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
                {/* Background decorations */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl"></div>

                <div className="relative z-10 space-y-6">
                    {/* Status Badge */}
                    <div className="flex items-center flex-col md:flex-row gap-4">
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
                        {/* Completed */}
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
                        {/* Pending */}
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
                        {/* Streak */}
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
                        {/* Remaining */}
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
        </>
    );
}
import { Calendar, Target, Flame, CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion"; 

export default function HeroChallengeDetailPublic({ challenge, statistic }) {
    const stats = statistic || {
        completedDays: challenge.logs.filter(l => l.status === "completed").length,
        pendingDays: challenge.logs.filter(l => l.status === "pending").length,
        longestStreak: getStreakCount() 
    };

    return (
        <>
            {/* Hero Card - Challenge Info */}
            <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden parallax-bg">
                {/* Background decorations - Enhanced with more radial gradients and parallax */}
                <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-gradient-radial from-indigo-500/30 to-purple-500/10 rounded-full blur-3xl opacity-70 animate-pulse slow"></div>
                <div className="absolute bottom-[-15%] left-[-5%] w-80 h-80 bg-gradient-radial from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl opacity-60"></div>
                {/* Tambah SVG untuk orbit unik - Futuristic lines */}
                <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="5,5" />
                    <circle cx="60" cy="40" r="30" stroke="indigo" strokeWidth="0.3" fill="none" strokeDasharray="3,3" />
                </svg>
                {/* Placeholder for particles - Integrate tsParticles here */}
                {/* <div id="particles-js" className="absolute inset-0"></div> */}

                <div className="relative z-10 space-y-6 md:ml-12"> {/* Asymmetrical shift untuk unik */}

                    {/* Status Badge - Tambah hover interaksi */}
                    <div className="flex md:justify-between flex-col md:flex-row gap-4 animate-fade-in">
                        <div className="flex items-center flex-col md:flex-row gap-4">
                            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-600/20 to-green-600/20 backdrop-blur-sm rounded-2xl border border-emerald-500/30 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/30 hover:shadow-lg">
                                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                                <span className="text-emerald-300 font-semibold">Public Challenge</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-white/10 transition-all duration-300 hover:bg-slate-700/60 hover:border-white/20">
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
                    </div>

                    {/* Title and Description - Tambah gradient animasi */}
                    <div className="space-y-4 animate-fade-in-up">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-white via-indigo-200 to-blue-400 bg-clip-text text-transparent leading-tight transition-all duration-500 hover:from-indigo-200 hover:via-blue-400 hover:to-purple-400">
                            {challenge.title}
                        </h1>
                        <p className="text-gray-300 text-lg leading-relaxed max-w-3xl transition-all duration-300 hover:text-gray-100 cursor-pointer"> {/* Click to expand if needed */}
                            {challenge.description}
                        </p>
                    </div>

                    {/* Quick Stats - Grid asymmetrical, hover interaktif */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 animate-fade-in-up delay-200">
                        {/* Completed */}
                        <motion.div 
                            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/40 hover:border-emerald-500/50 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">{stats.completedDays}</div>
                                    <div className="text-xs text-gray-400">Completed</div>
                                </div>
                            </div>
                        </motion.div>
                        {/* Pending */}
                        <motion.div 
                            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/40 hover:border-amber-500/50 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">{stats.pendingDays}</div>
                                    <div className="text-xs text-gray-400">Pending</div>
                                </div>
                            </div>
                        </motion.div>
                        {/* Streak */}
                        <motion.div 
                            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/40 hover:border-orange-500/50 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                                    <Flame className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">{stats.longestStreak}</div>
                                    <div className="text-xs text-gray-400">Streak</div>
                                </div>
                            </div>
                        </motion.div>
                        {/* Remaining */}
                        <motion.div 
                            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 hover:border-purple-500/50 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                                    <Target className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">{stats.pendingDays}</div>
                                    <div className="text-xs text-gray-400">Remaining</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}
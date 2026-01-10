import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Typed from "typed.js";
import { 
    Sparkles, 
    Trophy, 
    Flame, 
    Target, 
    Zap, 
    Plus,
    ArrowRight,
    Crown,
    Star
} from "lucide-react";
import ChallengeForm from "../Challenges/Create/page";

export default function Hero({ name, reloadChallenge, stats }) {
    const [isCreateChallengeOpen, setIsCreateChallengeOpen] = useState(false);

    // Default stats if not provided
    const userStats = stats || {
        // totalChallenges: stats.totalChallenges,
        // activeChallenges: stats.activeChallenges,
        // overallProgress: stats.activeChallenges,
        // completedDays: stats.completedDays
    };

    const motivationalQuotes = [
        "Small progress is still progress.",
        "Today + you = new achievements",
        "Consistency beats perfection every time.",
        "Your only limit is you.",
        "Make today count!"
    ];

    useEffect(() => {
        let typed = null;

        const runTyped = () => {
            if (typed) typed.destroy();

            const options = {
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 3000,
                startDelay: 800,
                loop: true,
                loopCount: Infinity,
                showCursor: true,
                cursorChar: "▎",
                smartBackspace: false,
            };

            typed = new Typed(".auto-typed", {
                ...options,
                strings: motivationalQuotes,
            });
        };

        const timer = setTimeout(() => runTyped(), 100);

        return () => {
            clearTimeout(timer);
            if (typed) typed.destroy();
        };
    }, []);

    return (
        <>
            <div className="relative rounded-[2.5rem] overflow-hidden min-h-[85vh]">
                {/* Dynamic Background - Matching Public Challenge Style */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/15 via-purple-600/15 via-40% to-orange-500/15 backdrop-blur-3xl"></div>
                
                {/* Animated Orbs - More Vibrant */}
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-radial from-pink-500/40 via-purple-500/20 to-transparent rounded-full blur-3xl animate-float"></div>
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-radial from-orange-500/40 via-amber-500/20 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-radial from-purple-500/30 to-transparent rounded-full blur-2xl animate-pulse-slow"></div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(45deg, white 1px, transparent 1px),
                                         linear-gradient(-45deg, white 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>

                {/* Content Container */}
                <div className="relative z-10 border border-pink-500/20 rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl px-6 py-12 md:px-12 lg:px-20 min-h-[85vh] flex items-center">
                    
                    <div className="w-full max-w-6xl mx-auto">
                        
                        {/* Welcome Badge - Glowing */}
                        <motion.div 
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-md border border-pink-500/30 rounded-full mb-8"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="relative">
                                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full"></div>
                                <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping"></div>
                            </div>
                            <span className="text-white font-semibold text-sm">Welcome back, Champion!</span>
                            <Sparkles className="w-4 h-4 text-pink-400" />
                        </motion.div>

                        {/* Main Grid Layout */}
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            
                            {/* Left Side - Text & Actions */}
                            <div className="space-y-8">
                                
                                {/* Hero Title - Massive */}
                                <motion.div 
                                    className="space-y-4"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                >
                                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight">
                                        <span className="block text-white/40 text-3xl md:text-4xl mb-2">Hello,</span>
                                        <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-orange-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] break-words">
                                            {name || "Warrior"}
                                        </span>
                                    </h1>
                                    <p className="text-xl md:text-2xl text-gray-300 font-light">
                                        Ready to conquer your goals?
                                    </p>
                                </motion.div>

                                {/* Terminal/Quote Box - Redesigned */}
                                <motion.div 
                                    className="relative"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.6 }}
                                >
                                    <div className="p-6 bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-white/10 relative overflow-hidden">
                                        {/* Shimmer Effect */}
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 opacity-50"></div>
                                        
                                        {/* Terminal Dots */}
                                        <div className="flex gap-2 mb-4">
                                            <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                        </div>
                                        
                                        {/* Typed Text */}
                                        <div className="flex items-center h-[60px] font-mono">
                                            <Zap className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                                            <h2 className="auto-typed text-white text-lg md:text-xl"></h2>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Action Buttons - Bold CTAs */}
                                <motion.div 
                                    className="flex flex-col sm:flex-row gap-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.6 }}
                                >
                                    <motion.button
                                        onClick={() => setIsCreateChallengeOpen(true)}
                                        className="group relative px-8 py-5 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl font-bold text-white shadow-xl shadow-pink-500/50 hover:shadow-pink-500/70 transition-all overflow-hidden"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {/* Shimmer on hover */}
                                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                        
                                        <span className="relative flex items-center justify-center gap-3">
                                            <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                                            Start New Challenge
                                            <Sparkles className="w-5 h-5" />
                                        </span>
                                    </motion.button>

                                    <motion.a
                                        href="/Challenges"
                                        className="group px-8 py-5 border-2 border-purple-500/50 backdrop-blur-xl rounded-2xl font-semibold text-white hover:bg-purple-500/10 hover:border-purple-500 transition-all"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <span className="flex items-center justify-center gap-3">
                                            Browse All
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </motion.a>
                                </motion.div>
                            </div>

                            {/* Right Side - Stats Circle & Mini Cards */}
                            <motion.div 
                                className="flex flex-col items-center gap-8"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                            >
                                {/* Large Circular Achievement Display */}
                                <div className="relative">
                                    <svg className="w-72 h-72 md:w-80 md:h-80 transform -rotate-90">
                                        {/* Background Circle */}
                                        <circle
                                            cx="50%"
                                            cy="50%"
                                            r="45%"
                                            stroke="currentColor"
                                            strokeWidth="16"
                                            fill="none"
                                            className="text-slate-800/40"
                                        />
                                        {/* Progress Circle */}
                                        <motion.circle
                                            cx="50%"
                                            cy="50%"
                                            r="45%"
                                            stroke="url(#heroGradient)"
                                            strokeWidth="16"
                                            fill="none"
                                            strokeDasharray={`${2 * Math.PI * 144}`}
                                            initial={{ strokeDashoffset: 2 * Math.PI * 144 }}
                                            animate={{ 
                                                strokeDashoffset: 2 * Math.PI * 144 * (1 - userStats.overallProgress / 100)
                                            }}
                                            transition={{ duration: 2, ease: "easeOut", delay: 1 }}
                                            strokeLinecap="round"
                                            className="drop-shadow-glow-pink"
                                        />
                                        <defs>
                                            <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#ec4899" />
                                                <stop offset="50%" stopColor="#a855f7" />
                                                <stop offset="100%" stopColor="#f97316" />
                                            </linearGradient>
                                        </defs>
                                    </svg>

                                    {/* Center Content */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <motion.div 
                                            className="text-7xl md:text-8xl font-black bg-gradient-to-br from-pink-400 via-purple-400 to-orange-400 bg-clip-text text-transparent"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 1.2, type: "spring" }}
                                        >
                                            {userStats.overallProgress}%
                                        </motion.div>
                                        <div className="text-gray-400 text-sm font-semibold mt-2">Success Rate</div>
                                        <div className="flex items-center gap-2 mt-3 px-4 py-2 bg-slate-800/80 backdrop-blur-sm rounded-full border border-pink-500/30">
                                            <Trophy className="w-4 h-4 text-pink-400" />
                                            <span className="text-white font-bold text-sm">{userStats.totalChallenges} Challenges</span>
                                        </div>
                                    </div>

                                    {/* Orbiting Icons */}
                                    <motion.div
                                        className="absolute top-0 right-8 w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl shadow-pink-500/50"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Crown className="w-7 h-7 text-white" />
                                    </motion.div>
                                    <motion.div
                                        className="absolute bottom-0 left-8 w-14 h-14 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl shadow-orange-500/50"
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Flame className="w-7 h-7 text-white" />
                                    </motion.div>
                                </div>

                                {/* Mini Stats Grid */}
                                <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                                    <MiniStatCard
                                        icon={<Zap className="w-5 h-5" />}
                                        value={userStats.activeChallenges}
                                        label="Active"
                                        gradient="from-orange-500 to-red-500"
                                        delay={1.4}
                                    />
                                    <MiniStatCard
                                        icon={<Target className="w-5 h-5" />}
                                        value={userStats.completedDays}
                                        label="Days"
                                        gradient="from-cyan-500 to-blue-500"
                                        delay={1.5}
                                    />
                                    <MiniStatCard
                                        icon={<Star className="w-5 h-5" />}
                                        value={userStats.totalChallenges}
                                        label="Total"
                                        gradient="from-purple-500 to-pink-500"
                                        delay={1.6}
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
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
                    @keyframes pulse-slow {
                        0%, 100% { opacity: 0.3; transform: scale(1); }
                        50% { opacity: 0.5; transform: scale(1.05); }
                    }
                    @keyframes gradient {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    .animate-float { animation: float 8s ease-in-out infinite; }
                    .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite; }
                    .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
                    .animate-gradient { animation: gradient 3s ease infinite; }
                    .drop-shadow-glow-pink { filter: drop-shadow(0 0 20px rgba(236, 72, 153, 0.6)); }
                `}</style>
            </div>

            {/* Modal */}
            {isCreateChallengeOpen && (
                <ChallengeForm
                    onClose={() => setIsCreateChallengeOpen(false)}
                    onChallengeCreated={reloadChallenge}
                />
            )}
        </>
    );
}

// Mini Stat Card Component
function MiniStatCard({ icon, value, label, gradient, delay }) {
    return (
        <motion.div
            className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:border-white/30 transition-all cursor-pointer group relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            whileHover={{ scale: 1.05, y: -4 }}
        >
            {/* Hover Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
            
            <div className="relative z-10 text-center space-y-2">
                <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform`}>
                    <div className="text-white">
                        {icon}
                    </div>
                </div>
                <div className="text-2xl font-black text-white">{value}</div>
                <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">{label}</div>
            </div>
        </motion.div>
    );
}
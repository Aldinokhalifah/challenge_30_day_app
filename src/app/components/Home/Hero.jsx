import { useState } from "react";
import { motion } from "framer-motion";
import { Target, Zap, Star} from "lucide-react";
import ChallengeForm from "../Challenges/Create/page";
import WelcomeBadge from "../ui/home/hero/WelcomeBadge";
import HeroTitle from "../ui/home/hero/HeroTitle";
import QuoteBox from "../ui/home/hero/QuoteBox";
import CircularAchievement from "../ui/home/hero/CircularAchievement";
import MiniStatCard from "../ui/challenge_public/progressOverview/miniStatCard";
import ActionButtons from "../ui/home/hero/ActionButtons";
import BackgroundDecorations from "../ui/home/hero/BackgroundDecorations";

export default function Hero({ name, reloadChallenge, stats }) {
    const [isCreateChallengeOpen, setIsCreateChallengeOpen] = useState(false);

    // Default stats if not provided
    const userStats = stats || {};

    return (
        <>
            <div className="relative rounded-[2.5rem] overflow-hidden min-h-[85vh]">
                {/* Background Decorations */}
                <BackgroundDecorations />

                {/* Content Container */}
                <div className="relative z-10 border border-pink-500/20 rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl px-6 py-12 md:px-12 lg:px-20 min-h-[85vh] flex items-center">
                    
                    <div className="w-full max-w-6xl mx-auto">
                        
                        {/* Welcome Badge - Glowing */}
                        <WelcomeBadge name={name}/>

                        {/* Main Grid Layout */}
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            
                            {/* Left Side - Text & Actions */}
                            <div className="space-y-8">
                                
                                {/* Hero Title - Massive */}
                                <HeroTitle name={name}/>

                                {/* Terminal/Quote Box - Redesigned */}
                                <QuoteBox />

                                {/* Action Buttons - Bold CTAs */}
                                <ActionButtons 
                                    onOpenCreateChallenge={() => setIsCreateChallengeOpen(true)}
                                />
                            </div>

                            {/* Right Side - Stats Circle & Mini Cards */}
                            <motion.div 
                                className="flex flex-col items-center gap-8"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                            >
                                {/* Large Circular Achievement Display */}
                                <CircularAchievement overallProgress={userStats.overallProgress} totalChallenges={userStats.totalChallenges}/>

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
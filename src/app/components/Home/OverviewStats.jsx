"use client";

import Card from "../ui/home/overview/Card";
import Header from "../ui/home/overview/Header";
import VisualizationBar from "../ui/home/overview/VisualizationBar";
import LoadingSkeleton from "../ui/home/overview/LoadingSkeleton";
import ErrorComponent from "../ui/home/overview/ErrorComponent";
import BackgroundDecorations from "../ui/home/overview/BackgroundDecorations";
import BottomInfoPills from "../ui/home/overview/BottomInfoPills";
import { useState, useEffect } from "react";

export default function OverviewStats({ overviewStats }) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [animatedValues, setAnimatedValues] = useState({});
    
    useEffect(() => {
        try {
            setIsLoading(true);
            setError('');
            
            if (overviewStats) {
                setTimeout(() => {
                    setAnimatedValues({
                        totalChallenges: overviewStats.totalChallenges,
                        completedChallenges: overviewStats.completedChallenges,
                        activeChallenges: overviewStats.activeChallenges,
                        overallProgress: overviewStats.overallProgress,
                    });
                    setIsLoading(false);
                }, 300);
            }
        } catch (error) {
            console.error(error.message);
            setError(error.message);
            setIsLoading(false);
        }
    }, [overviewStats]);

    // Loading skeleton
    if (isLoading) {
        return <LoadingSkeleton />;
    }

    if(error) {
        return <ErrorComponent error={error} />;
    }

    return (
        <section className="mt-12 space-y-8">
            
            {/* Main Stats Container - Bold Design */}
            <div className="relative rounded-[2.5rem] overflow-hidden">
                
                {/* Decorative Backgrounds */}
                <BackgroundDecorations />

                {/* Content */}
                <div className="relative z-10 border border-indigo-500/20 rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl p-8 md:p-10">
                    
                    {/* Header */}
                    <Header overviewStats={overviewStats}/>

                    {/* Stats Grid - Enhanced Cards */}
                    <Card animatedValues={animatedValues} overviewStats={overviewStats}/>

                    {/* Progress Visualization Bar */}
                    <VisualizationBar completedChallenges={overviewStats.completedChallenges} totalChallenges={overviewStats.totalChallenges}/>

                    {/* Bottom Info Pills */}
                    <BottomInfoPills overallProgress={overviewStats.overallProgress} />
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
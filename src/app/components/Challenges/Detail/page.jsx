import { useState, useEffect } from "react";
import AnimatedGradientBg from "../../ui/animatedBgGradient";
import Sidebar from "../../ui/sidebar";
import { Menu } from "lucide-react";
import HeroChallengeDetail from "./Hero";
import ProgressOverview from "./ProgresOverview";
import DailyLogs from "./DailyLogs";
import Loading from "../../ui/loading";

export default function ChallengeDetail({ challenge, reloadChallenges, statistic, loading }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    // Track user activity untuk inaktivitas check
    useEffect(() => {
        const handleActivity = () => {
            document.cookie = `lastActivity=${Date.now()}; path=/; max-age=86400; SameSite=Lax`;
        };

        handleActivity();
        window.addEventListener("mousemove", handleActivity);
        window.addEventListener("keydown", handleActivity);
        window.addEventListener("click", handleActivity);

        return () => {
            window.removeEventListener("mousemove", handleActivity);
            window.removeEventListener("keydown", handleActivity);
            window.removeEventListener("click", handleActivity);
        };
    }, []);


    return (
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
                        <main>
                            {loading ? (
                                <Loading />
                            ) : (
                                <div className="flex-1 p-4 lg:p-8 space-y-8">
                                    {/* Hero Card - Challenge Info */}
                                    <HeroChallengeDetail challenge={challenge} reloadChallenges={reloadChallenges} statistic={statistic}/>

                                    {/* Progress Section */}
                                    <ProgressOverview challenge={challenge} statistic={statistic}/>

                                    {/* Daily Logs Grid */}
                                    <DailyLogs challenge={challenge}/>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </AnimatedGradientBg>
    );
}
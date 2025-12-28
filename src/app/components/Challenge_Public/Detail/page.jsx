import React from "react";
import { useState } from "react";
import AnimatedGradientBg from "../../ui/animatedBgGradient";
import { Menu } from "lucide-react";
import HeroChallengeDetailPublic from "./Hero";
import ProgressOverviewPublic from "./ProgresOverview";
import DailyLogsPublic from "./DailyLogs";
import Sidebar from "../../ui/sidebar";

function ChallengeDetailPublic({ challenge, reloadChallenges, statistic }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
                            <h1 className="ml-3 text-lg font-semibold text-white">Challenge Detail Public</h1>
                        </header>
                        
                        {/* Content */}
                        <main className="flex-1 p-4 lg:p-8 space-y-8">

                            {/* Hero Card - Challenge Info */}
                            <HeroChallengeDetailPublic challenge={challenge} reloadChallenges={reloadChallenges} statistic={statistic}/>

                            {/* Progress Section */}
                            <ProgressOverviewPublic challenge={challenge} statistic={statistic}/>

                            {/* Daily Logs Grid */}
                            <DailyLogsPublic challenge={challenge} statistic={statistic}/>
                        </main>
                    </div>
                </div>
            </AnimatedGradientBg>
    );
}

export default React.memo(ChallengeDetailPublic);
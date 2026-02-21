'use client';

import React from "react";
import Sidebar from "@/app/components/ui/sidebar";
import { Menu } from 'lucide-react';
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchChallenges, fetchOverviewStats } from "@/app/lib/api";
import AnimatedGradientBg from "@/app/components/ui/animatedBgGradient";
import Hero from "@/app/components/Home/Hero";
import OverviewStats from "@/app/components/Home/OverviewStats";
import Loading from "@/app/components/ui/loading";

function HomePage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const qc = useQueryClient();

    // Track user activity untuk inaktivitas check
    useEffect(() => {
        const handleActivity = () => {
            document.cookie = `lastActivity=${Date.now()}; path=/; max-age=86400; SameSite=Lax`;
        };

        handleActivity(); // Set initial activity
        window.addEventListener("mousemove", handleActivity);
        window.addEventListener("keydown", handleActivity);
        window.addEventListener("click", handleActivity);

        return () => {
            window.removeEventListener("mousemove", handleActivity);
            window.removeEventListener("keydown", handleActivity);
            window.removeEventListener("click", handleActivity);
        };
    }, []);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            try {
                setUserData(JSON.parse(storedUserData));
            } catch (error) {
                console.error('Error parsing userData:', error);
            }
        }
    }, []);

    const {
        data: challenges,
        isLoading: challengesLoading,
        isFetching: challengesFetching,
        error: challengesError
    } = useQuery({
        queryKey: ['challenges'],
        queryFn: fetchChallenges,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 20
    });

    const {
        data: overview,
        isLoading: overviewLoading,
        error: overviewError
    } = useQuery({
        queryKey: ['overviewStats'],
        queryFn: fetchOverviewStats,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 20
    });


    const reloadAll = async () => {
        await Promise.all([
            qc.invalidateQueries({ queryKey: ['challenges'] }),
            qc.invalidateQueries({ queryKey: ['overviewStats'] })
        ]);
    };

    return (
                <AnimatedGradientBg>
                    
                    
                    <div className="min-h-screen text-white">
                        {/* Sidebar */}
                        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                        {/* Main Content */}
                        <div className="lg:ml-52 flex flex-col min-h-screen">
                            {/* Header */}
                            <header className="sticky top-0 z-30 flex items-center bg-slate-900/40 backdrop-blur-md border-b border-white/10 px-4 py-3 lg:hidden">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="p-2 rounded-lg hover:bg-white/10 text-indigo-200"
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                            <h1 className="ml-3 text-lg font-semibold">Challenge 30 Days App</h1>
                            </header>

                            {/* Content */}
                            <main className="flex-1 p-4 ">
                                {overviewLoading ? (
                                    <Loading 
                                        message="Loading your challenges..." 
                                        overlay={true}
                                    />
                                ) : (
                                    <div>
                                        <Hero name={userData?.name} reloadChallenge={reloadAll} stats={overview}/>
                                        <div className="flex flex-col justify-center items-center gap-4 mt-20">
                                            <OverviewStats overviewStats={overview}/>
                                        </div>
                                    </div>
                                )}
                            </main>
                        </div>
                    </div>
                </AnimatedGradientBg>
    );
}

export default React.memo(HomePage);

'use client';

import React from "react";
import Sidebar from "@/app/components/ui/sidebar";
import { Menu } from 'lucide-react';
import { useEffect, useState } from "react";
import AnimatedGradientBg from "@/app/components/ui/animatedBgGradient";
import Hero from "@/app/components/Home/Hero";
import OverviewStats from "@/app/components/Home/OverviewStats";
import Loading from "@/app/components/ui/loading";
import { useRouter } from 'next/navigation';

function HomePage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [ userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const [challenge, setChallengeStats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [overviewStats, setOverviewStats] = useState(null);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const router = useRouter();

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
        const userData = localStorage.getItem('userData');

        if (userData) {
            try {
                setUserData(JSON.parse(userData));
            } catch (error) {
                console.error('Error parsing userData:', error);
                setError(error.message);
            }
        }
    }, []);

    // Fungsi fetch data challenge
    const fetchChallengeStats = async () => {
        const res = await fetch('/api/challenge/read', {
            credentials: 'include'
        });
        const data = await res.json();
        setChallengeStats(data.challenges);
        setLoading(false);
    };

    const fetchOverviewStats = async () => {
        const res = await fetch("/api/challenge/statistic", {
            credentials: 'include'
        });
        const data = await res.json();
        setOverviewStats(data);
    };

    // Initial load
    useEffect(() => {
        const loadInitialData = async () => {
            setLoading(true);
            setIsInitialLoading(true);
            try {
                await Promise.all([
                    fetchChallengeStats(),
                    fetchOverviewStats()
                ]);
            } finally {
                setIsInitialLoading(false);
            }
        };
        loadInitialData();
    }, [router]);

     // Callback untuk reload setelah create/delete
    const reloadAll = async () => {
        setIsRefreshing(true);
        try {
            await Promise.all([
                fetchChallengeStats(),
                fetchOverviewStats()
            ]);
        } finally {
            setIsRefreshing(false);
        }
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
                                {isRefreshing || loading ? (
                                    <Loading 
                                        message="Updating your progress..." 
                                        overlay={true}
                                    />
                                ) : (
                                    <div>
                                        <Hero name={userData?.name} reloadChallenge={reloadAll} stats={overviewStats}/>
                                        <div className="flex flex-col justify-center items-center gap-4 mt-20">
                                            <OverviewStats overviewStats={overviewStats}/>
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

'use client';

import React from "react";
import AnimatedGradientBg from "@/app/components/ui/animatedBgGradient";
import { useEffect, useState } from "react";
import { Menu } from 'lucide-react';
import Sidebar from "@/app/components/ui/sidebar";
import { ActiveChallengesSection } from "@/app/components/Challenges/ActiveChallengeSection";
import Loading from "@/app/components/ui/loading";

function Challenges() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [challengeStats, setChallengeStats] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
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
    
    
    const fetchChallengeStats = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/challenge/read', {
                credentials: 'include'
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            setChallengeStats(data.challenges);
        } catch (error) {
            console.error('Error fetching challenge stats:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Fungsi untuk fetch ulang data
    const reloadChallenges = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/challenge/read', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await response.json();
        setChallengeStats(data.challenges);
    };

    useEffect(() => {
        fetchChallengeStats();
    }, []);
    return(
            <AnimatedGradientBg>

                {loading && (
                    <Loading />
                )}
                
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
                            <h1 className="ml-3 text-lg font-semibold">Your Challenges</h1>
                            </header>

                            {/* Content */}
                            <main className="flex-1 p-4 ">
                                <ActiveChallengesSection
                                    challengeStats={challengeStats}
                                    reloadChallenges={reloadChallenges} // kirim callback ke child
                                />
                            </main>
                        </div>
                </div>
            </AnimatedGradientBg>
    );
}

export default React.memo(Challenges);
'use client';

import ProtectedRoute from "../../components/protectedRoute";
import Sidebar from "@/app/components/sidebar";
import { Menu } from 'lucide-react';
import { useEffect, useState } from "react";
import AnimatedGradientBg from "@/app/components/animatedBgGradient";
import Hero from "@/app/components/Home/Hero";
import OverviewStats from "@/app/components/Home/OverviewStats";
import Loading from "@/app/components/loading";

export default function HomePage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [ userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const [challenge, setChallengeStats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [overviewStats, setOverviewStats] = useState(null);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        const userData = localStorage.getItem('userData');

        if (userData) {
            try {
                setUserData(JSON.parse(userData));
            } catch (error) {
                console.error('Error parsing userData:', error);
            }
        }
    }, []);

    // Fungsi fetch data challenge
    const fetchChallengeStats = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            setLoading(true);
            const response = await fetch('/api/challenge/read', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch challenges');
            const data = await response.json();
            setChallengeStats(data.challenges);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchOverviewStats = async () => {
        const token = localStorage.getItem('token');
        const res = await fetch("/api/challenge/statistic", {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setOverviewStats(data);
    };

    // Initial load
    useEffect(() => {
        const loadInitialData = async () => {
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
    }, []);

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
        <ProtectedRoute>
                <AnimatedGradientBg>
                    {loading && (
                        <Loading />
                    )}

                    {isRefreshing && (
                        <Loading 
                            message="Updating your progress..." 
                            overlay={true}
                        />
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
                            <h1 className="ml-3 text-lg font-semibold">Challenge 30 Days App</h1>
                            </header>

                            {/* Content */}
                            <main className="flex-1 p-4 ">
                            <Hero name={userData?.name} reloadChallenge={reloadAll}/>

                            <div className="flex flex-col justify-center items-center gap-4 mt-20">
                                <OverviewStats overviewStats={overviewStats}/>
                            </div>
                            </main>
                        </div>
                    </div>
                </AnimatedGradientBg>
        </ProtectedRoute>
    );
}
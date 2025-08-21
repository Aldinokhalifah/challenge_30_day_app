'use client';
import AnimatedGradientBg from "@/app/components/animatedBgGradient";
import ProtectedRoute from "@/app/components/protectedRoute";
import { useEffect, useState } from "react";
import { Menu } from 'lucide-react';
import Sidebar from "@/app/components/sidebar";
import { ActiveChallengesSection } from "@/app/components/Home/ActiveChallengeSection";

export default function Challenges() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [ userData, setUserData] = useState(null);
    const [challengeStats, setChallengeStats] = useState([]);
    const [error, setError] = useState('');
    
    useEffect(() => {
            const userData = localStorage.getItem('userData');
            const token = localStorage.getItem('token');
    
            if (userData) {
                try {
                    setUserData(JSON.parse(userData));
                } catch (error) {
                    console.error('Error parsing userData:', error);
                }
            }
    
            const fetchChallengeStats = async () => {
                if (!token) {
                    console.error('Token not found');
                    return;
                }
    
                try {
                    const response = await fetch('/api/challenge/read', {
                        headers: { 
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
    
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
    
                    const data = await response.json();
                    setChallengeStats(data.challenges);
                } catch (error) {
                    console.error('Error fetching challenge stats:', error);
                    setError(error.message);
                }
            };
    
            fetchChallengeStats();
    }, []);
    return(
        <ProtectedRoute>
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
                                <ActiveChallengesSection challengeStats={challengeStats}/>
                            </main>
                        </div>
                </div>
            </AnimatedGradientBg>
        </ProtectedRoute>
    );
}
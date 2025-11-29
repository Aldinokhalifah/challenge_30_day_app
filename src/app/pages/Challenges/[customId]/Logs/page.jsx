'use client'

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Loading from "@/app/components/ui/loading";
import ProtectedRoute from "@/app/components/protectedRoute";
import AnimatedGradientBg from "@/app/components/ui/animatedBgGradient";
import Sidebar from "@/app/components/ui/sidebar";
import { ArrowRightToLine, Menu } from "lucide-react";
import LogCard from "@/app/components/ui/Log";
import Link from "next/link";


export default function Logs() {
    const { customId } = useParams();
    const [loading, setLoading] = useState(true);
    const [logs, setLogs] = useState(null);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const fetchLogs = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Token not found');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`/api/challenge/${customId}/logs`, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }); 

            if (!res.ok) throw new Error('Failed to fetch challenge');
                const data = await res.json();
                setLogs(data.logs);
        } catch (err) {
            console.error("Error fetching challenge:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (customId) fetchLogs();
    }, [customId]);

    if (loading) return <Loading />
    if (error) return <div className="flex items-center justify-center min-h-screen text-red-400">Error: {error}</div>;

    return (
        <ProtectedRoute>
            <AnimatedGradientBg>
                <div className="min-h-screen">
                    {/* Sidebar */}
                    <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                    
                    {/* Main Content */}
                    <div className="lg:ml-52 flex flex-col min-h-screen">

                        {/* Header */}
                        <header className="sticky top-0 z-30 flex items-center justify-between bg-slate-900/40 backdrop-blur-md border-b border-white/10 px-4 py-3 lg:hidden">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="p-2 rounded-lg hover:bg-white/10 text-indigo-200 transition-colors"
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                            <h1 className="ml-3 text-lg font-semibold text-white">Logs Progress</h1>
                            <Link
                                href={`/pages/Challenges/${customId}`}
                                className="md:hidden text-gray-400 text-sm md:text-md flex group gap-1 items-center"
                            >
                                <p className="transition-all">Back</p>
                                <ArrowRightToLine className="transition-all group-hover:translate-x-1 group-hover:text-white" />
                            </Link>
                        </header>
                        
                        {/* Content */}
                        <main className="flex-1 p-4 lg:p-8 space-y-8">
                            {/* Page Title - Desktop */}
                            <div className="hidden lg:flex lg:justify-between">
                                <div className="">
                                    <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text">
                                        Logs Progress
                                    </h1>
                                    <p className="text-gray-400">Track and update your daily challenge status</p>
                                </div>
                                <Link
                                    href={`/pages/Challenges/${customId}`}
                                        className="hidden text-gray-400 text-sm md:text-md md:flex group gap-1 items-center"
                                    >
                                        <p className="transition-all">Back</p>
                                        <ArrowRightToLine className="transition-all group-hover:translate-x-1 group-hover:text-white" />
                                </Link>
                            </div>

                            {/* Days Grid */}
                            <LogCard log={logs}/>

                            {/* Legend */}
                            <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-white/10">
                                <div className="flex items-center gap-2.5 bg-slate-900/50 px-4 py-2.5 rounded-xl border border-white/10">
                                    <div className="w-3 h-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full shadow-lg shadow-emerald-500/50"></div>
                                    <span className="text-gray-300 text-sm font-medium">Completed</span>
                                </div>
                                <div className="flex items-center gap-2.5 bg-slate-900/50 px-4 py-2.5 rounded-xl border border-white/10">
                                    <div className="w-3 h-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full shadow-lg shadow-amber-500/50"></div>
                                    <span className="text-gray-300 text-sm font-medium">Pending</span>
                                </div>
                                <div className="flex items-center gap-2.5 bg-slate-900/50 px-4 py-2.5 rounded-xl border border-white/10">
                                    <div className="w-3 h-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-full shadow-lg shadow-red-500/50"></div>
                                    <span className="text-gray-300 text-sm font-medium">Missed</span>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                
            </AnimatedGradientBg>
        </ProtectedRoute>
    );
}
'use client';

import ProtectedRoute from "../../components/protectedRoute";
import Sidebar from "@/app/components/sidebar";
import { Menu } from 'lucide-react';
import { useEffect, useState } from "react";
import AnimatedGradientBg from "@/app/components/animatedBgGradient";

export default function HomePage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [ userData, setUserData] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('userData');

        if (userData) {
            setUserData(JSON.parse(userData));
        }
    }, [])
    return (
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
                            <main className="flex-1 p-4">
                            <h2 className="text-2xl font-bold">Dashboard</h2>
                            <p className="mt-4 text-slate-300">
                                Selamat datang {userData?.name}  di Habit Tracker!  
                                Ini halaman dashboard utama.
                            </p>
                            </main>
                        </div>
                    </div>
                </AnimatedGradientBg>
        </ProtectedRoute>
    );
}

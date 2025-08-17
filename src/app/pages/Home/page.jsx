'use client';

import ProtectedRoute from "../../components/protectedRoute";
import Sidebar from "@/app/components/sidebar";
import { Menu } from 'lucide-react';
import { useEffect, useState } from "react";
import AnimatedGradientBg from "@/app/components/animatedBgGradient";
import Hero from "@/app/components/Home/Hero";

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
                            <main className="flex-1 p-4 overflow-y-scroll">
                            <Hero name={userData?.name} />
                            </main>
                        </div>
                    </div>
                </AnimatedGradientBg>
        </ProtectedRoute>
    );
}

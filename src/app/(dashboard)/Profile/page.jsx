'use client'

import { useState } from 'react';
import { Menu} from 'lucide-react';
import AnimatedGradientBg from '@/app/components/ui/animatedBgGradient';
import Sidebar from '@/app/components/ui/sidebar';
import ProfilePage from '@/app/components/Profile/page';

export default function Profile() {
    const [sidebarOpen, setSidebarOpen] = useState(false);


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
                            <h1 className="ml-3 text-lg font-semibold">Profile Page</h1>
                        </header>

                        {/* Content */}
                        <main className="flex-1 p-4 ">
                            <ProfilePage />

                        </main>
                    </div>
                </div>
            </AnimatedGradientBg>
    );
}
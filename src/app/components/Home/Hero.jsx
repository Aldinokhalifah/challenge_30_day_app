import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import Typed from 'typed.js';

export default function Hero({name}) {

    const strings = [
        "Small progress is still progress.",
        "Welcome, let's make these 30 days count!",
        "Consistency is key, let's start today!",
        "Today + you = new progress 🎯",
    ];

    useEffect(() => {
        let typed = null;
        
        const runTyped = () => {
            // Cleanup existing instance first
            if (typed) {
                typed.destroy();
            }

            const options = {
                typeSpeed: 60,
                backSpeed: 40,
                backDelay: 2500,
                startDelay: 1000,
                loop: true,
                loopCount: Infinity,
                showCursor: true,
                cursorChar: '▎',
                autoInsertCss: true,
                smartBackspace: false,
                shuffle: false,
                fadeOut: false,
                bindInputFocusEvents: false,
                contentType: 'html'
            };
            
            typed = new Typed('.auto-typed', {
                ...options,
                strings: strings,
            });
        };

        // Add small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            runTyped();
        }, 100);
        
        // Cleanup function
        return () => {
            clearTimeout(timer);
            if (typed) {
                typed.destroy();
                typed = null;
            }
        };
    }, []);

    return(
        <>
            <div className="relative w-full min-h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900">
                {/* Animated background patterns */}
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-500/20 rounded-full animate-pulse"></div>
                    <div className="absolute top-32 right-16 w-24 h-24 bg-blue-400/15 rounded-full animate-bounce delay-1000"></div>
                    <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-500/10 rounded-full animate-pulse delay-500"></div>
                    <div className="absolute bottom-10 right-10 w-28 h-28 bg-cyan-400/20 rounded-full animate-bounce delay-700"></div>
                </div>

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div className="w-full h-full" style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                                        linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}></div>
                </div>

                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between h-full p-8 lg:p-12">
                    {/* Left Content */}
                    <div className="flex-1 max-w-2xl space-y-8">
                        {/* Welcome Badge */}
                        <div className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-indigo-600/30 to-blue-600/30 backdrop-blur-md rounded-full border border-indigo-400/20">
                            <div className="relative">
                                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                            </div>
                            <span className="text-white/90 font-medium">Welcome back!</span>
                        </div>

                        {/* Main Heading */}
                        <div className="space-y-4">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                                <span className="block text-white/80">Hello</span>
                                <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                                    {name}
                                </span>
                            </h1>
                            
                            <div className="flex items-center gap-4 text-xl text-white/70">
                                <div className="w-12 h-px bg-gradient-to-r from-transparent to-indigo-400"></div>
                                <span>Ready for the challenge?</span>
                                <div className="w-12 h-px bg-gradient-to-l from-transparent to-indigo-400"></div>
                            </div>
                        </div>

                        {/* Typed Text Container */}
                        <div className="relative p-6 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10">
                            <div className="absolute top-4 left-4 flex gap-2">
                                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                            </div>
                            <div className="mt-6 min-h-[60px] flex items-center">
                                <span className="text-cyan-400 mr-2">$</span>
                                <h2 className='auto-typed text-white text-lg sm:text-xl font-mono'></h2>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/challenges/create"
                                className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl font-semibold text-white shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative flex items-center justify-center gap-3">
                                    <svg className="w-6 h-6 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span>Start New Challenge</span>
                                </div>
                            </Link>
                            
                            <Link
                                href="/challenges"
                                className="group px-8 py-4 border-2 border-indigo-400/30 rounded-2xl font-semibold text-white/90 hover:border-indigo-400/60 hover:bg-indigo-500/10 transition-all duration-300 backdrop-blur-sm"
                            >
                                <div className="flex items-center justify-center gap-3">
                                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                    <span>Browse Challenges</span>
                                </div>
                            </Link>
                        </div>

                        {/* Stats Row */}
                        <div className="flex gap-8 pt-6 border-t border-white/10">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">30</div>
                                <div className="text-sm text-white/60">Days Challenge</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-cyan-400">∞</div>
                                <div className="text-sm text-white/60">Possibilities</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-indigo-400">100%</div>
                                <div className="text-sm text-white/60">Motivation</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Image with 3D Effect */}
                    <div className="flex-shrink-0 mt-8 lg:mt-0 lg:ml-12">
                        <div className="relative group">
                            {/* 3D Shadow layers */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 to-blue-600/40 rounded-3xl transform rotate-6 scale-105 blur-xl opacity-60 group-hover:rotate-12 transition-transform duration-500"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-cyan-600/30 rounded-3xl transform -rotate-3 scale-110 blur-lg opacity-40 group-hover:-rotate-6 transition-transform duration-500"></div>
                            
                            {/* Main container */}
                            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                                {/* Floating elements around image */}
                                <div className="absolute -top-4 -left-4 w-8 h-8 bg-cyan-400 rounded-lg rotate-45 opacity-80 animate-pulse"></div>
                                <div className="absolute -top-2 -right-6 w-6 h-6 bg-indigo-500 rounded-full opacity-60 animate-bounce delay-300"></div>
                                <div className="absolute -bottom-3 -left-2 w-5 h-5 bg-blue-400 rounded-full opacity-70 animate-ping delay-700"></div>
                                
                                <Image
                                    src="/hero2.png"
                                    alt='Hero Challenge Image'
                                    width={300}
                                    height={300}
                                    className='w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-contain filter drop-shadow-2xl transform group-hover:rotate-3 transition-transform duration-500'
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
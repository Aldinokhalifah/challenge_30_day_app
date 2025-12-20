import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Typed from "typed.js";
import ChallengeForm from "../Challenges/Create/page";

export default function Hero({ name, reloadChallenge }) {
    const [isCreateChallengeOpen, setIsCreateChallengeOpen] = useState(false);

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
            cursorChar: "▎",
            autoInsertCss: true,
            smartBackspace: false,
            shuffle: false,
            fadeOut: false,
            bindInputFocusEvents: false,
            contentType: "html",
        };

        typed = new Typed(".auto-typed", {
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

    return (
        <>
        <div className="relative w-full min-h-screen rounded-3xl overflow-hidden">
            {/* Background gradient + soft glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950/90 to-purple-950/70" />
            <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-16 lg:px-20">
                <div className="w-full max-w-5xl space-y-12 text-center">

                    {/* Welcome Badge */}
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-sm">
                    <div className="relative">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping"></div>
                    </div>
                    <span className="text-white/80 font-medium">Welcome back</span>
                    </div>

                    {/* Hero Text – Super safe untuk nama panjang */}
                    <div className="space-y-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                        <span className="block text-white/60">Hello,</span>
                        <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent break-all hyphens-auto">
                        {name || "Warrior"}
                        </span>
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl text-white/50 font-light mt-6">
                        What will you conquer today?
                    </p>
                    </div>

                    {/* Terminal Panel */}
                    <div className="w-full max-w-3xl mx-auto">
                    <div className="p-6 sm:p-8 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10">
                        <div className="flex gap-2 mb-5">
                            <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                        </div>
                        <div className="flex items-center h-11 font-mono text-left">
                            <span className="text-cyan-400 mr-3 opacity-80 text-sm sm:text-base">$</span>
                            <h2 className="auto-typed text-white text-base sm:text-lg lg:text-xl leading-relaxed"></h2>
                        </div>
                    </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => setIsCreateChallengeOpen(true)}
                        className="group px-8 py-5 bg-gradient-to-r from-cyan-500/90 to-blue-600/90 backdrop-blur-xl rounded-2xl font-bold text-white shadow-xl hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300"
                    >
                        <span className="flex items-center justify-center gap-3">
                        <svg className="w-6 h-6 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                        Start New Challenge
                        </span>
                    </button>

                    <Link
                        href="/Challenges"
                        className="px-8 py-5 border border-white/30 backdrop-blur-xl rounded-2xl font-medium text-white/90 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                    >
                        <span className="flex items-center justify-center gap-3">
                        Browse Challenges
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        </span>
                    </Link>
                    </div>

                    {/* Stats – Responsive Grid (1 kolom di HP, 3 kolom di tablet+) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl mx-auto pt-8">
                    <div className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 text-center">
                        <div className="text-4xl font-black text-cyan-300">30</div>
                        <div className="text-white/50 text-sm mt-1">Day Streak</div>
                    </div>
                    <div className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 text-center">
                        <div className="text-4xl font-black text-purple-300">∞</div>
                        <div className="text-white/50 text-sm mt-1">Possibilities</div>
                    </div>
                    <div className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 text-center">
                        <div className="text-4xl font-black text-emerald-300">100%</div>
                        <div className="text-white/50 text-sm mt-1">Committed</div>
                    </div>
                    </div>

                </div>
            </div>
        </div>

        {/* Modal tetap sama */}
        {isCreateChallengeOpen && (
            <ChallengeForm
            onClose={() => setIsCreateChallengeOpen(false)}
            onChallengeCreated={reloadChallenge}
            />
        )}
        </>
    );
}

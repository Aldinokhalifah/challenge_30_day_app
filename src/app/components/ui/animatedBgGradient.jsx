'use client';

import { useEffect, useState } from 'react';

const AnimatedGradientBg = ({ children, className = "" }) => {
    const [gradientIndex, setGradientIndex] = useState(0);

    // Array of beautiful gradient combinations
    const gradients = [
        'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-950',
        'bg-gradient-to-br from-gray-900 via-blue-950 to-slate-900',
        'bg-gradient-to-br from-slate-950 via-indigo-900 to-purple-950',
        'bg-gradient-to-br from-zinc-900 via-slate-800 to-gray-950',
        'bg-gradient-to-br from-neutral-900 via-stone-800 to-zinc-950',
        'bg-gradient-to-br from-stone-950 via-neutral-900 to-slate-900',
        'bg-gradient-to-br from-purple-950 via-slate-900 to-gray-950',
        'bg-gradient-to-br from-blue-950 via-indigo-900 to-violet-950',
        'bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-950',
        'bg-gradient-to-br from-violet-950 via-indigo-900 to-blue-950'
    ];

    useEffect(() => {   
        const interval = setInterval(() => {
            setGradientIndex(prev => (prev + 1) % gradients.length);
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, [gradients.length]);

    return (
        <div className={`min-h-screen relative overflow-hidden ${className}`}>
            {/* Updated main gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950">
                {/* Updated animated gradient overlays with darker colors */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-950 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                    <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-950 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-950 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
                </div>
            </div>

            {/* Updated grid pattern overlay with lower opacity */}
            <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:50px_50px]" />
            
            {/* Updated radial gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-950/10 to-transparent" />
            
            {/* Updated moving dots pattern with lower opacity */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/10 rounded-full animate-ping" />
                <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400/20 rounded-full animate-pulse" />
                <div className="absolute bottom-1/4 left-2/3 w-1.5 h-1.5 bg-blue-400/20 rounded-full animate-bounce" />
            </div>

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>

            <style jsx>{`
                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                .bg-grid-white {
                    background-image: 
                        linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
                }
            `}</style>
        </div>
    );
};

export default AnimatedGradientBg;
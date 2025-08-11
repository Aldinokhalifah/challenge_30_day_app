'use client';

import { useEffect, useState } from 'react';

const AnimatedGradientBg = ({ children, className = "" }) => {
    const [gradientIndex, setGradientIndex] = useState(0);

    // Array of beautiful gradient combinations
    const gradients = [
        'bg-gradient-to-br from-purple-400 via-pink-500 to-red-500',
        'bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500', 
        'bg-gradient-to-br from-green-400 via-blue-500 to-purple-600',
        'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500',
        'bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500',
        'bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500',
        'bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500',
        'bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-500',
        'bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600',
        'bg-gradient-to-br from-teal-400 via-green-500 to-blue-500'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setGradientIndex(prev => (prev + 1) % gradients.length);
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, [gradients.length]);

    return (
        <div className={`min-h-screen relative overflow-hidden ${className}`}>
            {/* Main gradient background with CSS animations */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                {/* Animated gradient overlays */}
                <div className="absolute inset-0 opacity-50">
                    <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-700 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                    <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-700 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-700 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
                </div>
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
            
            {/* Radial gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
            
            {/* Moving dots pattern */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-ping" />
                <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400/30 rounded-full animate-pulse" />
                <div className="absolute bottom-1/4 left-2/3 w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-bounce" />
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
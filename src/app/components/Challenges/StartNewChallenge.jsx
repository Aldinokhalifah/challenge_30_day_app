import { useState, useCallback } from "react";
import ChallengeForm from "./Create/page";

export default function StartNewChallenge() {
    const [isCreateChallengeOpen, setIsCreateChallengeOpen] = useState(false);

    const handleClose = useCallback(() => {
        setIsCreateChallengeOpen(false);
    }, []);

    const handleChallengeCreated = useCallback(() => {
        setIsCreateChallengeOpen(true);
    }, []);

    return(
        <div className="flex flex-col items-center justify-center py-20 px-4 relative">
            {/* Background decoration */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 bg-gradient-to-br from-indigo-600/5 via-purple-600/10 to-blue-600/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 text-center space-y-8 max-w-2xl">
                {/* 3D Icon */}
                <div className="relative mx-auto w-40 h-40">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl transform rotate-6"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl shadow-xl transform -rotate-3"></div>
                    <div className="relative w-40 h-40 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl flex items-center justify-center shadow-2xl border border-white/10">
                        <div className="text-8xl opacity-60 animate-bounce">🎯</div>
                    </div>

                    {/* Floating elements */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl animate-pulse"></div>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl animate-ping"></div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        Your Journey Awaits
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Every great achievement begins with a single step. Create your first 30-day challenge and start building the habits that will transform your life.
                    </p>
                </div>

                <button
                    onClick={() => setIsCreateChallengeOpen(true)}
                    className="group relative px-10 py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-3xl font-bold text-white text-lg shadow-2xl hover:shadow-indigo-500/30 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-4">
                        <svg className="w-6 h-6 transition-transform group-hover:rotate-180 duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Start Your First Challenge</span>
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                </button>
            </div>

            {/* Create Challenge Modal */}
            {isCreateChallengeOpen && (
                <ChallengeForm 
                    onClose={handleClose}
                    onChallengeCreated={handleChallengeCreated}
                />
            )}
        </div>
    );
}
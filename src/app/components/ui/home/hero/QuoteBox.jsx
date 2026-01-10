import { useEffect } from "react";
import { motion } from "framer-motion";
import Typed from "typed.js";
import { Zap } from "lucide-react";

export default function QuoteBox() {
    const motivationalQuotes = [
        "Small progress is still progress.",
        "Today + you = new achievements",
        "Consistency beats perfection every time.",
        "Your only limit is you.",
        "Make today count!",
    ];

    useEffect(() => {
        let typed = null;

        const runTyped = () => {
        if (typed) typed.destroy();

        const options = {
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 3000,
            startDelay: 800,
            loop: true,
            loopCount: Infinity,
            showCursor: true,
            cursorChar: "▎",
            smartBackspace: false,
        };

        typed = new Typed(".auto-typed", {
            ...options,
            strings: motivationalQuotes,
        });
        };

        const timer = setTimeout(() => runTyped(), 100);

        return () => {
        clearTimeout(timer);
        if (typed) typed.destroy();
        };
    }, []);
    return (
        <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        >
        <div className="p-6 bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-white/10 relative overflow-hidden">
            {/* Shimmer Effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 opacity-50"></div>

            {/* Terminal Dots */}
            <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-pink-500"></div>
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            </div>

            {/* Typed Text */}
            <div className="flex items-center h-[60px] font-mono">
            <Zap className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
            <h2 className="auto-typed text-white text-lg md:text-xl"></h2>
            </div>
        </div>
        </motion.div>
    );
}

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function WelcomeBadge({name}) {
    return (
        <motion.div
        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-md border border-pink-500/30 rounded-full mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        >
            <div className="relative">
                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full"></div>
                <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping"></div>
            </div>
            <span className="text-white font-semibold text-sm">
                Welcome back, {name || 'Champion'}!
            </span>
            <Sparkles className="w-4 h-4 text-pink-400" />
        </motion.div>
    );
}

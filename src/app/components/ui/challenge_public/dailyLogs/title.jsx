import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

export default function Title() {
    return (
        <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        >
        <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/50 group-hover:scale-110 transition-transform">
            <Calendar className="w-7 h-7 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full animate-pulse"></div>
        </div>
        <div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            30-Day Journey
            </h2>
            <p className="text-gray-400">Complete visual timeline</p>
        </div>
        </motion.div>
    );
}

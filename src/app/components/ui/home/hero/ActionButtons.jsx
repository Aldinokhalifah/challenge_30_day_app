import { motion } from "framer-motion";
import { Plus, Sparkles, ArrowRight } from "lucide-react";

export default function ActionButtons({onOpenCreateChallenge}) {
    return (
        <>
        
            <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            >
                <motion.button
                    onClick={() => onOpenCreateChallenge()}
                    className="group relative px-8 py-5 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl font-bold text-white shadow-xl shadow-pink-500/50 hover:shadow-pink-500/70 transition-all overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* Shimmer on hover */}
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

                    <span className="relative flex items-center justify-center gap-3">
                        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                        Start New Challenge
                        <Sparkles className="w-5 h-5" />
                    </span>
                </motion.button>

                <motion.a
                    href="/Challenges"
                    className="group px-8 py-5 border-2 border-purple-500/50 backdrop-blur-xl rounded-2xl font-semibold text-white hover:bg-purple-500/10 hover:border-purple-500 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="flex items-center justify-center gap-3">
                        Browse All
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                </motion.a>
            </motion.div>
        </>
    );
}

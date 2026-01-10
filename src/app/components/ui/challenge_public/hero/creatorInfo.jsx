import { motion } from "framer-motion";
import { Award, Calendar } from "lucide-react";

export default function CreatorInfo({ name }) {
    return (
        <motion.div
        className="flex items-center gap-4 bg-slate-800/60 backdrop-blur-md rounded-2xl p-4 border border-white/10 w-fit hover:border-pink-500/50 transition-all group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        >
        <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-pink-500/50 group-hover:scale-110 transition-transform uppercase">
                {name?.[0] || "A"}
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                <Award className="w-3 h-3 text-white" />
            </div>
        </div>
        <div>
            <div className="text-gray-400 text-xs font-medium">
                Challenge Creator
            </div>
            <div className="text-white font-bold text-lg">
                {name || "Anonymous"}
            </div>
        </div>
        <div className="ml-auto">
            <Calendar className="w-5 h-5 text-gray-400" />
        </div>
        </motion.div>
    );
}

import { motion } from "framer-motion";

export default function LegendItem({ gradient, label, count }) {
    return (
        <motion.div 
            className="flex items-center gap-2.5 bg-slate-800/50 px-5 py-3 rounded-2xl border border-white/10 hover:border-white/30 hover:scale-105 transition-all cursor-pointer"
            whileHover={{ y: -2 }}
        >
            <div className={`w-5 h-5 bg-gradient-to-br ${gradient} rounded-lg shadow-lg`}></div>
            <span className="text-gray-300 font-medium text-sm">{label}</span>
            <span className="text-white font-bold text-sm bg-slate-700/50 px-2 py-0.5 rounded-full">{count}</span>
        </motion.div>
    );
}
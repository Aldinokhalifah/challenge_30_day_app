import { motion } from "framer-motion";

export default function MiniStatCard({ icon, value, label, gradient, delay }) {
    return (
        <motion.div
            className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:border-white/30 transition-all cursor-pointer group relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            whileHover={{ scale: 1.05, y: -4 }}
        >
            {/* Hover Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
            
            <div className="relative z-10 text-center space-y-2">
                <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform`}>
                    <div className="text-white">
                        {icon}
                    </div>
                </div>
                <div className="text-2xl font-black text-white">{value}</div>
                <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">{label}</div>
            </div>
        </motion.div>
    );
}
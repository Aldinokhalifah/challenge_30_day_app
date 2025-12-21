import { motion } from "framer-motion";

export default function StatCard({ icon, value, label, gradient, glowColor }) {
    return (
        <motion.div 
            className={`relative bg-slate-800/50 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:border-${glowColor}-500/50 transition-all cursor-pointer group overflow-hidden`}
            whileHover={{ scale: 1.05, y: -4 }}
        >
            {/* Hover Glow Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
            
            <div className="relative z-10 flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <div className="text-white">
                        {icon}
                    </div>
                </div>
                <div>
                    <div className="text-3xl font-black text-white">{value}</div>
                    <div className="text-xs text-gray-400 font-medium">{label}</div>
                </div>
            </div>
        </motion.div>
    ); 
}
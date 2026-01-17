import { motion } from "framer-motion";
import AnimatedNumber from "./AnimatedNumber";

export default function StatCard({ item, delay }) {
    const Icon = item.icon;


    return (
        <motion.div
            className="group relative bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all cursor-pointer overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -4 }}
        >
            {/* Hover Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
            
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 space-y-4">
                {/* Icon */}
                <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center shadow-lg shadow-${item.glowColor}/50 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                </div>

                {/* Value */}
                <div className="space-y-1">
                    <div className={`text-4xl font-black bg-gradient-to-br ${item.gradient} bg-clip-text text-transparent`}>
                        <AnimatedNumber 
                            value={typeof item.actualValue === 'number' ? item.actualValue : parseInt(item.actualValue)} 
                            suffix={item.label.includes('Rate') ? '%' : ''}
                        />
                    </div>
                    
                    <p className="text-white font-semibold text-sm">
                        {item.label}
                    </p>
                    
                    <p className="text-gray-500 text-xs">
                        {item.description}
                    </p>
                </div>
            </div>

            {/* Glow Effect on Hover */}
            <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity bg-gradient-to-br ${item.gradient} blur-xl`}></div>
        </motion.div>
    );
}
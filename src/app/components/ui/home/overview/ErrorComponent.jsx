import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ErrorComponent({ error }) {
    return (
        <motion.div
            className="mt-12 rounded-[2.5rem] overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="relative p-8 bg-red-500/10 backdrop-blur-xl border border-red-500/30 rounded-[2.5rem]">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent"></div>
                
                <div className="relative z-10 flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-6 h-6 text-red-400" />
                    </div>
                    
                    <div>
                        <h3 className="text-red-400 font-semibold">Oops! Something went wrong</h3>
                        <p className="text-red-300/70 text-sm mt-1">{error}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

import { motion } from "framer-motion";
import { Share2 } from "lucide-react";

export default function ShareButton() {
    return(
        <motion.button 
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-2xl text-white font-bold shadow-lg shadow-pink-500/50 hover:shadow-pink-500/70 transition-all group"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                <span>Share This Challenge</span>
                            </motion.button>
    );
}
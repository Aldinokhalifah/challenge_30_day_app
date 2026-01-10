import { motion } from "framer-motion";

export default function HeroTitle({name}) {
    return (
        <motion.div
        className="space-y-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight">
                <span className="block text-white/40 text-3xl md:text-4xl mb-2">
                Hello,
                </span>
                <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-orange-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] break-words">
                {name || "Champion"}
                </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light">
                Ready to conquer your goals?
            </p>
        </motion.div>
    );
    }

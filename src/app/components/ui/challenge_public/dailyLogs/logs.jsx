import { motion } from "framer-motion";
import { CheckCircle, Clock, XCircle, Sparkles } from "lucide-react";


export default function Logs({ challenge, completedCount, missedCount, pendingCount}) {

    const getStatusGradient = (status) => {
        switch (status) {
            case "completed":
                return "from-emerald-500 to-green-600";
            case "pending":
                return "from-amber-500 to-orange-600";
            case "missed":
                return "from-red-500 to-pink-600";
            default:
                return "from-gray-600 to-slate-700";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "completed":
                return <CheckCircle className="w-5 h-5" />;
            case "pending":
                return <Clock className="w-5 h-5" />;
            case "missed":
                return <XCircle className="w-5 h-5" />;
            default:
                return <Lock className="w-5 h-5" />;
        }
    };

    const getStatusBgGlow = (status) => {
        switch (status) {
            case "completed":
                return "bg-emerald-500/10 shadow-emerald-500/30";
            case "pending":
                return "bg-amber-500/10 shadow-amber-500/30";
            case "missed":
                return "bg-red-500/10 shadow-red-500/30";
            default:
                return "bg-slate-700/10";
        }
    };

    const getStatusBorder = (status) => {
        switch (status) {
            case "completed":
                return "border-emerald-500/40 hover:border-emerald-500/80";
            case "pending":
                return "border-amber-500/40 hover:border-amber-500/80";
            case "missed":
                return "border-red-500/40 hover:border-red-500/80";
            default:
                return "border-slate-700/40";
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            transition: { 
                type: "spring",
                stiffness: 100,
                damping: 15
            } 
        }
    };

    return (
        <motion.div
        className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-10 gap-3 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        >
        {challenge.logs.map((log) => (
            <motion.div
            key={log.day}
            className="group/card"
            variants={itemVariants}
            whileHover={{ scale: 1.1, zIndex: 50 }}
            >
            <div
                className={`
                    relative aspect-square rounded-2xl border-2 transition-all duration-300 cursor-pointer
                    ${getStatusBorder(log.status)}
                    ${getStatusBgGlow(log.status)}
                    backdrop-blur-sm overflow-hidden
                    hover:shadow-2xl
                `}
            >
                {/* Background Gradient on Hover */}
                <div
                className={`absolute inset-0 bg-gradient-to-br ${getStatusGradient(
                    log.status
                )} opacity-0 group-hover/card:opacity-20 transition-opacity`}
                ></div>

                {/* Icon Badge - Top Right */}
                <div
                className={`absolute top-1 right-1 w-6 h-6 bg-gradient-to-br ${getStatusGradient(
                    log.status
                )} rounded-lg flex items-center justify-center shadow-lg transform transition-transform group-hover/card:scale-110`}
                >
                <div className="text-white">{getStatusIcon(log.status)}</div>
                </div>

                {/* Day Number - Center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-2xl md:text-3xl font-black text-white mb-1">
                    {log.day}
                </div>
                <div className="text-[8px] md:text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                    Day
                </div>
                </div>

                {/* Completed Sparkle Effect */}
                {log.status === "completed" && (
                <motion.div
                    className="absolute top-2 left-2"
                    animate={{
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.2, 1],
                    }}
                    transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    }}
                >
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                </motion.div>
                )}

                {/* Tooltip on Hover */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                <div className="bg-slate-900 border border-white/20 text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-2xl whitespace-nowrap backdrop-blur-xl">
                    <div className="flex items-center gap-2">
                    {getStatusIcon(log.status)}
                    <span className="capitalize">
                        Day {log.day} - {log.status}
                    </span>
                    </div>
                    {/* Tooltip Arrow */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 border-r border-b border-white/20 transform rotate-45"></div>
                </div>
                </div>

                {/* Pulse Ring for Current Day */}
                {log.status === "pending" &&
                log.day === pendingCount + completedCount + missedCount - 29 && (
                    <div className="absolute inset-0 rounded-2xl border-2 border-amber-500 animate-ping"></div>
                )}
            </div>
            </motion.div>
        ))}
        </motion.div>
    );
}

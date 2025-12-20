import { Award, Clock, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function DailyLogsPublic({ challenge }) {

    const getStatusIcon = (status) => {
        switch (status) {
            case "completed":
                return <CheckCircle className="w-4 h-4" />;
            case "pending":
                return <Clock className="w-4 h-4" />;
            case "missed":
                return <XCircle className="w-4 h-4" />;
            default:
                return <Clock className="w-4 h-4" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "bg-green-100 text-green-600 border-green-200";
            case "pending":
                return "bg-yellow-100 text-yellow-600 border-yellow-200";
            case "missed":
                return "bg-red-100 text-red-600 border-red-200";
            default:
                return "bg-gray-100 text-gray-600 border-gray-200";
        }
    };

    const getStatusGradient = (status) => {
        switch (status) {
            case "completed":
                return "from-emerald-500 to-green-600";
            case "pending":
                return "from-amber-500 to-orange-600";
            case "missed":
                return "from-red-500 to-pink-600";
            default:
                return "from-gray-500 to-slate-600";
        }
    };

    // Variants untuk stagger animation
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1 // Days muncul bertahap
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.1 } }
    };

    return (
        <>
            {/* Daily Logs Timeline */}
            <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden relative">
                {/* Background enhancements - Radial + wave SVG untuk unik */}
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-gradient-radial from-purple-500/20 to-pink-500/10 rounded-full blur-3xl opacity-70"></div>
                <div className="absolute bottom-[-15%] left-[-10%] w-80 h-80 bg-gradient-radial from-indigo-500/20 to-blue-500/10 rounded-full blur-2xl opacity-60 animate-pulse slow"></div>
                {/* Wave SVG untuk journey feel */}
                <svg className="absolute bottom-0 left-0 w-full h-32 opacity-10" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="white" fillOpacity="0.1" d="M0,192L48,181.3C96,171,192,149,288,165.3C384,181,480,235,576,234.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>

                <div className="space-y-6 md:ml-12"> {/* Asymmetrical shift */}

                    {/* Header - Hover interaktif */}
                    <motion.div 
                        className="flex md:justify-between flex-col md:flex-row gap-4 transition-all duration-300 hover:scale-105 cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                                <Award className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Daily Log</h2>
                                <p className="text-gray-400">Your 30-day journey tracker</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Timeline Container */}
                    <motion.div 
                        className="relative flex flex-col gap-8" // Vertical timeline
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Connecting line SVG - Melengkung untuk unik */}
                        <svg className="absolute left-1/2 top-0 h-full w-1 opacity-50" preserveAspectRatio="none" viewBox="0 0 2 100">
                            <path d="M1 0 Q 1 50 1 100" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="2,2" />
                        </svg>

                        {challenge.logs.map((log, i) => (
                            <motion.div
                                key={i}
                                className={`relative w-full max-w-md p-4 rounded-xl border transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer ${getStatusColor(log.status)}`}
                                variants={itemVariants}
                                style={{ marginLeft: i % 2 === 0 ? '0' : 'auto', marginRight: i % 2 === 0 ? 'auto' : '0' }} // Subtle alternating
                            >
                                {/* Timeline dot */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 w-3 h-3 bg-white border-2 border-gray-300 rounded-full -ml-[calc(50%+6px)] md:-ml-[calc(50%+8px)]"></div>

                                <div className="flex items-center gap-4">
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${getStatusColor(log.status)}`}>
                                        {getStatusIcon(log.status)}
                                    </div>
                                    <div>
                                        <div className="text-gray-900 font-bold text-sm">
                                            Day {log.day}
                                        </div>
                                        <div className={`text-xs capitalize text-gray-600`}>
                                            {log.status === "completed" ? "✓ Completed" :
                                            log.status === "pending" ? "○ Pending" :
                                            "✗ Missed"}
                                        </div>
                                    </div>
                                </div>

                                {/* Hover tooltip */}
                                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white text-gray-700 text-xs px-3 py-1 rounded-lg shadow-md opacity-0 z-50 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                                    Day {log.day} - {log.status}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Legend - Tambah hover */}
                    <div className="flex items-center justify-center gap-6 pt-6 border-t border-white/10">
                        <div className="flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
                            <div className="w-4 h-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg"></div>
                            <span className="text-gray-400 text-sm">Completed</span>
                        </div>
                        <div className="flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
                            <div className="w-4 h-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg"></div>
                            <span className="text-gray-400 text-sm">Pending</span>
                        </div>
                        <div className="flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
                            <div className="w-4 h-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg"></div>
                            <span className="text-gray-400 text-sm">Missed</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
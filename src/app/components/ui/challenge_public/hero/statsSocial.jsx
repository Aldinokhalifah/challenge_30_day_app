import { motion } from "framer-motion"
import { Eye, Users } from "lucide-react"

export default function StatsSocial({totalViews, participants}) {
    return (
        <motion.div 
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 backdrop-blur-md rounded-full border border-white/10 hover:border-pink-500/50 transition-all" title="Total Views">
                                <Eye className="w-4 h-4 text-gray-400" />
                                <span className="text-white font-semibold text-sm">{totalViews}</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 backdrop-blur-md rounded-full border border-white/10 hover:border-purple-500/50 transition-all" title="Participants">
                                <Users className="w-4 h-4 text-gray-400" />
                                <span className="text-white font-semibold text-sm">{participants}</span>
                            </div>
                        </motion.div>
    )
}
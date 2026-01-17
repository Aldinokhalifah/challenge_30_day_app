import { motion } from "framer-motion";
import { Award, Activity, Sparkles } from "lucide-react";
import InfoPill from "./InfoPill";

export default function BottomInfoPills({ overallProgress }) {
    return (
        <motion.div 
            className="flex flex-wrap justify-center gap-3 pt-6 border-t border-white/10 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
        >
            <InfoPill icon={<Activity className="w-3 h-3" />} text="Live tracking" />
            <InfoPill icon={<Sparkles className="w-3 h-3" />} text="Auto-updated" />
            <InfoPill 
                icon={<Award className="w-3 h-3" />} 
                text={`${Math.round(overallProgress || 0)}% avg completion`} 
            />
        </motion.div>
    );
}

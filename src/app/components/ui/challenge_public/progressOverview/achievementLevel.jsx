import { motion } from "framer-motion";
import { Trophy, Target, Sparkles, Award, Crown } from "lucide-react";

export default function AchievementLevel({ progressPercentage }) {
  // Calculate achievement level
    const getAchievementLevel = () => {
        if (progressPercentage >= 90)
        return {
            title: "Legend",
            color: "from-yellow-400 to-orange-500",
            icon: Crown,
        };
        if (progressPercentage >= 70)
        return {
            title: "Champion",
            color: "from-purple-400 to-pink-500",
            icon: Trophy,
        };
        if (progressPercentage >= 50)
        return {
            title: "Warrior",
            color: "from-blue-400 to-purple-500",
            icon: Award,
        };
        if (progressPercentage >= 30)
        return {
            title: "Rising Star",
            color: "from-cyan-400 to-blue-500",
            icon: Sparkles,
        };
        return {
        title: "Beginner",
        color: "from-gray-400 to-slate-500",
        icon: Target,
        };
    };

    const achievement = getAchievementLevel();
    const AchievementIcon = achievement.icon;

    return (
        <motion.div
        className={`flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r ${achievement.color} rounded-full shadow-lg relative overflow-hidden`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        >
        <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
            <AchievementIcon className="w-5 h-5 text-white relative z-10" />
            <span className="text-white font-bold text-sm relative z-10">
                {achievement.title}
            </span>
            <Sparkles className="w-4 h-4 text-white relative z-10 animate-pulse" />
        </motion.div>
    );
}

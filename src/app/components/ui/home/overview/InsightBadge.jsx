export default function InsightBadge({ icon, value, label, color }) {
    const colors = {
        orange: "from-orange-500 to-red-500",
        emerald: "from-emerald-500 to-green-500",
        purple: "from-purple-500 to-pink-500"
    };

    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 backdrop-blur-md rounded-full border border-white/10 hover:border-white/30 transition-all">
            <div className={`w-7 h-7 bg-gradient-to-br ${colors[color]} rounded-lg flex items-center justify-center shadow-lg`}>
                <div className="text-white">
                    {icon}
                </div>
            </div>
            <div className="flex items-baseline gap-1">
                <span className="text-white font-bold text-sm">{value}</span>
                <span className="text-gray-400 text-xs">{label}</span>
            </div>
        </div>
    );
}
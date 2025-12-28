
export default function StatBadge({ icon, value, label, color }) {
    const colorClasses = {
        emerald: "from-emerald-500 to-green-500",
        amber: "from-amber-500 to-orange-500",
        orange: "from-orange-500 to-red-500"
    };

    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 backdrop-blur-md rounded-full border border-white/10 hover:border-white/30 transition-all">
            <div className={`w-7 h-7 bg-gradient-to-br ${colorClasses[color]} rounded-lg flex items-center justify-center shadow-lg`}>
                <div className="text-white">
                    {icon}
                </div>
            </div>
            <div className="flex items-baseline gap-1">
                <span className="text-white font-bold text-lg">{value}</span>
                <span className="text-gray-400 text-xs font-medium">{label}</span>
            </div>
        </div>
    );
}
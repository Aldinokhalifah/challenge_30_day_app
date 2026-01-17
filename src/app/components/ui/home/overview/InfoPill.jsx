export default function InfoPill({ icon, text }) {
    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="text-gray-400">
                {icon}
            </div>
            <span className="text-gray-400 text-xs font-medium">{text}</span>
        </div>
    );
}
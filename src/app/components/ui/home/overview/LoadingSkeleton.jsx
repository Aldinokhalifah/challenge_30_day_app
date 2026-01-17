export default function LoadingSkeleton() {
    return (
        <section className="mt-12 space-y-8">
        <div className="relative rounded-[2.5rem] overflow-hidden">
            <div className="p-8 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem]">
            <div className="text-center space-y-4 mb-8">
                <div className="w-48 h-8 bg-gray-700/50 rounded-2xl mx-auto animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, idx) => (
                <div
                    key={idx}
                    className="bg-slate-800/50 rounded-2xl p-6 animate-pulse"
                >
                    <div className="space-y-4">
                    <div className="w-12 h-12 bg-gray-600/50 rounded-xl"></div>
                    <div className="w-16 h-8 bg-gray-600/50 rounded"></div>
                    <div className="w-24 h-4 bg-gray-600/50 rounded"></div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>
        </section>
    );
}

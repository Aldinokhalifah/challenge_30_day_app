export default function BackgroundDecorations() {
    return (
        <>
        {/* Dynamic Background - Matching Public Challenge Style */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/15 via-purple-600/15 via-40% to-orange-500/15 backdrop-blur-3xl"></div>

        {/* Animated Orbs - More Vibrant */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-radial from-pink-500/40 via-purple-500/20 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-radial from-orange-500/40 via-amber-500/20 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-radial from-purple-500/30 to-transparent rounded-full blur-2xl animate-pulse-slow"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
            <div
            className="absolute inset-0"
            style={{
                backgroundImage: `linear-gradient(45deg, white 1px, transparent 1px),
                                            linear-gradient(-45deg, white 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
            }}
            ></div>
        </div>
        </>
    );
}

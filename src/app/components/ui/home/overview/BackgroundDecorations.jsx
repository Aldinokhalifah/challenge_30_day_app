export default function BackgroundDecorations() {
    return (
        <>
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-3xl"></div>
            
            {/* Animated Orbs */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-radial from-indigo-500/30 via-purple-500/15 to-transparent rounded-full blur-3xl animate-float"></div>
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-gradient-radial from-pink-500/30 via-purple-500/15 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(90deg, white 1px, transparent 1px),
                                     linear-gradient(0deg, white 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}></div>
            </div>
        </>
    );
}

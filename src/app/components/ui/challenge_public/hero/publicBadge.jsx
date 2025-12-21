import { Globe, Sparkles } from "lucide-react";

export default function PublicBadge() {
    return (
        <>
            <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
            <Globe className="w-4 h-4 text-white animate-spin-slow" />
            <span className="text-white font-bold text-sm">PUBLIC CHALLENGE</span>
            <Sparkles className="w-3 h-3 text-white" />
        </> 
    );
}
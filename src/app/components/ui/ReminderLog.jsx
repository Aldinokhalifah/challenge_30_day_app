import { AlertCircle } from "lucide-react";

export default function ReminderLog({filledDayToday}) {
    return (
        <div className="mb-6 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-2xl p-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                    <p className="text-amber-300 font-semibold">Already filled today!</p>
                    <p className="text-amber-400/80 text-sm">
                        You filled Day {filledDayToday}. Come back tomorrow to continue!
                    </p>
                </div>
            </div>
        </div>
    );
}
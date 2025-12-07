import { useParams } from "next/navigation";
import { useState, useCallback } from "react";
import {
    Clock,
    XCircle,
    CheckCircle,
    Calendar,
    Sparkles,
    Save,
    FileText,
} from "lucide-react";

export default function LogCard({ log }) {
    const { customId } = useParams();
    const [logs, setLogs] = useState(log);
    const [updatingLog, setUpdatingLog] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(null);
    const [editingLog, setEditingLog] = useState(null);
    const [noteInput, setNoteInput] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    const reloadChallenges = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch(`/api/challenge/${customId}/logs`, {
            credentials: 'include',
        });

        if (!res.ok) throw new Error("Failed to fetch challenge");
        const data = await res.json();
        setLogs(data.logs);
    };

        const handleEditLog = useCallback((log) => {
        setEditingLog(log.day);
        setNoteInput(log.note || "");
        setSelectedStatus(log.status);
    }, []); 

    const handleCancelEdit = useCallback(() => {
        setEditingLog(null);
        setNoteInput("");
        setSelectedStatus("");
    }, []); 

    const handleSaveLog = useCallback(async (days) => {

        if (!noteInput.trim()) {
            alert("Please add a note before saving");
            return;
        }

        setUpdatingLog(days);

        try {
            const res = await fetch(`/api/challenge/${customId}/logs/${days}`, {
                method: "PUT",
                credentials: 'include',
                body: JSON.stringify({
                    status: selectedStatus,
                    note: noteInput,
                    days: days,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to update log");
            }

            const data = await res.json();

            // Update logs state with the new log data
            const updatedLogs = logs.map((log) =>
                log.days === days ? data.log : log
            );
            setLogs(updatedLogs);
            await reloadChallenges();

            // Reset editing state
            setEditingLog(null);
            setNoteInput("");
            setSelectedStatus("");

            // Show confirmation
            if (selectedStatus === "completed") {
                setShowConfirmation(days);
                setTimeout(() => setShowConfirmation(null), 3000);
            }
        } catch (err) {
            console.error("Error updating log:", err);
            alert(err.message);
        } finally {
            setUpdatingLog(null);
        }
    }, [customId, noteInput, selectedStatus, logs, reloadChallenges]);

    const getStatusIcon = (status) => {
        switch (status) {
        case "completed":
            return <CheckCircle className="w-5 h-5" />;
        case "pending":
            return <Clock className="w-5 h-5" />;
        case "missed":
            return <XCircle className="w-5 h-5" />;
        default:
            return <Clock className="w-5 h-5" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
        case "completed":
            return "from-emerald-500 to-green-600";
        case "pending":
            return "from-amber-500 to-orange-600";
        case "missed":
            return "from-red-500 to-pink-600";
        default:
            return "from-gray-500 to-slate-600";
        }
    };

    if (!logs)
        return (
        <h1 className="flex items-center justify-center min-h-screen text-white text-2xl">
            Logs Not Found
        </h1>
        );
    return (
        <>
        {/* Days Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {logs.map((log) => (
            <div
                key={log.day}
                className="group relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-3xl border border-white/10 p-6 transition-all duration-500 hover:border-white/30 hover:shadow-2xl hover:shadow-indigo-500/20 overflow-hidden"
            >
                {/* Decorative Corner Element */}
                <div
                className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${getStatusColor(
                    log.status
                )} opacity-10 rounded-full blur-2xl transition-all duration-700`}
                ></div>

                {/* Confirmation Badge */}
                {showConfirmation === log.day && (
                <div className="absolute -top-0.5 -right-3 z-10 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-emerald-500/50 flex items-center gap-1.5 animate-bounce">
                    <Sparkles className="w-3 h-3" />
                    Saved!
                </div>
                )}

                {/* Day Header */}
                <div className="relative flex items-center justify-between mb-5 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div
                    className={`relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 bg-gradient-to-br ${getStatusColor(
                        log.status
                    )} ${
                        log.status === "completed"
                        ? "shadow-emerald-500/50"
                        : log.status === "pending"
                        ? "shadow-amber-500/50"
                        : "shadow-red-500/50"
                    }`}
                    >
                    <div className="text-white">{getStatusIcon(log.status)}</div>
                    </div>
                    <div>
                    <h3 className="text-white font-bold text-xl">
                        Day {log.day}
                    </h3>
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-0.5">
                        <Calendar className="w-3 h-3" />
                        <span className="capitalize">{log.status}</span>
                    </div>
                    </div>
                </div>
                </div>

                {/* Status Form */}
                {editingLog === log.day ? (
                <div className="relative space-y-4">
                    {/* Status Select */}
                    <div>
                    <label className="text-gray-300 text-sm font-medium block mb-2">
                        Status
                    </label>
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        disabled={log.status === 'completed' || log.status === 'missed'}
                        className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    >
                        <option value="completed">✓ Completed</option>
                        <option value="pending">○ Pending</option>
                        <option value="missed">✗ Missed</option>
                    </select>
                    </div>

                    {/* Note Input */}
                    <div>
                    <label className="text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Note
                    </label>
                    <textarea
                        value={noteInput}
                        onChange={(e) => setNoteInput(e.target.value)}
                        placeholder="Add your daily note..."
                        rows={3}
                        className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                    />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                    <button
                        onClick={() => handleSaveLog(log.day)}
                        disabled={updatingLog === log.day}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/30"
                    >
                        {updatingLog === log.day ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Saving...</span>
                        </>
                        ) : (
                        <>
                            <Save className="w-4 h-4" />
                            <span>Save</span>
                        </>
                        )}
                    </button>
                    <button
                        onClick={handleCancelEdit}
                        disabled={updatingLog === log.day}
                        className="px-4 py-3 bg-slate-700/50 text-gray-300 font-semibold rounded-xl hover:bg-slate-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    </div>
                </div>
                ) : (
                <div className="relative space-y-4">
                    {/* Display Note */}
                    {log.note ? (
                    <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
                        <p className="text-gray-400 text-xs font-medium mb-2 flex items-center gap-1.5">
                        <FileText className="w-3 h-3" />
                        Note
                        </p>
                        <p className="text-gray-300 text-sm leading-relaxed">
                        {log.note}
                        </p>
                    </div>
                    ) : (
                    <div className="bg-slate-800/40 border border-slate-700/50 border-dashed rounded-xl p-4 text-center">
                        <FileText className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                        <p className="text-gray-500 text-xs">No note added yet</p>
                    </div>
                    )}

                    {/* Edit Button */}
                    <button
                    onClick={() => handleEditLog(log)}
                    className="w-full px-4 py-3 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-semibold rounded-xl hover:bg-indigo-500/20 hover:border-indigo-500/50 transition-all duration-200"
                    >
                    Update Status & Note
                    </button>
                </div>
                )}
            </div>
            ))}
        </div>
        </>
    );
}

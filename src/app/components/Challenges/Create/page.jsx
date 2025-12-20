import { useState, useEffect, useCallback } from "react";
import Loading from "../../ui/loading";
import { Plus } from "lucide-react";

export default function ChallengeForm({
    onClose,
    onChallengeCreated,
    mode = "create", // "create" | "edit"
    initialData = {},
    customId, // untuk edit
}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // isi field kalau mode edit
    useEffect(() => {
        if (mode === "edit" && initialData) {
            setTitle(initialData.title || "");
            setDescription(initialData.description || "");
            setStartDate(initialData.startDate?.slice(0, 10) || "");
        }
    }, [mode, initialData]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const url =
                mode === "create"
                    ? "/api/challenge/create"
                    : `/api/challenge/${customId}/edit`;
            const method = mode === "create" ? "POST" : "PUT";

            const response = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, description, startDate }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            if (onChallengeCreated) onChallengeCreated();
            onClose();
        } catch (error) {
            console.error("Error submitting challenge:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [mode, customId, title, description, startDate, onChallengeCreated, onClose]);

    return (
        <>
            {loading && <Loading />}

            <div className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center z-50 h-screen">
                <div className="bg-gradient-to-l from-indigo-900 to-blue-900 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-2xl w-full max-w-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">
                            {mode === "create" ? "Create New Challenge" : "Edit Challenge"}
                        </h2>
                        <button
                            className="rotate-45 text-gray-400 hover:text-white transition-colors"
                            onClick={onClose}
                        >
                            <Plus className="w-8 h-8" />
                        </button>
                    </div>

                    {error && <p className="mb-4 text-sm text-red-400 bg-red-900/20 px-4 py-2 rounded-lg">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            type="text"
                            placeholder="Title"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />

                        <textarea
                            placeholder="Description"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors resize-none h-32"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />

                        <input
                            type="date"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40 transition-colors"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-all duration-200"
                            >
                                Cancel
                            </button>

                            {/* Button Submit yang sudah dipercantik */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="relative px-8 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Saving...</span>
                                    </div>
                                ) : (
                                    <span>{mode === "create" ? "Create Challenge" : "Update Challenge"}</span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
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
        setStartDate(initialData.startDate?.slice(0, 10) || ""); // date format YYYY-MM-DD
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

        <div className="fixed inset-0 backdrop-blur-md bg-white/30 shadow-xl flex items-center justify-center z-50 h-screen">
            <div className="bg-gradient-to-l from-indigo-900 to-blue-900 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-2xl w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">
                {mode === "create" ? "Create New Challenge" : "Edit Challenge"}
                </h2>
                <button
                className="rotate-45 text-gray-500 cursor-pointer"
                onClick={onClose}
                >
                <Plus className="w-8 h-8" />
                </button>
            </div>

            {error && <p className="mb-3 text-sm text-red-500">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                type="text"
                placeholder="Title"
                className="w-full mb-4 p-2 border rounded-lg text-white"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                />

                <textarea
                placeholder="Description"
                className="w-full mb-4 p-2 border text-white rounded-lg h-24"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                />

                <input
                placeholder="Start Date"
                type="date"
                className="w-full mb-4 p-2 border text-white rounded-lg"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                />

                <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-lg duration-300 transition-all"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg"
                >
                    {mode === "create" ? "Create" : "Update"}
                </button>
                </div>
            </form>
            </div>
        </div>
        </>
    );
}

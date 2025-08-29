import { useState } from "react";
import Loading from "../../loading";
import { Plus } from "lucide-react";

export default function CreateChallenge({ onClose, onChallengeCreated }) {
    const [ title, setTitle] = useState('');
    const [ description, setDescription] = useState('');
    const [ startDate, setStartDate] = useState('');
    const [ loading, setLoading] = useState(false);
    const [ error, setError] = useState(null);

    const handleSubmit = async (e)=> {
        e.preventDefault();
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await fetch('/api/challenge/create', {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, description, startDate})
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (response.ok) {
                if (onChallengeCreated) onChallengeCreated(); // reload data di parent
                onClose();
            }
        } catch (error) {
            console.error('Error fetching challenge stats:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return(
        <>
            {loading && (
                <Loading />
            )}

            <div className="fixed inset-0 backdrop-blur-md bg-white/30 shadow-xl flex items-center justify-center z-50">
                <div className="bg-gradient-to-l from-indigo-900 to-blue-900 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-2xl">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Create New Challenge</h2>
                        <button className="rotate-45 text-gray-500 cursor-pointer" onClick={onClose}>
                            <Plus className="w-8 h-8"/>
                        </button>
                    </div>

                    {error && (
                        <p className="mb-3 text-sm text-red-500">{error}</p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Title"
                            className="w-full mb-4 p-2 border rounded-lg"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />

                        <textarea
                            placeholder="Description"
                            className="w-full mb-4 p-2 border rounded-lg h-24"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />

                        <input 
                            placeholder="Start Date"
                            type="date"
                            className="w-full mb-4 p-2 border rounded-lg"
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
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
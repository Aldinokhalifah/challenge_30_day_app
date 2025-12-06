import { useEffect, useState, useCallback } from "react";
import ChallengeCard from "../ui/Card";
import StartNewChallenge from "./StartNewChallenge";
import ChallengeForm from "./Create/page";

export function ActiveChallengesSection({ challengeStats, reloadChallenges }) {
    const [filteredChallenges, setFilteredChallenges] = useState(challengeStats);
    const [isCreateChallengeOpen, setIsCreateChallengeOpen] = useState(false);
    const [isEditChallengeOpen, setIsEditChallengeOpen] = useState(false);
    const [challengeToEdit, setChallengeToEdit] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        let filtered = [...challengeStats];

        if (searchQuery.trim()) {
            filtered = filtered.filter(challenge => 
                challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                challenge.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sort filter
        switch (sortBy) {
            case 'newest':
                filtered.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
                break;
            case 'oldest':
                filtered.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
                break;
            case 'progress':
                filtered.sort((a, b) => b.progress - a.progress);
                break;
            case 'title':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                break;
        }

        setFilteredChallenges(filtered);
    }, [challengeStats, searchQuery, sortBy]);

    const handleEdit = useCallback((challenge) => {
        setChallengeToEdit(challenge);
        setIsEditChallengeOpen(true);
    }, []);

    const handleCloseCreate = useCallback(() => {
        setIsCreateChallengeOpen(false);
    }, []);

    const handleCloseEdit = useCallback(() => {
        setIsEditChallengeOpen(false);
        setChallengeToEdit(null);
    }, []);

    const handleChallengeUpdated = useCallback(() => {
        reloadChallenges();
        setIsEditChallengeOpen(false);
        setChallengeToEdit(null);
    }, [reloadChallenges]);

    const handleClearFilters = useCallback(() => {
        setSearchQuery('');
        setSortBy('newest');
    }, []);

    return (
        <div className="w-full space-y-12">
            {/* Animated Section Header */}
            <div className="text-center space-y-6 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-96 h-32 bg-gradient-to-r from-indigo-600/10 via-purple-600/20 to-blue-600/10 blur-3xl rounded-full"></div>
                </div>

                <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-slate-900/80 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
                        <div className="relative">
                            <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
                            <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                        </div>
                        <span className="text-white font-semibold text-lg">Your Active Journey</span>
                    </div>
                    
                    <div className="space-y-4">
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black bg-gradient-to-r from-white via-indigo-200 to-blue-400 bg-clip-text text-transparent animate-pulse py-2">
                            Active Challenges
                        </h1>
                        
                        <div className="flex items-center justify-center gap-6">
                            <div className="h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent flex-1 max-w-32"></div>
                            <div className="w-3 h-3 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full animate-spin"></div>
                            <div className="h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent flex-1 max-w-32"></div>
                        </div>
                        
                        <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
                            Transform your aspirations into achievements. Track your progress, celebrate milestones, and build the habits that define your success.
                        </p>
                    </div>
                </div>
            </div>

            {/* Search and Sort Controls */}
            {challengeStats.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="relative flex-1 max-w">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search challenges..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-gray-400 text-sm font-medium">Sort by:</span>
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 cursor-pointer pr-10"
                            >
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                                <option value="progress">Highest Progress</option>
                                <option value="title">Title A-Z</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row items-center justify-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-white/5">
                            <span className="text-indigo-400 text-sm font-semibold">{filteredChallenges.length}</span>
                            <span className="text-gray-400 text-sm">
                                {filteredChallenges.length === 1 ? 'challenge' : 'challenges'}
                            </span>
                        </div>
                        
                        <button
                            onClick={() => setIsCreateChallengeOpen(true)}
                            className="group relative px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl text-sm text-white shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative flex items-center justify-center gap-3">
                                <svg className="w-4 h-4 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span>New Challenge</span>
                            </div>
                        </button>
                    </div>
                </div>
            )}

            {/* Challenges Grid or Empty State */}
            {challengeStats.length > 0 ? (
                filteredChallenges.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 lg:gap-10">
                        {filteredChallenges.map((challenge, idx) => (
                            <div key={challenge.customId} className="transform transition-all duration-500" style={{animationDelay: `${idx * 150}ms`}}>
                                <ChallengeCard
                                    data={challenge}
                                    onDeleted={reloadChallenges}
                                    onEdit={handleEdit}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 px-4 relative">
                        <div className="text-center space-y-6">
                            <div className="w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl flex items-center justify-center shadow-xl mx-auto">
                                <div className="text-4xl opacity-60">🔍</div>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-white">No challenges found</h3>
                                <p className="text-gray-400">
                                    Try adjusting your search query or sort options.
                                </p>
                            </div>
                            <button
                                onClick={handleClearFilters}
                                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white font-medium transition-colors duration-300"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                )
            ) : (
                <StartNewChallenge />
            )}

            {/* Create Challenge Modal */}
            {isCreateChallengeOpen && (
                <ChallengeForm 
                    onClose={handleCloseCreate}
                    onChallengeCreated={reloadChallenges}
                />
            )}

            {/* Edit Challenge Modal */}
            {isEditChallengeOpen && (
                <ChallengeForm
                    mode="edit"
                    initialData={challengeToEdit}
                    customId={challengeToEdit?.customId}
                    onClose={handleCloseEdit}
                    onChallengeCreated={handleChallengeUpdated}
                />
            )}
        </div>
    );
}
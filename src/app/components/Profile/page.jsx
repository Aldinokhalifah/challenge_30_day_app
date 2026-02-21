import { useEffect, useState } from 'react';
import { User, Mail, Lock, Edit2, Trash2, Trophy, Eye, EyeOff, Save, X } from 'lucide-react';
import Loading from '../ui/loading';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileEmail } from '@/app/lib/api';
import { fetchOverviewStats } from '@/app/lib/api';

export default function ProfilePage() {
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        password: '••••••••',
        timestamps: null
    });
    const [tempEmail, setTempEmail] = useState(profile.email);
    const [tempPassword, setTempPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();
    const qc = useQueryClient();

    const {
        data: overview,
        isLoading: overviewLoading,
        error: overviewError
    } = useQuery({
        queryKey: ['overviewStats'],
        queryFn: fetchOverviewStats,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 20
    });

    const fetchProfileData = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (!userData) throw new Error('No user data found');
            
            setProfile(prev => ({
                ...prev,
                id: userData.id,
                name: userData.name,
                email: userData.email,
                timestamps: userData.timestamps
            }));
        } catch (error) {
            console.error('Error fetching profile:', error);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    const updateEmailMutation = useMutation({
        mutationFn: async (email) => 
            updateProfileEmail(email),
        onSuccess: () => {
            // Update local storage dengan data baru
            const userData = JSON.parse(localStorage.getItem('userData'));
            const updatedUserData = {
                ...userData,
                email: tempEmail
            };
            localStorage.setItem('userData', JSON.stringify(updatedUserData));

            // Update state setelah konfirmasi dari server
            setProfile(prev => ({
                ...prev,
                email: tempEmail
            }));
            
            // 🔧 Invalidate query cache agar overview tetap konsisten
            qc.invalidateQueries({ queryKey: ['overviewStats'] });
            
            setIsEditingEmail(false);
            setError(null);
        },
        onError: (err) => {
            // Tampilkan error message dari backend
            setError(err.message);
            alert(err.message);
        }
    });

    const handleSaveEmail = async () => {
        updateEmailMutation.mutate(tempEmail);
    };

    const handleSavePassword = async () => {
        try {
            if (tempPassword === confirmPassword && tempPassword.length >= 8) {
                setProfile({ ...profile, password: '' });
                setIsEditingPassword(false);
                setTempPassword('');
                setConfirmPassword('');
            }

            const userData = JSON.parse(localStorage.getItem('userData'));
            
            if (!userData) throw new Error('No user data found');

            const response = await fetch(`/api/profile/edit/${userData.id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({password: tempPassword})
            });

            if (!response.ok) {
                throw new Error('Failed to update password');
            }

            const data = await response.json();

            setProfile(prev => ({
                ...profile,
                password: tempPassword
            }));

            setIsEditingPassword(false);
            setError(null);
        } catch (error) {
            console.error('Error updating email:', error);
            setError(error.message);

            setTempPassword(profile.password);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            
            if (!userData) throw new Error('No user data found');

            const response = await fetch(`/api/profile/delete/${userData.id}`, {
                method: 'DELETE',
                credentials: 'include',
                body: JSON.stringify({password: tempPassword})
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
            localStorage.removeItem('userData');

            const data = await response.json();
            console.log("User deleted:", data.message);

            router.push('/Login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {overviewLoading && <Loading />}

            {/* Background dengan gradient subtle */}
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3">
                            Profile
                        </h1>
                        <p className="text-indigo-200 text-lg">Manage your account information</p>
                    </div>

                    {/* Profile Card dengan glassmorphism */}
                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                        {/* Profile Header */}
                        <div className="bg-gradient-to-br from-indigo-800/80 via-purple-800/80 to-blue-900/80 p-10 text-center">
                            <div className="w-32 h-32 mx-auto rounded-full bg-white/20 backdrop-blur-md border-4 border-white/30 flex items-center justify-center text-white text-5xl font-bold shadow-2xl">
                                <User className="w-16 h-16" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mt-6">{profile.name}</h2>
                            <p className="text-indigo-200 mt-2">Acitve since {profile.timestamps ? new Date(profile.timestamps).toLocaleDateString() : 'N/A'}</p>
                        </div>

                        {/* Profile Content */}
                        <div className="p-8 space-y-8">
                            {/* Total Challenges Card */}
                            <div className="group bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl p-6 border border-white/20 backdrop-blur-sm hover:ring-4 hover:ring-indigo-400/30 transition-all duration-300">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                                            <Trophy className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-indigo-200 text-sm font-medium">Total Challenges</p>
                                            <p className="text-4xl font-extrabold text-white">
                                                {overview?.totalChallenges || 0}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {(overviewError || error) && (
                                <div className="bg-red-900/30 border border-red-500/50 text-red-300 px-5 py-3 rounded-xl text-sm">
                                    {overviewError?.message || error}
                                </div>
                            )}

                            {/* Email Section */}
                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-6 h-6 text-indigo-400" />
                                        <span className="text-lg font-semibold text-white">Email</span>
                                    </div>
                                    {!isEditingEmail && (
                                        <button
                                            onClick={() => {
                                                setIsEditingEmail(true);
                                                setTempEmail(profile.email);
                                            }}
                                            className="text-indigo-400 hover:text-white transition-colors"
                                        >
                                            <Edit2 className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>

                                {isEditingEmail ? (
                                    <div className="space-y-4">
                                        <input
                                            type="email"
                                            value={tempEmail}
                                            onChange={(e) => setTempEmail(e.target.value)}
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 transition-all"
                                            placeholder="Enter new email"
                                        />
                                        <div className="flex gap-3">
                                            <button
                                                onClick={handleSaveEmail}
                                                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                                            >
                                                <Save className="w-5 h-5" />
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setIsEditingEmail(false)}
                                                className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-white/90 text-lg px-4 py-3 bg-white/10 rounded-xl">
                                        {profile.email}
                                    </p>
                                )}
                            </div>

                            {/* Password Section */}
                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <Lock className="w-6 h-6 text-indigo-400" />
                                        <span className="text-lg font-semibold text-white">Update Password</span>
                                    </div>
                                    {!isEditingPassword && (
                                        <button
                                            onClick={() => setIsEditingPassword(true)}
                                            className="text-indigo-400 hover:text-white transition-colors"
                                        >
                                            <Edit2 className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>

                                {isEditingPassword ? (
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={tempPassword}
                                                onChange={(e) => setTempPassword(e.target.value)}
                                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 transition-all"
                                                placeholder="New password (min. 8 characters)"
                                            />
                                            <button
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 transition-all"
                                            placeholder="Confirm new password"
                                        />
                                        {tempPassword && confirmPassword && tempPassword !== confirmPassword && (
                                            <p className="text-red-400 text-sm">Passwords do not match</p>
                                        )}
                                        {tempPassword && tempPassword.length < 8 && (
                                            <p className="text-orange-400 text-sm">Password must be at least 8 characters</p>
                                        )}
                                        <div className="flex gap-3">
                                            <button
                                                onClick={handleSavePassword}
                                                disabled={!tempPassword || tempPassword !== confirmPassword || tempPassword.length < 8}
                                                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                                            >
                                                <Save className="w-5 h-5" />
                                                Update Password
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsEditingPassword(false);
                                                    setTempPassword('');
                                                    setConfirmPassword('');
                                                }}
                                                className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-white/60 italic px-4 py-3">Click edit to change your password</p>
                                )}
                            </div>

                            {/* Delete Account */}
                            <div className="pt-4">
                                <button
                                    onClick={() => setShowDeleteModal(true)}
                                    className="w-full bg-red-600/20 border border-red-500/50 text-red-400 py-4 rounded-xl font-medium hover:bg-red-600/30 hover:text-red-300 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm"
                                >
                                    <Trash2 className="w-6 h-6" />
                                    Delete Account Permanently
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
                        <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-3xl shadow-2xl border border-white/10 max-w-md w-full p-8">
                            <div className="w-16 h-16 rounded-full bg-red-600/30 flex items-center justify-center mx-auto mb-6">
                                <Trash2 className="w-8 h-8 text-red-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white text-center mb-4">
                                Delete Account?
                            </h3>
                            <p className="text-indigo-200 text-center mb-8">
                                This action <span className="text-red-400 font-semibold">cannot be undone</span>. All your challenges and data will be permanently deleted.
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 hover:scale-105 transition-all duration-300 shadow-lg"
                                >
                                    Yes, Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
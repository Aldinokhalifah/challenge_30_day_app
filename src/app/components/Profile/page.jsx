import { useEffect, useState } from 'react';
import { User, Mail, Lock, Edit2, Trash2, Trophy, Eye, EyeOff, Save, X } from 'lucide-react';
import Loading from '../ui/loading';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalChallenges, setTotalChallenges] = useState(null);
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        password: '••••••••',
        totalChallenges: totalChallenges
    });
    const [tempEmail, setTempEmail] = useState(profile.email);
    const [tempPassword, setTempPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const fetchOverviewStats = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch("/api/challenge/statistic", {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed to fetch stats');
            const data = await res.json();
            setTotalChallenges(data.totalChallenges);
        } catch (error) {
            console.error('Error fetching stats:', error);
            setError(error.message);
        }
    };

    const fetchProfileData = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (!userData) throw new Error('No user data found');
            
            setProfile(prev => ({
                ...prev,
                name: userData.name,
                email: userData.email,
                totalChallenges: totalChallenges
            }));
        } catch (error) {
            console.error('Error fetching profile:', error);
            setError(error.message);
        }
    };

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        const fetchData = async () => {
            try {
                setLoading(true);
                await Promise.all([
                    fetchOverviewStats(),
                    fetchProfileData()
                ]);
            } catch (error) {
                setError(error.message);
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        if(!userData) {
            console.log('[Profile] No userData detected - redirecting to login');
            router.replace('/Login');
        } else {
            fetchData();
        }

    }, []);

    useEffect(() => {
        if (totalChallenges !== null) {
            setProfile(prev => ({
                ...prev,
                totalChallenges
            }));
        }
    }, [totalChallenges]);

    const handleSaveEmail = async () => {
        try {
            const token = localStorage.getItem('token');
            const userData = JSON.parse(localStorage.getItem('userData'));
            
            if (!userData) throw new Error('No user data found');

            const response = await fetch(`/api/profile/edit/${userData.id}`, {
                method: 'PUT',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: tempEmail })
            });

            if (!response.ok) {
                throw new Error('Failed to update email');
            }

            const data = await response.json();

            // Update local storage dengan data baru
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
            
            setIsEditingEmail(false);
            setError(null);

        } catch (error) {
            console.error('Error updating email:', error);
            setError(error.message);
            // Kembalikan email ke nilai sebelumnya jika gagal
            setTempEmail(profile.email);
        }
    };

    const handleSavePassword = async () => {
        try {
            if (tempPassword === confirmPassword && tempPassword.length >= 8) {
                setProfile({ ...profile, password: '' });
                setIsEditingPassword(false);
                setTempPassword('');
                setConfirmPassword('');
            }

            const token = localStorage.getItem('token');
            const userData = JSON.parse(localStorage.getItem('userData'));
            
            if (!userData) throw new Error('No user data found');

            const response = await fetch(`/api/profile/edit/${userData.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({password: tempPassword})
            });

            const data = response.json();

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
            const token = localStorage.getItem('token');
            const userData = JSON.parse(localStorage.getItem('userData'));
            
            if (!userData) throw new Error('No user data found');

            const response = await fetch(`/api/profile/delete/${userData.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({password: tempPassword})
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
            localStorage.removeItem('token');
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
            {loading && (
                <Loading />
            )}

            <div className="min-h-screen py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Profile Page
                    </h1>
                    <p className="text-slate-600">Your informations are here</p>
                    </div>

                    {/* Profile Card */}
                    <div className="bg-white/90 rounded-3xl shadow-2xl shadow-indigo-100/50 overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900 p-8 text-center">
                        <div className="w-24 h-24 mx-auto rounded-full bg-white/20 backdrop-blur-sm border-4 border-white flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                        <User className="w-12 h-12" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mt-4">{profile.name}</h2>
                    </div>

                    {/* Profile Content */}
                    <div className="p-8 space-y-6">
                        {/* Total Challenge */}
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                                <Trophy className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-slate-600 font-medium">Total {profile.totalChallenges > 1 ? 'Challenges' : 'Challenge'}</p>
                                <p className="text-3xl font-bold text-indigo-600">{profile.totalChallenges < 1 ? 'No Challenge Found' : profile.totalChallenges}</p>
                            </div>
                            </div>
                        </div>
                        </div>

                        {error && (
                            <div className="text-sm text-red-700 font-medium">{error}</div>
                        )}

                        {/* Email Section */}
                        <div className="border-b border-slate-100 pb-6">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                            <Mail className="w-5 h-5 text-indigo-600" />
                            <label className="text-sm font-semibold text-slate-700">Email</label>
                            </div>
                            {!isEditingEmail && (
                            <button
                                onClick={() => {
                                setIsEditingEmail(true);
                                setTempEmail(profile.email);
                                }}
                                className="text-indigo-600 hover:text-indigo-700 p-1"
                            >
                                <Edit2 className="w-4 h-4" />
                            </button>
                            )}
                        </div>
                        
                        {isEditingEmail ? (
                            <div className="space-y-3">
                            <input
                                type="email"
                                value={tempEmail}
                                onChange={(e) => setTempEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-1 transition-all text-slate-800"
                                placeholder="New Email"
                            />
                            <div className="flex gap-2">
                                <button
                                onClick={handleSaveEmail}
                                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                >
                                <Save className="w-4 h-4" />
                                save
                                </button>
                                <button
                                onClick={() => setIsEditingEmail(false)}
                                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-all"
                                >
                                <X className="w-4 h-4" />
                                </button>
                            </div>
                            </div>
                        ) : (
                            <p className="text-slate-800 font-medium mt-1 px-4 py-3 bg-slate-50 rounded-xl">
                            {profile.email}
                            </p>
                        )}
                        </div>

                        {/* Password Section */}
                        <div className="border-b border-slate-100 pb-6">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                            <Lock className="w-5 h-5 text-indigo-600" />
                            <label className="text-sm font-semibold text-slate-700">Update Password</label>
                            </div>
                            {!isEditingPassword && (
                            <button
                                onClick={() => setIsEditingPassword(true)}
                                className="text-indigo-600 hover:text-indigo-700 p-1"
                            >
                                <Edit2 className="w-4 h-4" />
                            </button>
                            )}
                        </div>
                        
                        {isEditingPassword ? (
                            <div className="space-y-3">
                            <div className="relative">
                                <input
                                type={showPassword ? "text" : "password"}
                                value={tempPassword}
                                onChange={(e) => setTempPassword(e.target.value)}
                                className="w-full text-slate-800 px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-1 transition-all"
                                placeholder="New Password (min. 8 character)"
                                />
                                <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full text-slate-800 px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-1 transition-all"
                                placeholder="New password confirmation"
                            />
                            {tempPassword && confirmPassword && tempPassword !== confirmPassword && (
                                <p className="text-red-500 text-sm">Password doesn't match</p>
                            )}
                            {tempPassword && tempPassword.length < 8 && (
                                <p className="text-orange-500 text-sm">Password must be at least 8 character</p>
                            )}
                            <div className="flex gap-2">
                                <button
                                onClick={handleSavePassword}
                                disabled={!tempPassword || tempPassword !== confirmPassword || tempPassword.length < 8}
                                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                <Save className="w-4 h-4" />
                                save
                                </button>
                                <button
                                onClick={() => {
                                    setIsEditingPassword(false);
                                    setTempPassword('');
                                    setConfirmPassword('');
                                }}
                                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-all"
                                >
                                <X className="w-4 h-4" />
                                </button>
                            </div>
                            </div>
                        ) : (
                            <p className="text-slate-800 font-medium mt-1 px-4 py-3 bg-slate-50 rounded-xl">
                            {profile.password}
                            </p>
                        )}
                        </div>

                        {/* Delete Account */}
                        <div className="pt-2">
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-medium hover:bg-red-100 transition-all flex items-center justify-center gap-2 border border-red-200"
                        >
                            <Trash2 className="w-5 h-5" />
                            Delete Account
                        </button>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                        <Trash2 className="w-6 h-6 text-red-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 text-center mb-2">
                        Delete Account?
                        </h3>
                        <p className="text-slate-600 text-center mb-6">
                        This action cannot be undone. All your data will be permanently deleted.
                        </p>
                        <div className="flex gap-3">
                        <button
                            onClick={() => setShowDeleteModal(false)}
                            className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDeleteAccount}
                            className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-all"
                        >
                            Yes, Delete
                        </button>
                        </div>
                    </div>
                    </div>
                )}
            </div>
        </>
    );
}
'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import AnimatedGradientBg from "@/app/components/ui/animatedBgGradient";

export default function Login() {
    const [form, setForm] = useState({email: '', password: ''});
    const [message, setMessage] = useState('');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        setIsLoading(true); // Tambahkan di awal
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache' // Tambahkan ini
            },
            body: JSON.stringify({
                email: form.email,
                password: form.password,
                timezone
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }
        
        // Simpan data
        localStorage.setItem('userData', JSON.stringify(data.userData));
        document.cookie = `token=${data.token}; path=/; max-age=86400; SameSite=Lax`;
        
        router.push('/');
    } catch (error) {
        Swal.fire({
            title: error.message || "Something Wrong With The Server",
            icon: 'error',
            confirmButtonText: 'OK'
        });
    } finally {
        setIsLoading(false);
    }
}

    return(
        <>
            <AnimatedGradientBg>
                <div className="relative py-20 sm:max-w-xl sm:mx-auto ">
                    <div
                        className="relative px-4 py-10 backdrop-blur-md bg-white/10 border border-white/20 mx-8 md:mx-0 shadow rounded-3xl sm:p-10"
                    >
                        <div className="max-w-md mx-auto">
                            <div className="flex items-center space-x-5 justify-center text-2xl font-bold text-white">
                                <div className="bg-clip-text text-transparent text-center bg-gradient-to-r from-cyan-400 to-blue-600 mr-2"> Sign In</div> to Your Account
                            </div>
                            <form action="#" method="POST" onSubmit={handleSubmit}>
                                <div className="mt-5">
                                    <label
                                    className="font-semibold text-sm text-white pb-1 block"
                                    >E-mail</label
                                    >
                                    <input
                                    placeholder="Email"
                                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full text-white"
                                    type="email"
                                    id="email"
                                    name="email" // Tambahkan ini
                                    value={form.email} 
                                    required
                                    onChange={handleChange}
                                    />
                                    <label
                                    className="font-semibold text-sm text-white pb-1 block"
                                    >Password</label
                                    >
                                    <input
                                    placeholder="Password"
                                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full text-white"
                                    type="password"
                                    id="password"
                                    name="password" // Tambahkan ini
                                    value={form.password}
                                    required
                                    onChange={handleChange}
                                    />
                                </div>
                                <div className="mt-5">
                                    <button
                                        className={`py-2 px-4 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg
                                            ${isLoading 
                                                ? 'bg-gray-400 cursor-not-allowed' 
                                                : 'bg-blue-600 hover:bg-blue-700 focus:bg-blue-800 text-white'
                                            }`}
                                        type="submit"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center">
                                                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                                                Loading...
                                            </div>
                                        ) : "Sign In"}
                                    </button>
                                </div>
                            </form>
                            <div className="flex items-center justify-between mt-4">
                                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                                <Link
                                className="text-xs text-slate-300 uppercase dark:text-gray-400 hover:underline"
                                href="/Register"
                                >or Sign Up
                                </Link>
                                <span className="w-1/5 border-b dark:border-gray-400 md:w-1/4"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedGradientBg>
        </>
    );
}
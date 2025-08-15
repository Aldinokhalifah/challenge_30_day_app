'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import AnimatedGradientBg from "@/app/components/animatedBgGradient";


export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setForm({...form, [e.target.name] : e.target.value});
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.password) {
            Swal.fire({
                title: "Error",
                text: "Semua field harus diisi",
                icon: "error"
            });
            return;
        }

        // Validasi email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            Swal.fire({
                title: "Error",
                text: "Format email tidak valid",
                icon: "error"
            });
            return;
        }

        // Validasi password length
        if (form.password.length < 6) {
            Swal.fire({
                title: "Error",
                text: "Password minimal 6 karakter",
                icon: "error"
            });
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            await Swal.fire({
                title: 'Success',
                text: 'Akun telah berhasil dibuat',
                icon: 'success',
                confirmButtonText: 'Login'
            });

            router.push('/Login');
        } catch (error) {
            Swal.fire({
                title: error.message || "Terjadi kesalahan pada server",
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
                <div className="relative my-auto py-16 sm:max-w-xl sm:mx-auto">
                    <div
                        className="relative px-4 py-10 backdrop-blur-md bg-white/10 border border-white/20 mx-8 md:mx-0 shadow-xl rounded-3xl sm:p-10"
                    >
                        <div className="max-w-md mx-auto">
                            <div className="flex items-center space-x-5 justify-center text-2xl font-bold text-white">
                                <div className="bg-clip-text text-transparent text-center bg-gradient-to-r from-cyan-400 to-blue-600 mr-2"> Sign Up</div> to Your Account
                            </div>
                            <form action="#" method="POST" onSubmit={handleSubmit}>
                                <div className="mt-5">
                                    <label
                                    className="font-semibold text-sm text-white pb-1 block"
                                    for="name"
                                    >Name</label
                                    >
                                    <input
                                    placeholder="Name"
                                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full text-white"
                                    type="text"
                                    id="name"
                                    required
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    />
                                    <label
                                    className="font-semibold text-sm text-white pb-1 block"
                                    for="e-mail"
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
                                    for="password"
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
                                        ) : "Sign Up"}
                                    </button>
                                </div>
                            </form>
                            <div className="flex items-center justify-between mt-4">
                                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                                <Link
                                className="text-xs text-slate-300 uppercase dark:text-gray-400 hover:underline"
                                href="/Login"
                                >or Sign In
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
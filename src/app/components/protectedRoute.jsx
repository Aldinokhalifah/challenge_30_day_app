// components/ProtectedRoute.jsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { checkInactivity } from "@/app/lib/checkInactivity";

export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
        router.replace("/Login");
        } else {
        setLoading(false);
        }
    }, [router]);

    useEffect(() => {
        const handleActivity = () => {
        localStorage.setItem("lastActivity", Date.now());
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);

    return () => {
        window.removeEventListener("mousemove", handleActivity);
        window.removeEventListener("keydown", handleActivity);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
        if (checkInactivity()) {
            localStorage.removeItem("token");
            router.replace("/Login");
        }
        }, 60000);

        return () => clearInterval(interval);
    }, [router]);

    if (loading) return <p>Loading...</p>;

    return <>{children}</>;
}

"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { checkInactivity } from "@/app/lib/checkInactivity";

export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Cek userData (token sudah dicek di middleware)
        // Component ini untuk layer tambahan dan cek inaktivitas
        const userData = localStorage.getItem("userData");
        
        if (!userData || checkInactivity()) {
            Promise.all([
                localStorage.removeItem("lastActivity"),
                localStorage.removeItem("userData")
            ]);
            router.replace("/Login");
            return;
        }
        setLoading(false);
    }, [router]);

    // Update lastActivity saat ada aktivitas
    useEffect(() => {
        const handleActivity = () => {
            localStorage.setItem("lastActivity", Date.now().toString());
        };

        handleActivity(); // Set initial activity
        window.addEventListener("mousemove", handleActivity);
        window.addEventListener("keydown", handleActivity);

        return () => {
            window.removeEventListener("mousemove", handleActivity);
            window.removeEventListener("keydown", handleActivity);
        };
    }, []);

    // Cek inaktivitas setiap menit
    useEffect(() => {
        const interval = setInterval(() => {
            if (checkInactivity()) {
                router.replace("/Login");
            }
        }, 60000); // Check every minute

        return () => clearInterval(interval);
    }, [router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
}
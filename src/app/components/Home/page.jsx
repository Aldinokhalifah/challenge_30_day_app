'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/Login");
        }
    }, [router]);

    const handleOut = () => {
        localStorage.removeItem("token");
        router.push("/Login");
    }

    return(
        <>
            <h1>Home</h1>
            <button onClick={handleOut}>Logout</button> {/* Remove () from onClick */}
        </>
    )
}
'use client';
import { useRouter } from "next/navigation";
import ProtectedRoute from "../protectedRoute";

export default function HomePage() {
    const router = useRouter();

    const handleOut = () => {
        localStorage.removeItem("token");
        router.push("/Login");
    };

    return (
        <ProtectedRoute>
            <h1>Home</h1>
            <button onClick={handleOut}>Logout</button>
        </ProtectedRoute>
    );
}

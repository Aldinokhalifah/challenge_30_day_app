'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ChallengeDetail from "../../../components/Challenges/Detail/page";
import Loading from "../../../components/loading";

export default function ChallengeDetailPage() {
    const { customId } = useParams();
    const [challenge, setChallenge] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchChallenge() {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Token not found');
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`/api/challenge/${customId}`, {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                if (!res.ok) throw new Error('Failed to fetch challenge');
                
                const data = await res.json();
                setChallenge(data.challenge);
            } catch (err) {
                console.error("Error fetching challenge:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        if (customId) fetchChallenge();
    }, [customId]);

    if (loading) return <Loading />;
    if (error) return <div>Error: {error}</div>;
    if (!challenge) return <div>Challenge tidak ditemukan</div>;
    
    return <ChallengeDetail challenge={challenge} />;
}
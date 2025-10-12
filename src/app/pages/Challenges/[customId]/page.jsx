'use client';

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import ChallengeDetail from "../../../components/Challenges/Detail/page";
import Loading from "../../../components/ui/loading";

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

    const reloadChallenges = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            setLoading(true);
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
            console.error("Error reloading challenge:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [customId]);


    if (loading) return <Loading />;
    if (error) return <div>Error: {error}</div>;
    if (!challenge) return <div>Challenges Not Found</div>;
    
    return <ChallengeDetail challenge={challenge} reloadChallenges={reloadChallenges} />;
}
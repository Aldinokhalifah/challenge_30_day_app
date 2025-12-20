'use client';

import React from "react";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import ChallengeDetail from "../../../components/Challenges/Detail/page";
import Loading from "../../../components/ui/loading";

function ChallengeDetailPage() {
    const { customId } = useParams();
    const [challenge, setChallenge] = useState(null);
    const [statistic, setStatistic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchChallenge() {
            try {
                const [challengeRes, statsRes] = await Promise.all([
                    fetch(`/api/challenge/${customId}`, {
                        credentials: 'include'
                    }),
                    fetch(`/api/challenge/${customId}/statistic`, {
                        credentials: 'include'
                    })
                ]);

                if (!challengeRes.ok) throw new Error('Failed to fetch challenge');
                if (!statsRes.ok) throw new Error('Failed to fetch statistics');

                const [challengeData, statsData] = await Promise.all([
                    challengeRes.json(),
                    statsRes.json()
                ]);

                setChallenge(challengeData.challenge);
                setStatistic(statsData.statistic);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchChallenge();
    }, [customId]);

    const reloadChallenges = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/challenge/${customId}`, {
                credentials: 'include'
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


    if (error) return <div>Error: {error}</div>;
    return <ChallengeDetail challenge={challenge} reloadChallenges={reloadChallenges} statistic={statistic} loading={loading} />;
}

export default React.memo(ChallengeDetailPage);
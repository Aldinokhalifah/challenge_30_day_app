'use client';

import React from "react";
import { useEffect, useState } from "react";
import Loading from "../../components/ui/loading";
import ChallengeDetailPublic from "@/app/components/Challenge_Public/Detail/page";
import { useParams } from "next/navigation";

function ChallengeDetailPagePublic() {
    const params = useParams();
    const customId = params.customId;
    const [challenge, setChallenge] = useState(null);
    const [statistic, setStatistic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchChallenge() {
            try {
                const [challengeRes, statsRes] = await Promise.all([
                    fetch(`/api/public/challenge/${customId}`, {
                        headers: { 
                            'Content-Type': 'application/json'
                        }
                    }),
                    fetch(`/api/public/challenge/${customId}/statistic`, {
                        headers: {
                            'Content-type': 'application/json'
                        }
                    })
                ]);

                if (!challengeRes.ok) {
                    const errorData = await challengeRes.json();
                    throw new Error(errorData.message || 'Failed to fetch challenge');
                }
                if (!statsRes.ok) {
                    const errorData = await statsRes.json();
                    throw new Error(errorData.message || 'Failed to fetch statistics');
                }

                const [challengeData, statsData] = await Promise.all([
                    challengeRes.json(),
                    statsRes.json()
                ]);

                setChallenge(challengeData.data); // Ubah ke data karena response berubah
                setStatistic(statsData.statistic);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        if (customId) { // Only fetch if customId exists
            fetchChallenge();
        }
    }, [customId]);


    if (loading) return <Loading />;
    if (error) return <div>Error: {error}</div>;
    if (!challenge) return <div>Challenges Not Found</div>;
    
    return <ChallengeDetailPublic challenge={challenge} statistic={statistic} />;
}

export default ChallengeDetailPagePublic;
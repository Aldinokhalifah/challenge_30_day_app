'use client';

import React from "react";
import Loading from "../../components/ui/loading";
import ChallengeDetailPublic from "@/app/components/Challenge_Public/Detail/page";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchChallengePublic, fetchStatsChallengePublic } from "@/app/lib/api";

function ChallengeDetailPagePublic() {
    const params = useParams();
    const customId = params.customId;

    const {
        data: challenge,
        isLoading: challengeLoading,
        error: challengeError
    } = useQuery({
        queryKey: ['challengePublic', customId],
        queryFn: () => fetchChallengePublic(customId),
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5, 
        enabled: !!customId 
    });

    const {
        data: statistic,
        isLoading: statisticLoading,
        error: statisticError
    } = useQuery({
        queryKey: ['challengeStatsPublic', customId],
        queryFn: () => fetchStatsChallengePublic(customId),
        staleTime: 1000 * 60,
        gcTime: 1000 * 60 * 5,
        enabled: !!customId
    });

    if (challengeLoading || statisticLoading) return <Loading />;
    if (challengeError) return <div>Error: {challengeError.message}</div>;
    if (statisticError) return <div>Error: {statisticError.message}</div>;
    if (!challenge) return <div>Challenges Not Found</div>;
    
    return <ChallengeDetailPublic challenge={challenge} statistic={statistic} />;
}

export default ChallengeDetailPagePublic;
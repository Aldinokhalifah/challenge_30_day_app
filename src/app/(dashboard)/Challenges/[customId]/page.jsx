'use client';

import React from "react";
import { useCallback } from "react";
import { useParams } from "next/navigation";
import ChallengeDetail from "../../../components/Challenges/Detail/page";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { fetchChallengeDetail, fetchOverviewStatsDetail } from "@/app/lib/api";

function ChallengeDetailPage() {
    const { customId } = useParams();
    const queryClient = useQueryClient();
    
    const [challengeQuery, statsQuery] = useQueries({
        queries: [
            {
                queryKey: ['challenge', customId],
                queryFn: () => fetchChallengeDetail(customId),
                staleTime: 1000 * 60 * 5,
                gcTime: 1000 * 60 * 20,
            },
            {
                queryKey: ['challenge-stats', customId],
                queryFn: () => fetchOverviewStatsDetail(customId),
                staleTime: 1000 * 60 * 5,
                gcTime: 1000 * 60 * 20,
            },
            {
                queryKey: ['challenge-logs', customId],
                queryFn: () => fetchChallengeLogs(customId),
                staleTime: 1000 * 60 * 5,
                gcTime: 1000 * 60 * 20,
            }
        ]
    });

    const challenge = challengeQuery.data;
    const statistic = statsQuery.data;

    const isLoading = challengeQuery.isLoading || statsQuery.isLoading;
    const isError = challengeQuery.isError || statsQuery.isError;
    const errorMsg = challengeQuery.error?.message || statsQuery.error?.message;

    const reloadChallenges = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ['challenge', customId] });
        queryClient.invalidateQueries({ queryKey: ['challenge-stats', customId] });
    }, [customId]);


    if (isError) return <div>Error: {errorMsg}</div>;
    return <ChallengeDetail challenge={challenge} reloadChallenges={reloadChallenges} statistic={statistic} loading={isLoading} />;
}

export default React.memo(ChallengeDetailPage);
// CHALLENGES
export async function fetchChallenges() {
    const res = await fetch('/api/challenge/read', { credentials: 'include' });
    if (!res.ok) throw new Error('Failed to fetch challenges');
    const json = await res.json();
    return json.challenges; 
}

export async function fetchOverviewStats() {
    const res = await fetch('/api/challenge/statistic', { credentials: 'include' });
    if (!res.ok) throw new Error('Failed to fetch overview');
    return res.json();
}

// LOGS



// PROFILE

// CHALLENGE PUBLIC
export async function fetchChallengePublic(customId) {
    const res = await fetch(`/api/public/challenge/${customId}`, { 
        headers: { 'Content-Type': 'application/json'}
    });
    
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch challenge');
    }
    
    const json = await res.json();
    return json.data;
}

export async function fetchStatsChallengePublic(customId) {
    const res = await fetch(`/api/public/challenge/${customId}/statistic`, { 
        headers: { 'Content-Type': 'application/json'}
    });
    
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch challenge statistic');
    }
    
    const json = await res.json();
    return json.statistic;
}
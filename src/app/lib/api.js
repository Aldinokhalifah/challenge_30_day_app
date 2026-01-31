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

// CHALLENGE HANDGLE TOGGLE PUBLIC
export async function toggleChallengePublic(customId, isPublic) {
    const res = await fetch(`/api/challenge/${customId}/toggle-public`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublic }),
    });
    
    const data = await res.json();
    
    if (!res.ok) {
        throw new Error(data.message || "Failed to update visibility");
    }
    
    return data;
}

// CHALLENGES DETAIL
export async function fetchChallengeDetail(customId) {
    const res = await fetch(`/api/challenge/${customId}`, {credentials: 'include'});
    if (!res.ok) throw new Error('Failed to fetch challenge');
    const json = await res.json();
    return json.challenge;
}

export async function fetchOverviewStatsDetail(customId) {
    const res = await fetch(`/api/challenge/${customId}/statistic`, {credentials: 'include'});
    if (!res.ok) throw new Error('Failed to fetch overview');
    const json = await res.json();
    return json.statistic;
}

// LOGS
export async function fetchChallengeLogs(customId) {
    const res = await fetch(`/api/challenge/${customId}/logs`, { 
        credentials: 'include' 
    });
    if (!res.ok) throw new Error('Failed to fetch logs');
    return res.json(); // Mengembalikan { logs, nextDayToFill, canFillToday, filledDayToday }
}

export async function updateChallengeLog(customId, day, { status, note }) {
    const res = await fetch(`/api/challenge/${customId}/logs/${day}`, {
        method: "PUT",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status, note }),
    });
    
    const data = await res.json();
    
    if (!res.ok) {
        throw new Error(data.message || "Failed to update log");
    }
    
    return data;
}

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
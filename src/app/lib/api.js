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
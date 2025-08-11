export function checkInactivity(maxInactivity = 30 * 60 * 1000) { // default: 30 menit
    const lastActivity = localStorage.getItem("lastActivity");
    const now = Date.now();

    if (!lastActivity) {
        return true; 
    }

    if(lastActivity && now - lastActivity > maxInactivity) {
        localStorage.removeItem("token");
        localStorage.removeItem("lastActivity");
        return true;
    }

    return false;
}
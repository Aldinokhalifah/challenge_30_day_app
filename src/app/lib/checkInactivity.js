export function checkInactivity(maxInactivity = 30 * 60 * 1000) {
    const lastActivity = localStorage.getItem("lastActivity");
    const now = Date.now();

    if (!lastActivity) {
        localStorage.removeItem("token"); 
        return true;
    }

    const inactiveTime = now - parseInt(lastActivity); // Pastikan konversi ke number
    if(inactiveTime > maxInactivity) {
        localStorage.removeItem("token");
        localStorage.removeItem("lastActivity");
        return true;
    }

    return false;
}
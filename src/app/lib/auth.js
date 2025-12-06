import jwt from "jsonwebtoken";

export async function verifyToken(req) {
    const token = req.cookies.get("token")?.value;
    if (!token) {
        return null;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.id; // atau return decoded kalau mau lebih lengkap
    } catch (err) {
        console.error("Token verification error:", err.message);
        return null;
    }
}
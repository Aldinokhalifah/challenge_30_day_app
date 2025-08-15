import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
    throw new Error("❌ MONGODB_URL belum diset di .env");
}

// Gunakan global agar koneksi tidak dibuat ulang di serverless
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn; // pakai koneksi lama
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGODB_URL, {
                dbName: "challenge30days",
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then((mongoose) => {
                console.log("✅ Terhubung ke MongoDB");
                return mongoose;
            })
            .catch((err) => {
                console.error("❌ Gagal konek MongoDB:", err.message);
                throw err;
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

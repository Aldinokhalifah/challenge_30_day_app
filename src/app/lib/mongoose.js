import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
    throw new Error('❌ MONGODB_URL belum diset di .env');
}

let isConnected = false;

export async function connectToDatabase() {
    if (isConnected) return;

    try {
        await mongoose.connect(MONGODB_URL, {
        dbName: 'challenge30days',
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });

        isConnected = true;
        console.log("✅ Terhubung ke MongoDB");
    } catch (error) {
        console.error("❌ Gagal konek MongoDB:", error.message);
        throw error;
    }
}

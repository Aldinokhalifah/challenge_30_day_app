import { NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/auth";
import Challenge from "../../../../../../../models/Challenge";
import User from "../../../../../../../models/User";
import { toZonedTime } from "date-fns-tz";
import { format } from "date-fns";

export async function PUT(req, {params}) {
    const userId = await verifyToken(req);
    const { customId, days } = await params;
    const { note, status } = await req.json();

    if(!userId) {
        return NextResponse.json(
            {message: 'Unauthorized'},
            {status: 401}
        )
    }

    // Ambil timezone user
    const user = await User.findById(userId);
    const userTimezone = user?.timezone || "UTC";

    const now = new Date();
    const zonedNow = toZonedTime(now, userTimezone);
    const todayKey = format(zonedNow, "yyyy-MM-dd");

    const dayNumber = parseInt(days); 
    const challengeId = parseInt(customId);

    if(!note || note.trim() === "") {
        return NextResponse.json(
            {message: `Note must be filled in`},
            {status: 400}
        )
    }

    const allowedStatus = ["completed", "missed"];
    if (status && !allowedStatus.includes(status)) {
        return NextResponse.json(
            { message: "Invalid status value" },
            { status: 400 }
        );
    }

    const challenge = await Challenge.findOne({customId: challengeId, userId});

    if(!challenge) {
        return NextResponse.json(
            {message: 'Challenge not found'},
            {status: 404}
        )
    }

    // Cari log yang akan diupdate
    const logExists = challenge.logs.find(log => log.day === dayNumber);
    
    if(!logExists) {
        return NextResponse.json(
            {message: `Log day-${dayNumber} not found`},
            {status: 404}
        )
    }

    // VALIDASI BERDASARKAN KONDISI

    // 1. Jika log sudah terisi (completed/missed) dan user coba ubah status
    if(logExists.status !== 'pending' && status && status !== logExists.status) {
        return NextResponse.json(
            { message: "Logs that have been filled cannot change status"},
            {status: 400}
        );
    }

    // 2. Jika log masih pending DAN user mau ubah status (mengisi log)
    //    -> cek apakah sudah isi log hari ini
    const isFillingNewLog = logExists.status === 'pending' && status;
    
    if(isFillingNewLog && challenge.lastFilled?.dateISO === todayKey) {
        return NextResponse.json(
            { 
                message: `You have already filled log today (day ${challenge.lastFilled.day}). You can only fill one log per day.`,
                alreadyFilledDay: challenge.lastFilled.day
            },
            { status: 400 }
        );
    }

    // 3. Jika hanya update note (tanpa ubah status) -> SELALU BOLEH
    //    Tidak perlu validasi tambahan

    // Prepare update payload
    const updatePayload = {
        "logs.$.note": note
    };

    // Jika status pending dan ada status baru, update status dan filledAt
    if (logExists.status === "pending" && status) {
        updatePayload["logs.$.status"] = status;
        updatePayload["logs.$.filledAt"] = zonedNow;
        
        // UPDATE lastFilled - INI YANG PENTING!
        updatePayload["lastFilled.day"] = dayNumber;
        updatePayload["lastFilled.dateISO"] = todayKey;
    }

    // Update log
    const result = await Challenge.findOneAndUpdate(
        { customId: challengeId, userId, "logs.day": dayNumber },
        { $set: updatePayload },
        { new: true } // Return updated document
    );

    if (!result) {
        return NextResponse.json(
            { message: "Failed to update log" },
            { status: 500 }
        );
    }

    // Ambil log yang sudah diupdate
    const updatedLog = result.logs.find(log => log.day === dayNumber);

    // Tentukan apakah user bisa isi log lagi hari ini
    const canFillAgainToday = result.lastFilled?.dateISO !== todayKey;

    return NextResponse.json({
        message: "Log successfully updated",
        log: JSON.parse(JSON.stringify(updatedLog)),
        canFillAgainToday: canFillAgainToday,
        action: isFillingNewLog ? "status_updated" : "note_updated"
    }, { status: 200 });
}
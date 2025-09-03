import Challenge from '../../../../../models/Challenge';
import { NextResponse } from 'next/server';
import { verifyToken } from '../../../lib/auth';

export async function POST(req) {
    const userId = await verifyToken(req);
    const body = await req.json();

    if(!userId) {
        return NextResponse.json(
            { message: 'Unauthorized'},
            {status: 401}
        );
    }

    const { title, description, startDate } = body;
    if(!title || !description || !startDate) {
        return NextResponse.json(
            {message: 'Semua field harus diisi'},
            {status: 400}
        );
    }

    const logs = Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        note: '',
        status: 'pending',
        date: null
    }));

    const lastChallenge = await Challenge.findOne({ customId: { $exists: true } }).sort({ customId: -1 });
    const customId = lastChallenge ? lastChallenge.customId + 1 : 1;



    const challenge = new Challenge({
        userId,
        customId,
        title,
        description,
        startDate: new Date(startDate),
        createdAt: new Date(),
        logs,
        isPublic: false,
    });

    await challenge.save();

    return NextResponse.json(
        { message: "Challenge created", 
            challenge: {
                id: challenge._id,
                customIdd: challenge.customId,
                title: challenge.title,
                startDate: challenge.startDate
            }
        },
        { status: 201 }
    );
}
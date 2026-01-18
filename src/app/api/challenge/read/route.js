import Challenge from '../../../../../models/Challenge';
import { NextResponse } from 'next/server';
import { verifyToken } from '../../../lib/auth';

export async function GET(req) {
    const userId = await verifyToken(req);

    if(!userId) {
        return NextResponse.json(
            { message: 'Unauthorized'},
            {status: 401}
        );
    }

    const challenges = await  Challenge.find({ userId }).sort({ createdAt: 1 });

    const challengesResponse = challenges.map(challenge => {
        const completedDays = challenge.logs.filter(log => log.status === 'completed').length;
        const progress = completedDays / 30;
        const onGoingDays = challenge.logs.filter(log => log.status !== 'pending').length;

        return {
            id: challenge._id,
            customId: challenge.customId,
            title: challenge.title,
            description: challenge.description,
            startDate: challenge.startDate,
            createdAt: challenge.createdAt,
            progress,
            completedDays,
            onGoingDays,
            isPublic: challenge.isPublic,
        };
    });

    return NextResponse.json({
        message: "List challenge berhasil diambil",
        challenges: challengesResponse
    });
}
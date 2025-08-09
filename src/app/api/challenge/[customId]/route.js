import Challenge from '../../../../../models/Challenge';
import { NextResponse } from 'next/server';
import { verifyToken } from '../../../lib/auth';
import { connectToDatabase } from '@/app/lib/mongoose';

export async function GET(req, {params}) {
    const { customId } = await params;
    const challengeId = customId;
    await connectToDatabase();
    const userId = await verifyToken(req);

    if(!userId) {
        return NextResponse.json(
            {message: 'Unauthorized'},
            {status: 401}
        )
    }

    const challenge = await Challenge.findOne({
        customId: challengeId,
        userId: userId
    })

    if(challenge) {
        return NextResponse.json(
            {message: 'Challenge Ditemukan',
                challenge
            }, 
            {status: 200}
        )
    } else {
        return NextResponse.json(
            {message: 'Challenge Tidak Ditemukan'},
            {status: 404}
        )
    }
    
}
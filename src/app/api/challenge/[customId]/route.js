import Challenge from '../../../../../models/Challenge';
import { NextResponse } from 'next/server';
import { verifyToken } from '../../../lib/auth';

export async function GET(req, { params }) {
    try {
        const { customId } = await params;
        const userId = await verifyToken(req);

        if (!userId) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Gunakan .lean() karena kita hanya menampilkan detail ke UI
        const challenge = await Challenge.findOne({
            customId: customId,
            userId: userId
        }).lean();

        if (!challenge) {
            return NextResponse.json(
                { message: 'Challenge Tidak Ditemukan' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { 
                message: 'Challenge Ditemukan',
                challenge 
            }, 
            { status: 200 }
        );

    } catch (error) {
        console.error("Error Detail Challenge:", error);
        return NextResponse.json(
            { message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}
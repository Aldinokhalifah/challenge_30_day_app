import { NextResponse } from 'next/server';

export async function POST(req) {
    const response = NextResponse.json({
        message: 'Logout successful'
    });

    // Hapus token cookie
    response.cookies.delete('token');
    
    // Hapus lastActivity cookie
    response.cookies.delete('lastActivity');

    return response;
}

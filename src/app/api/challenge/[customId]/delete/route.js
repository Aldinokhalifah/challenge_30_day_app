import { verifyToken } from "@/app/lib/auth";
import { NextResponse } from "next/server";
import Challenge from "../../../../../../models/Challenge";

export async function DELETE(req,{params}) {
    const userId = await verifyToken(req);
    const { customId } = await params;

    if(!userId) {
        return NextResponse.json(
            {message: 'Unauthorized'},
            {status: 401}
        )
    }

    const challenge = await Challenge.findOne( { customId: customId, userId });

    if(!challenge) {
        return NextResponse.json(
            {message: 'Challenge tidak ditemukan'},
            {status: 404}
        )
    }

    await challenge.deleteOne({customId, userId});

    return NextResponse.json(
        { message: "Challenge berhasil dihapus" }, 
        { status: 200 }
    );
}
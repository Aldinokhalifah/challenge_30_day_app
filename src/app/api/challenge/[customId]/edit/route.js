import { verifyToken } from "@/app/lib/auth";
import { connectToDatabase } from "@/app/lib/mongoose";
import { NextResponse } from "next/server";
import Challenge from "../../../../../../models/Challenge";

export async function PUT(req,{params}) {
    await connectToDatabase();

    const userId = await verifyToken(req);
    const customId = parseInt(params.customId);

    if(!userId) {
        return NextResponse.json(
            {message: 'Unauthorized'},
            {status: 401}
        )
    }

    const body = await req.json();

    const { title, description, startDate } = body;

    const challenge = await Challenge.findOne( { customId: customId, userId });

    if(!challenge) {
        return NextResponse.json(
            {message: 'Challenge tidak ditemukan'},
            {status: 404}
        )
    }

    challenge.title = title;
    challenge.description = description;
    challenge.startDate = startDate;

    const updatedChallenge = await challenge.save();


    return NextResponse.json(
        {message: 'Challenge berhasil diupdate',
            updated: updatedChallenge
        },
        {status: 200}
    )
}
import { connectToDatabase } from "@/app/lib/mongoose";
import User from "../../../../../models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectToDatabase();
    const JWT_SECRET = process.env.JWT_SECRET;
    
    try {
        const body = await req.json()
        const { email, password } = body;

        const findUser = await User.findOne({email});
        if(!findUser) {
            return NextResponse.json(
                { message: 'User tidak ditemukan' },
                { status: 404 }
            );
        }

        const isMatch = await findUser.matchPassword(password);
        if (!isMatch) {
            return NextResponse.json(
                { message: 'Wrong Password' },
                { status: 401 }
            );
        }

        const token = jwt.sign({ id: findUser._id}, JWT_SECRET, { expiresIn: '1d'});

        return NextResponse.json({
            message: 'Login Succeed',
            token,
            userData: {
                id: findUser.customId,
                name: findUser.name,
                email: findUser.email,
            }
        }, { status: 200 });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { 
                message: 'Login Failed',
                error: error.message
            },
            { status: 500 }
        );
    }
}
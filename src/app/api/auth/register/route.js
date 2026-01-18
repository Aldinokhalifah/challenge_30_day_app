import { connectToDatabase } from "@/app/lib/mongoose";
import User from "../../../../../models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectToDatabase();
    
    try {
        const body = await req.json();
        const { name, email, password } = body;
        
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return NextResponse.json(
                { message: 'Account Registered!'},
                {status: 400}
            );
        }

        const lastUser = await User.findOne().sort({customId: -1});
        const customId = lastUser ? lastUser.customId + 1 : 1;
        const timestamps = new Date().toISOString();

         // Validasi input
        if (!name || !email || !password) {
            return NextResponse.json(
                { message: 'Fill Every Fields' },
                { status: 400 }
            );
        }

        // Validasi email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { message: 'Email Format Not Valid' },
                { status: 400 }
            );
        }

        const newUser = new User({
            customId,
            name,
            email,
            password,
            timestamps
        })

        await newUser.save();

        return NextResponse.json({ 
            message: "Registration Succeed", 
            data: {
                id: newUser.customId,
                name: newUser.name,
                email: newUser.email,
                timestamps: newUser.createdAt 
            }
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({
            message: 'Registration Failed',
            error: error.message
        }, { status: 500 });
    }
}
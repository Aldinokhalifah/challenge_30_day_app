import { connectToDatabase } from "@/app/lib/mongoose";
import User from "../../../../../models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectToDatabase();
    const JWT_SECRET = process.env.JWT_SECRET;

    try {
        const { email, password, timezone } = await req.json();

        const findUser = await User.findOne({email});
        if(!findUser) {
        return NextResponse.json(
            { message: 'User Not Found' },
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

        if(timezone && findUser.timezone !== timezone) {
            findUser.timezone = timezone;
            await findUser.save();
        }

        const token = jwt.sign({ id: findUser._id}, JWT_SECRET, { expiresIn: '1d'});

        const res = NextResponse.json({
        message: "Login Succeed",
        userData: {
            id: findUser.customId,
            name: findUser.name,
            email: findUser.email,
            timezone: findUser.timezone
        }
        });

        res.cookies.set("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24
        });

        return res;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
        { message: 'Login Failed', error: error.message },
        { status: 500 }
        );
    }
}

import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB()
    } catch (error) {
        return NextResponse.json({ error: "مشکلی در برقراری با سرور پیش آمده" })
    }

    const { email, password, rePassword } = await req.json()


    if (!email || !password || password !== rePassword) {
        return NextResponse.json({ error: "اطلاعات کامل نیست" })
    }

    const user = await User.findOne({ email })

    if (user) {
        return NextResponse.json({ error: "قبلا این ایمیل ثبت سده است" })
    }

    const hashedPassword = await hashPassword(password)

    const newUser = await User.create({ email, password: hashedPassword })

    return NextResponse.json({ message: "ثبت نام با موفقیت انجام شد" })

}
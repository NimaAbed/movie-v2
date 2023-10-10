import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import moment from "moment";


export async function POST(req) {
    try {
        await connectDB()
    } catch (error) {
        return NextResponse.json({ error: "مشکلی در برقراری با سرور پیش آمده" })
    }
    const session = await getServerSession(req)
    const data = await req.json()

    if (!session) {
        return NextResponse.json({ error: "لطفا وارد حساب خود شوید" })
    }

    if (!data) {
        return NextResponse.json({ error: "مشکلی پیش آمده بعدا امتحان کن" })
    }

    const user = await User.findOne({ email: session.user.email })

    if (!user) {
        return NextResponse.json({ error: "کاربر یافت نشد" })
    }

    const haveAcc = moment().isBefore(user.haveAcc)

    if (haveAcc) {
        const date = new Date(user.haveAcc)
        date.setDate(date.getDate() + data.time + 1)
        user.haveAcc = date
    } else {
        const date = new Date()
        date.setDate(date.getDate() + data.time + 1)
        user.haveAcc = date
    }

    await user.save()


    return NextResponse.json({ message: "اشتراک با موفقیت خریداری شد" })

}
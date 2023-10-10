import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        await connectDB()
    } catch (error) {
        return NextResponse.json({ error: "مشکلی در برقراری با سرور پیش آمده است" })
    }

    const data = await req.json()
    const session = await getServerSession(req)

    if (!session) {
        return NextResponse.json({ error: "برای ذخیره فیلم باید وارد حساب خود شوید" })
    }

    const user = await User.findOne({ email: session.user.email })

    if (!user) {
        NextResponse.json({ error: "کاربر با این ایمیل یافت نشد" })
    }

    const movie = user.movieList.find(item => item.slug === data.slug)

    console.log(movie)

    let message = ""

    if (!movie) {
        user.movieList.push({ slug: data.slug, status: data.status })
        message = "به لیست فیلم ها اضافه شد"
    } else if (movie) {
        const index = user.movieList.findIndex(item => item.slug === data.slug)
        user.movieList.splice(index, 1)
        message = "از لیست فیلم ها حذف شد"
    }

    await user.save()

    console.log(user.movieList)


    return NextResponse.json({ message })
}

export async function PATCH(req) {
    try {
        await connectDB()
    } catch (error) {
        return NextResponse.json({ errror: "مشکلی در برقراری با سرور پیش آمده بعدا امتحان کنید" })
    }

    const session = await getServerSession(req)
    const { slug, status } = await req.json()

    if (!session) {
        return NextResponse.json({ error: "باید وارد حساب خود شوید" })
    }

    if (!slug || !status) {
        return NextResponse.json({ error: "اطلاعات کامل نیست" })
    }

    const user = await User.findOne({ email: session.user.email })

    if (!user) {
        return NextResponse.json({ error: "کاربر یافت نشد" })
    }

    const movie = user.movieList.find(item => item.slug === slug)

    if (!movie) {
        return NextResponse.json({ error: "فیلم در لیست یافت نشد" })
    }

    movie.status = status

    user.markModified("movieList")

    await user.save()

    console.log(user)

    return NextResponse.json({ message: "با موفقیت آپدیت شد" })

}
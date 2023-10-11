import { MOVIES_LIST } from "@/GraphQL/queries"
import User from "@/models/User"
import connectDB from "@/utils/connectDB"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"


export async function POST(req) {
    try {
        await connectDB()
    } catch (error) {
        return NextResponse.json({ error: "مشکلی در برقراری با سرور پیش آمده" })
    }

    const session = await getServerSession(req)
    const value = await req.json()

    if (!session) {
        return NextResponse.json({ error: "باید وارد حساب خود شوید" })
    }

    const user = await User.findOne({ email: session.user.email })

    if (!user) {
        return NextResponse.json({ error: "ایمیل یافت نشد" })
    }

    const moviesFiltred = user.movieList.filter(item => {
        if (value === item.status) {
            return item.slug
        }
    })

    const movies = moviesFiltred.map(item => item.slug)


    const { data } = await fetch(process.env.GRAPH_URI, {
        method: "POST",
        body: JSON.stringify({
            query: MOVIES_LIST,
            variables: { array: movies }
        }),
        headers: { 'Content-Type': 'application/json' },
        cache: "no-store"
    }).then(res => res.json())

    if (!data) {
        return NextResponse.json({ error: "مشکلی پیش آمده" })
    }

    return NextResponse.json(data.movies)

}
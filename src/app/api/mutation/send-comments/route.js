import { SEND_COMMENT } from "@/GraphQL/mutations"
import { NextResponse } from "next/server"


export async function POST(req) {

    const data = await req.json()
    const { email, text } = data

    if (!email) {
        return NextResponse.json({ error: "کاربر یافت نشد" })
    }

    if (!text) {
        return NextResponse.json({ error: "لطفا متن کامنت را پر کنید" })
    }


    const res = await fetch(process.env.GRAPH_URI, {
        method: "POST",
        body: JSON.stringify({
            query: SEND_COMMENT,
            variables: { ...data }
        }),
        headers: { 'Content-Type': 'application/json' }
    })

    const result = await res.json()


    if (!result.data.createComment.id) {
        return NextResponse.json({ error: "مشکلی پیش امده دوباره امتحان کن" })
    }

    return NextResponse.json({ message: "کامنت ارسال و در حال تایید می باشد" })

}
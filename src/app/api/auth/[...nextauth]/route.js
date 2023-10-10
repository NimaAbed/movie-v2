import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import nextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const authOptions = {
    session: { strategy: "jwt" },
    providers: [Credentials({
        async authorize(credentials) {
            const { email, password } = credentials
            try {
                await connectDB()
            } catch (error) {
                throw new Error("مشکلی در برقراری در سرور پیش آمده است")
            }

            if (!email || !password) {
                throw new Error("اطلاعات کامل نیست")
            }

            const user = await User.findOne({ email })

            if (!user) {
                throw new Error("کاربر یافت نشد")
            }

            const isValid = await verifyPassword(password, user.password)

            if (!isValid) {
                throw new Error("ایمیل یا رمز اشتباه است")
            }

            return { email }

        }
    })]
}

const handler = nextAuth(authOptions)


export { handler as GET, handler as POST, authOptions }
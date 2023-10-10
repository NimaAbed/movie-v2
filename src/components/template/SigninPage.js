"use client"

import styles from "@/template/SigninPage.module.css"
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SigninPage = () => {
    const router = useRouter()
    const [userValue, setUserValue] = useState({
        email: "",
        password: "",
    })

    const changeHandler = (evt) => {
        const { name, value } = evt.target
        setUserValue({ ...userValue, [name]: value })
    }

    const submitHandler = async () => {
        const res = await signIn("credentials", {
            ...userValue,
            redirect: false
        })
        if (res.error) {
            toast.error(res.error)
        } else {
            router.replace("/")
            router.refresh()
        }
    }

    return (
        <>
            <div className={styles.container}>
                <h2>فرم ورود</h2>
                <div>
                    <label htmlFor="email">ایمیل :</label>
                    <input type="text" name="email" id="email" value={userValue.email} onChange={changeHandler} placeholder="نام کاربری" />
                </div>
                <div>
                    <label htmlFor="password">رمز عبور :</label>
                    <input type="password" name="password" id="password" value={userValue.password} onChange={changeHandler} placeholder="رمز عبور" />
                </div>
                <button onClick={submitHandler}>ورود</button>
            </div>
            <div className={styles.haveOne}>حساب کاربری ندارید ؟ <Link href="/signup">ثبت نام</Link></div>
            <Toaster />
        </>
    );
};

export default SigninPage;
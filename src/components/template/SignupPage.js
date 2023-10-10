"use client"

import styles from "@/template/SignupPage.module.css"
import { TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";


const SignupPage = () => {
    const router = useRouter()
    const [userValue, setUserValue] = useState({
        email: "",
        password: "",
        rePassword: ""
    })

    const changeHandler = (evt) => {
        const { name, value } = evt.target
        setUserValue({ ...userValue, [name]: value })
    }

    const submitHandler = async () => {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify(userValue),
            headers: { 'Content-Type': 'application/json' }
        })
        const data = await res.json()
        console.log(data)
        if (data.error) {
            toast.error(data.error)
        } else {
            toast.success(data.message)
            router.push("/signin")
        }
    }

    return (
        <>
            <div className={styles.container}>
                <h2>فرم ثبت نام</h2>
                <div>
                    <label htmlFor="email">ایمیل :</label>
                    <input type="text" name="email" id="email" value={userValue.email} onChange={changeHandler} placeholder="نام کاربری" />
                </div>
                <div>
                    <label htmlFor="password">رمز عبور :</label>
                    <input type="password" name="password" id="password" value={userValue.password} onChange={changeHandler} placeholder="رمز عبور" />
                </div>
                <div>
                    <label htmlFor="rePassword">تکرار رمز عبور :</label>
                    <input type="password" name="rePassword" id="rePassword" value={userValue.rePassword} onChange={changeHandler} placeholder="تکرار رمز عبور" />
                </div>
                <button onClick={submitHandler}>ثبت نام</button>
            </div>
            <div className={styles.haveOne}>حساب کاربری دارید ؟ <Link href="/signin">ورود</Link></div>
            <Toaster />
        </>
    );
};

export default SignupPage;
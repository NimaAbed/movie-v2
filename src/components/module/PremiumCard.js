"use client"

import styles from "@/module/PremiumCard.module.css"
import { numberWithCommas } from "@/utils/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { MdOutlineWorkspacePremium } from "react-icons/md"

const PremiumCard = ({ time = 0, price = 0 }) => {

    const router = useRouter()

    const submitHandler = async () => {
        const res = await fetch("/api/buy", {
            method: "POST",
            body: JSON.stringify({ time }),
            headers: { 'Content-Type': 'application/json' },
            cache: "no-store"
        })
        const data = await res.json()
        console.log(data)
        if (data.error) {
            toast.error(data.error)
        } else {
            toast.success(data.message)
            router.refresh()
        }
    }

    return (
        <div className={styles.container}>
            <MdOutlineWorkspacePremium />
            <div className={styles.header}>
                <div className={styles.time}><span>{time}</span> روزه</div>
                <div className={styles.price}><span>{numberWithCommas(price)}</span> تومان</div>
            </div>
            <button onClick={submitHandler}>خرید</button>
        </div>
    );
};

export default PremiumCard;
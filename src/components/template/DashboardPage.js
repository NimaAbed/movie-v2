import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";
import styles from "@/template/DashboardPage.module.css"
import connectDB from "@/utils/connectDB";
import moment from "moment/moment";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";


const DashboardPage = async () => {
    await connectDB()
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/signin")
    }

    const user = await User.findOne({ email: session.user.email })

    if (!user) {
        redirect("/signin")
    }

    const userAcc = moment().isBefore(user.haveAcc)

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>👋خوش آمدید</h3>
                <p>تاریخ عضویت :<span>{user.createdAt.toLocaleDateString("fa-IR")}</span></p>
                <p>اشتراک:{user.role === "ADMIN" ? <span>نامحدود</span> : userAcc ? <span>{moment(user.haveAcc).diff(moment(), "days")} روز باقیمانده</span> : <span><Link href="/dashboard/premium">ندارید</Link></span>}</p>
            </div>
            {/* <div className={styles.main}>
                
            </div> */}
        </div>
    );
};

export default DashboardPage;
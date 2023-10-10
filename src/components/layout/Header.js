import Link from 'next/link';
import styles from '@/layout/Header.module.css'
import { Container, Grid } from "@mui/material"
import MenuCategory from '../module/MenuCategory';
import { AiOutlineLogin } from "react-icons/ai"
import { LuLayoutDashboard } from "react-icons/lu"
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const Header = async () => {
    const session = await getServerSession(authOptions)
    return (
        <Container maxWidth="lg">
            <div className={styles.header}>
                <div className={styles.path}>
                    <ul>
                        <li><Link href="/">صفحه اصلی</Link></li>
                        <MenuCategory title="دسته بندی" kid={[{ anime: "انیمه" }, { series: "سریال" }, { movie: "فیلم" }]} />
                    </ul>
                </div>
                <div className={styles.profile}>
                    {session ? (<Link href="/dashboard"><button><LuLayoutDashboard /></button></Link>)
                        : (<Link href="/signin"><button><AiOutlineLogin /> ورود</button></Link>)}
                </div>
            </div>
        </Container>
    );
};

export default Header;
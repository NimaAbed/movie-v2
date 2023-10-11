"use client"

import styles from "@/module/DashboardSideBar.module.css"
import { Container, Grid } from "@mui/material";
import { IoFolderOpenOutline } from "react-icons/io5"
import { CgProfile } from "react-icons/cg"
import { BiLogOut } from "react-icons/bi"
import { MdWorkspacePremium } from "react-icons/md"
import { BiCameraMovie } from "react-icons/bi"
import { MdOutlineMovieFilter } from "react-icons/md"
import { PiUserGear } from "react-icons/pi"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";


const DashboardSideBar = ({ children, email }) => {

    const [active, setActive] = useState(null)
    const ulRef = useRef(null)
    const path = usePathname()
    const route = useRouter()
    // const ulHandler = (evt) => {
    //     const { tagName } = evt.target
    //     if (tagName === "LI") {
    //         console.log(evt.target)
    //         for (let i of evt.currentTarget.children) {
    //             i.className = null
    //             console.log(i)
    //         }
    //         evt.target.className = styles.active
    //     }
    // }

    useEffect(() => {
        const res = path.split("/")[path.split("/").length - 1]
        setActive(res)
        for (let i of ulRef.current.children) {
            i.className = null
            if (i.id === res) {
                i.className = styles.active
            }
        }
    }, [path])


    return (
        <Container>
            <div className={styles.container}>
                <Grid container>
                    <Grid item xs={12} sm={3} md={3} className={styles.sideBar}>
                        <div className={styles.profile}>
                            <CgProfile />
                            {email}
                        </div>
                        <ul ref={ulRef}>
                            <li id="dashboard"><Link href="/dashboard"><IoFolderOpenOutline /> داشبورد</Link></li>
                            <li id="premium"><Link href="/dashboard/premium"><MdWorkspacePremium /> خرید اشتراک</Link></li>
                            <li id="movie-list"><Link href="/dashboard/movie-list"><BiCameraMovie /> فیلم لیست</Link></li>
                            {/* <li ><PiUserGear /> ویرایش پروفایل</li> */}
                            {/* <li id="add-movie"><Link href="/dashboard/add-movie"><MdOutlineMovieFilter /> ثبت فیلم</Link></li> */}
                            <li onClick={() => signOut({ redirect: false })}><BiLogOut /> خروج</li>

                        </ul>
                    </Grid>
                    <Grid item xs={12} sm={9} md={9} className={styles.main}>
                        {children}
                    </Grid>
                </Grid>

            </div>
        </Container>
    );
};

export default DashboardSideBar;
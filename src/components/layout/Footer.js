import React from 'react';
import styles from "@/layout/Footer.module.css"
import { Container, Grid } from '@mui/material';
import Link from 'next/link';

const Footer = () => {
    return (
        <Container maxWidth="lg">
            <div className={styles.container}>
                <Grid container>
                    <Grid item xs={12} sm={8} lg={6} >
                        <div className={styles.main}>
                            <h3 className={styles.title}>فیلم دانلودر</h3>
                            <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</p>
                        </div>
                    </Grid>
                    <Grid item xs={4} sm={2} lg={2}>
                        <div className={styles.link}>
                            <ul>
                                <li>لینک های مهم</li>
                                <li><Link href="/">صفحه اصلی</Link></li>
                                <li><Link href="/dashboard">داشبورد</Link></li>
                                <li><Link href="/dashboard/premium">خرید اشتراک</Link></li>
                            </ul>
                        </div>
                    </Grid>
                    <Grid item xs={4} sx={{ display: { xs: "none", lg: "flex" } }} lg={2}>
                        <div className={styles.link}>
                            <ul>
                                <li>دسته بندی ها</li>
                                <li><Link href="/movies/anime">انیمه</Link></li>
                                <li><Link href="/movies/movie">فیلم</Link></li>
                                <li><Link href="/movies/series">سریال</Link></li>
                            </ul>
                        </div>
                    </Grid>
                    <Grid item xs={4} sm={2} lg={2}>
                        <div className={styles.link}>
                            <ul>
                                <li>دسترسی سریع</li>
                                <li><Link href="/dashboard/movie-list">فیلم لیست</Link></li>
                                <li><Link href="/dashboard/premium">خرید اشتراک</Link></li>
                            </ul>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Footer;
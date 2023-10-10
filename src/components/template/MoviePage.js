"use client"

import React, { useState } from 'react';
import styles from "@/template/MoviePage.module.css"
import { Container, InputLabel, MenuItem, FormControl, Select, Grid, Box, Tab, Tabs, Typography, Button, Accordion, AccordionSummary, AccordionDetails, TextField, ToggleButton, Avatar } from '@mui/material';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// RTL Input Import
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Box sx={{ position: "relative" }}>{children}</Box>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

const MoviePage = (props) => {
    const { movie } = props.movie
    const { user, haveAcc, comments, onList } = props
    const [value, setValue] = useState(0);
    const [status, setStatus] = useState(onList || "start")
    const [comVAlue, setComValue] = useState({ text: "", spoile: false, email: user?.email || "" })
    const router = useRouter()


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const showHandler = (evt) => {
        const grandParent = evt.target.parentElement.parentElement
        const parent = evt.target.parentElement

        for (let i of grandParent.children) {
            i.style = null
        }
        parent.style = "display:none"

    }

    const sendComment = async () => {

        const { email, text } = comVAlue

        if (!text) {
            toast.error("متن کامنت را وارد کنید")
            return
        }

        if (!email) {
            toast.error("ایمیل یافت نشد دوباره وارد شوید")
            return
        }

        const res = await fetch("/api/mutation/send-comments", {
            method: "POST",
            body: JSON.stringify({ ...comVAlue, haveSpoile: comVAlue.spoile, slug: movie.slug }),
            headers: { 'Content-Type': 'application/json' },
            cache: "no-store"
        })
        const data = await res.json()

        if (data.error) {
            toast.error(data.error)
        } else {
            toast.success(data.message)
        }

    }

    const savedHandler = async () => {
        const res = await fetch("/api/mutation/saved", {
            method: "POST",
            body: JSON.stringify({ slug: movie.slug, status }),
            headers: { 'Content-Type': 'application/json' },
            cache: "no-store"
        })
        const data = await res.json()
        if (data.error) {
            toast.error(data.error)
        } else {
            toast.success(data.message)
            router.refresh()
        }
        console.log(data)
    }

    const statusHandler = async (evt) => {
        setStatus(evt.target.value)
        if (onList) {
            console.log(evt.target.value)
            const res = await fetch("/api/mutation/saved", {
                method: "PATCH",
                body: JSON.stringify({ status: evt.target.value, slug: movie.slug }),
                headers: { 'Content-Type': 'application/json' },
                cache: "no-store"
            })
            const data = await res.json()
            if (data.error) {
                toast.error(data.error)
                router.refresh()
            }
        }
    }

    return (
        <Container maxWidth="lg" className={styles.container}>
            <Grid container columnSpacing={{ lg: 5 }} >
                <Grid item xs={12} >
                    <div className={styles.savedForm}>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <CacheProvider value={cacheRtl}>
                                    <InputLabel id="demo-simple-select-label">وضیت تماشا</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={status}
                                        label="وضیت"
                                        onChange={statusHandler}
                                        size='small'
                                    >
                                        <MenuItem value="start">دارم می بینم</MenuItem>
                                        <MenuItem value="finish">تمام کرده ام</MenuItem>
                                    </Select>
                                </CacheProvider>
                            </FormControl>
                        </Box>
                        <button className={onList ? styles.notSaved : styles.saved} onClick={savedHandler}>{onList ? "حذف از لیست" : "اظافه به لیست"}</button>
                    </div>
                </Grid>
                <Grid item xs={12} md={3} className={styles.sideBar}>
                    <div className={styles.image}>
                        <img src={movie.coverPhoto.url} alt={movie.name} />
                    </div>
                    <div className={styles.about}>
                        <div className={styles.title}>مشخصات</div>
                        <div>اسم {movie.category.name}: <span>{movie.name}</span></div>
                        <div>ژانرها: <span>اکشن,رزمی</span></div>
                    </div>
                </Grid>
                <Grid item xs={12} md={9} className={styles.main} >
                    <div className={styles.about}>
                        <div>خلاصه داستان</div>
                        <span>{movie.about}</span>
                    </div>
                    <Box sx={{ width: "100%", marginTop: 5 }}>
                        <Box sx={{ borderBottom: 1, borderColor: '#00509d' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="دانلود" {...a11yProps(0)} />
                                <Tab label="ارسال کامنت" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>
                            <Grid container spacing={2} sx={!haveAcc ? { filter: "blur(2px)" } : null}>
                                {!movie.seasons.length && !movie.episodes.length ? <div className={styles.notShared}>هنوز <span>منتشر</span> نشده است</div> :
                                    movie.seasons.length ? <Box mt={2} >
                                        {movie.seasons.map(item => (
                                            <Accordion key={item.id}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <Typography variant='p'>{item.season}</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Grid container spacing={2}>
                                                        {item.episodes.map(item => (
                                                            <Grid item xs={4} sm={3} md={2} key={item.id}>
                                                                <Button fullWidth variant='contained' href={haveAcc ? item.media.url : null}>{item.episode}</Button>
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                </AccordionDetails>
                                            </Accordion>
                                        ))}
                                    </Box> : (
                                        movie.episodes.map(item => (
                                            <Grid item xs={4} sm={3} md={2} key={item.id}>
                                                <Button fullWidth variant='contained' href={haveAcc ? item.media.url : null} sx={{ px: 1, mx: "5px" }}>{item.episode}</Button>
                                            </Grid>
                                        ))
                                    )
                                }
                            </Grid>
                            {!user ?
                                <div className={styles.haveAcc}>
                                    <div>برای دانلود باید وارد <span>حساب</span> خود شوید</div>
                                    <Link href="/signin">ورود</Link>
                                </div>
                                : !haveAcc ? <div className={styles.haveAcc}>
                                    <div>برای دانلود باید <span>اشتراک</span> داشته باشید</div>
                                    <Link href="/dashboard/premium">خرید اشتراک</Link>
                                </div> : null
                            }
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <div className={styles.commentContainer}>
                                <h4 className={styles.title}>ارسال کامنت:</h4>
                                <CacheProvider value={cacheRtl}><TextField type='text' value={comVAlue.text} onChange={(evt) => { setComValue({ ...comVAlue, text: evt.target.value }) }} label="متن کامنت" fullWidth multiline minRows={4} variant='outlined' /></CacheProvider>
                                <div className={styles.submit}>
                                    <div>
                                        کامنت دارای اسپویل است :
                                        <ToggleButton
                                            value="check"
                                            selected={comVAlue.spoile}
                                            color='primary'
                                            onChange={() => {
                                                setComValue({ ...comVAlue, spoile: !comVAlue.spoile });
                                            }}
                                        >
                                            <CheckIcon />
                                        </ToggleButton>
                                    </div>
                                    <Button variant='contained' size='small' onClick={sendComment} color='success' >ارسال کامنت</Button>
                                </div>
                            </div>
                        </CustomTabPanel>
                    </Box>
                    <div className={styles.commentForm}>
                        <div className={styles.title}>کامنت ها</div>
                        <div className={styles.containerComment}>
                            {comments.map(item => (
                                <div className={styles.comment} key={item.id} >
                                    <div >
                                        <Avatar sx={{ bgcolor: "#ffc107", marginLeft: 1 }}>{item.email[0]}</Avatar>
                                        {item.email}
                                    </div>
                                    <p style={item.haveSpoile ? { filter: "blur(3px)" } : null}>{item.text}</p>
                                    {item.haveSpoile ? (
                                        <div className={styles.haveSpoile} >
                                            <div>این کامنت دارای <span>اسپویل</span> هست</div>
                                            <Button size='small' sx={{ marginRight: "4px" }} onClick={showHandler} variant='contained'>دیدن</Button>
                                        </div>
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Toaster />
        </Container >
    );
};

export default MoviePage;
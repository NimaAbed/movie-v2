"use client"

import React, { useState } from 'react';
import styles from "@/template/MovieListPage.module.css"
import Cards from '@/module/Cards';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';

const MovieListPage = ({ movies }) => {
    const [alignment, setAlignment] = useState("all");

    console.log(alignment)

    const handleChange = async (event, newAlignment) => {
        if (!newAlignment) return
        setAlignment(newAlignment);
    };

    return (
        <div className={styles.container}>
            <div className={styles.filtred}>
                <ToggleButtonGroup
                    color='error'
                    size='small'
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                    sx={{ direction: "ltr" }}
                >
                    <ToggleButton value="finish">تمام کرده ام</ToggleButton>
                    <ToggleButton value="start">دارم میبینم</ToggleButton>
                    <ToggleButton value="all">همه</ToggleButton>
                </ToggleButtonGroup>
            </div>
            {movies[alignment]?.map((item, index) => (
                <Cards key={index} style={{ marginTop: "7.5px", marginBottom: "7.5px" }} {...item} />
            ))}
            <Toaster />
        </div>
    );
};

export default MovieListPage;
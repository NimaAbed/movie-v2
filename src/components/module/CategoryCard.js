import styles from "@/module/CategoryCard.module.css"
import { Grid } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import Cards from "./Cards";
import { IoChevronBack } from "react-icons/io5";
import { GET_MOVIES } from "@/GraphQL/queries";

const CategoryCard = async ({ title, slug, category }) => {

    const { data } = await fetch(
        process.env.GRAPH_URI,
        {
            method: "POST",
            body: JSON.stringify({
                query: GET_MOVIES(category),
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }
    ).then((res) => res.json());

    return (
        <>
            <Grid item xs={12}>
                <div className={styles.title}>
                    <div>{title}</div>
                    <div><Link href={`/movies/${slug}`}>دیدن همه <IoChevronBack /></Link></div>
                </div>
            </Grid>
            <div className={styles.cardContainer}  >
                {data.category.movies.map(item => (
                    <Cards key={item.id} {...item} />
                ))}
            </div>
        </>
    );
};

export default CategoryCard;
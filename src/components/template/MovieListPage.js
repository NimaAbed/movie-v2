import React from 'react';
import styles from "@/template/MovieListPage.module.css"
import Cards from '@/module/Cards';

const MovieListPage = ({ movies }) => {
    return (
        <div className={styles.container}>
            {movies.map((item, index) => (
                <Cards key={index} style={{ marginTop: "7.5px", marginBottom: "7.5px" }} {...item} />
            ))}
        </div>
    );
};

export default MovieListPage;
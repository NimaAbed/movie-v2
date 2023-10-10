import styles from "@/template/HomePage.module.css"
import { Box, Container, Grid } from "@mui/material";
import Link from "next/link";
import { IoChevronBack } from "react-icons/io5"
import Cards from "../module/Cards";
import CategoryCard from "../module/CategoryCard";


const HomePage = () => {
    return (
        <Container maxWidth="lg">
            <Grid container sx={{ marginTop: 10 }} >
                <CategoryCard title="انیمه" slug="anime" category="anime" />
                <CategoryCard title="فیلم" slug="movie" category="movie" />
                <CategoryCard title="سریال" slug="series" category="series" />
            </Grid>
        </Container>
    );
};

export default HomePage;
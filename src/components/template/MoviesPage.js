import styles from "@/template/MoviesPage.module.css"
import Cards from "../module/Cards";
import { Container, Grid } from "@mui/material";

const MoviesPage = ({ movies }) => {
    return (
        <Container>
            <div className={styles.container}>
                {movies.category.movies.map(item => (
                    // <Grid item xs={6} sm={4} md={3} lg={2}>
                    <Cards {...item} key={item.id} style={{ marginTop: "20px" }} />
                    // </Grid>
                ))}
            </div>
        </Container>
    );
};

export default MoviesPage;
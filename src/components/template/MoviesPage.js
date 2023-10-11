import styles from "@/template/MoviesPage.module.css"
import Cards from "../module/Cards";
import { Container, Grid } from "@mui/material";

const MoviesPage = ({ movies }) => {
    return (
        <Container>
            <div className={styles.container}>
                <Grid container>
                    {movies.category.movies.map(item => (
                        <Grid item xs={6} key={item.id} sm={4} md={3} lg={2} sx={{ marginBottom: "20px" }}>
                            <Cards {...item} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Container>
    );
};

export default MoviesPage;
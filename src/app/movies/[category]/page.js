import { GET_ALL_MOVIES } from '@/GraphQL/queries';
import MoviesPage from '@/components/template/MoviesPage';
import React from 'react';

const page = async ({ params }) => {

    const { data } = await fetch(
        process.env.GRAPH_URI,
        {
            method: "POST",
            body: JSON.stringify({
                query: GET_ALL_MOVIES(params.category),
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }
    ).then((res) => res.json());

    return (
        <MoviesPage movies={data} />
    );
};

export default page;
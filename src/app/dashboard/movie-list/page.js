import { MOVIES_LIST } from '@/GraphQL/queries';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import MovieListPage from '@/components/template/MovieListPage';
import User from '@/models/User';
import connectDB from '@/utils/connectDB';
import { getServerSession } from 'next-auth';
import React from 'react';

const page = async () => {
    await connectDB()

    const session = await getServerSession(authOptions)

    const user = await User.findOne({ email: session.user.email })


    let movies = {}

    for (let i of user.movieList) {
        if (!movies[i.status]) movies[i.status] = []
        movies[i.status].push(i.slug)
    }


    for (let item of Object.keys(movies)) {
        const { data } = await fetch(process.env.GRAPH_URI, {
            method: "POST",
            body: JSON.stringify({
                query: MOVIES_LIST,
                variables: { array: movies[item] }
            }),
            headers: { 'Content-Type': 'application/json' },
            cache: "no-store"
        }).then(res => res.json())
        movies[item] = data.movies
        if (!movies["all"]) movies["all"] = []
        movies["all"].push(...data.movies)
    }

    console.log(movies)

    return (
        <MovieListPage movies={movies} />
    );
};

export default page;
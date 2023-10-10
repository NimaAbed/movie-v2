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

    const movies = user.movieList.map(item => item.slug)

    const { data } = await fetch(process.env.GRAPH_URI, {
        method: "POST",
        body: JSON.stringify({
            query: MOVIES_LIST,
            variables: { array: movies }
        }),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())



    return (
        <MovieListPage movies={data.movies} />
    );
};

export default page;
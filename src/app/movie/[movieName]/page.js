import { SEND_COMMENT } from '@/GraphQL/mutations';
import { GET_COMMENTS, GET_MOVIE } from '@/GraphQL/queries';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import MoviePage from '@/components/template/MoviePage';
import User from '@/models/User';
import { getClient } from '@/utils/client';
import connectDB from '@/utils/connectDB';
import { gql } from '@apollo/client';
import moment from 'moment';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import React from 'react';

const page = async ({ params }) => {
    await connectDB()
    const session = await getServerSession(authOptions)

    const res = await fetch(process.env.GRAPH_URI, {
        method: "POST",
        body: JSON.stringify({
            query: GET_MOVIE(params.movieName),
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    const { data } = await res.json()

    const resComments = await fetch(process.env.GRAPH_URI, {
        method: "POST",
        body: JSON.stringify({
            query: GET_COMMENTS(params.movieName),
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    const { data: { comments } } = await resComments.json()


    if (!data.movie) {
        return notFound()
    }

    const user = await User.findOne({ email: session?.user.email }).select("-password")

    let haveAcc = false


    if (moment(user?.haveAcc).isAfter() || user?.role === "ADMIN") {
        haveAcc = true
    }

    let onList = false
    if (user) {
        const savedMovie = user.movieList.find(item => item.slug === params.movieName)
        if (savedMovie) {
            onList = savedMovie.status
        }
    }



    return (
        <MoviePage comments={comments} onList={onList} movie={data} user={JSON.parse(JSON.stringify(user))} haveAcc={haveAcc} />
    );
};

export default page;
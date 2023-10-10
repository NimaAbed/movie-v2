"use client";

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import {
    NextSSRApolloClient,
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

function makeClient() {
    const httpLink = new HttpLink({
        uri: process.env.GRAPH_URI,
    });

    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        // link:
        //     typeof window === "undefined"
        //         ? ApolloLink.from([
        //             new SSRMultipartLink({
        //                 stripDefer: true,
        //             }),
        //             httpLink,
        //         ])
        //         : httpLink,
        uri: process.env.GRAPH_URI
    });

    // return new ApolloClient({
    //     uri: process.env.GRAPH_URI,
    //     cache: new InMemoryCache(),
    // })
}

// const client = new ApolloClient({
//     uri: 'https://flyby-router-demo.herokuapp.com/',
//     cache: new InMemoryCache(),
// })

export function ApolloProviders({ children }) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
}
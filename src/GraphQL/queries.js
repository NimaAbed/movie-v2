
const GET_MOVIES = (category) => {
  return `{category(where:{slug:"${category}"}){
    movies (orderBy: createdAt_DESC,first:6) {
      name
      coverPhoto{url}
      slug
      about
      
    }
  }}`
}

const GET_ALL_MOVIES = (category) => {
  return `{category(where:{slug:"${category}"}){
    movies (orderBy: createdAt_DESC,first:600) {
      name
      coverPhoto{url}
      slug
      about
      id
    }
  }}`
}

const GET_MOVIE = (movieName) => {
  return `{movie(where:{slug:"${movieName}"}) {
    name,
    about,
    id
    coverPhoto{url},
    slug,
    category{name},
    seasons {
      season
      episodes {
        episode
        media{url}
        endEpisode
        id
      }
    }
    episodes {
      episode
      media{url}
      endEpisode
      id
    }
  }}`
}

const GET_COMMENTS = (slug) => {
  return `{
    comments(where: {movie: {slug: "${slug}"}}, orderBy: createdAt_DESC) {
      text
      email
      haveSpoile
      id
    }
  }`
}

const MOVIES_LIST = `query get($array:[String!]){
  movies(where: {slug_in: $array}) {
    id
    name
    about
    coverPhoto {
      url
    }
  }
}`

export { GET_MOVIES, GET_ALL_MOVIES, GET_MOVIE, GET_COMMENTS, MOVIES_LIST }
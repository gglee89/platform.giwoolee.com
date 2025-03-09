import axios from "axios"
import { useQuery } from "@tanstack/react-query"

interface MovieSearchParams {
    s?: string
    i?: string
    type?: string
    y?: string
    page?: string
}

const fetchMovies = async (params: MovieSearchParams) => {
    const { data } = await axios.get(`${import.meta.env.VITE_OMDB_API_URL}`, {
        params: {
            apikey: import.meta.env.VITE_OMDB_API_KEY,
            ...params,
        },
        headers: {
            "Content-Type": "application/json",
        },
    })
    return data
}

export interface MovieDetail {
    Title: string
    Year: string
    Runtime: string
    Rated: string
    Poster: string
    Ratings: Array<{
        Source: string
        Value: string
    }>
    Plot: string
    Actors: string
    Genre: string
    Director: string
    imdbID: string
}

export const useMovies = (params: MovieSearchParams) => {
    return useQuery({
        queryKey: ["movies", params],
        queryFn: () => fetchMovies(params),
        enabled: !!params.s || !!params.i, // Only fetch if search term or movie ID is provided
    })
}

export const useMovieDetail = (movieId: string | undefined) => {
    return useQuery({
        queryKey: ["movie", movieId],
        queryFn: () => fetchMovies({ i: movieId }),
        enabled: !!movieId,
    })
}

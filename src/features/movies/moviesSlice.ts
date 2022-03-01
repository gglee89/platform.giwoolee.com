import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

// Schema from gotten on from OMDB's API
// by using the search parameter in query
export interface Movie {
    Title: string
    Year: number
    imdbId: string
    type: string
    poster: string
}

// Schema from gotten on from OMDB's API
// by using the ID or Title parameter in query
export interface MovieDetail {
    Title: string
    Year: number
    rated: string | 'PG-13'
    released: Date
    runtime: string
    genre: string       // TODO: Use enum
    director: string
    writer: string
    actors: string
    plot: string
    language: string    // TODO: Use enum
    country: string     // TODO: Use enum
    awards: string
    poster: string
    ratings: { source: string, value: string }[]
    metascore: number
    imdbrating: number
    imdbvotes: number
    imdbid: string
    type: string        // TODO: Use enum
    dvd: Date
    boxOffice: number
    production: string
    website: string
    response: boolean
}

export interface MoviesState {
    loading: boolean
    data: Movie[]
    error?: Error
}

export const fetchMovies = createAsyncThunk<
    Movie[],
    string,
    { rejectValue: Error }
>('movies/fetch', async (searchKey, thunkAPI: any) => {
    try {
        const { data } = await thunkAPI.extra.api.getRequest({ searchKey })
        return await Promise.resolve(data)
    } catch (err) {
        const error = err as Error
        return thunkAPI.rejectWithValue(error)
    }
})

const initialState: MoviesState = {
    loading: false,
    data: []
}
const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        // ...
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(fetchMovies.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export const getMovies = (state: RootState) => state.movies.data

export default moviesSlice.reducer
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

// Schema from gotten on from OMDB's API
// by using the ID or Title parameter in query
export interface MovieDetail {
    Title: string
    Year: number
    Rated: string | 'PG-13'
    Released: Date
    Runtime: string
    Genre: string       // TODO: Use enum
    Director: string
    Writer: string
    Actors: string
    Plot: string
    Language: string    // TODO: Use enum
    Country: string     // TODO: Use enum
    Awards: string
    Poster: string
    Ratings: { Source: string, Value: string }[]
    Metascore: number
    imdbRating: number
    imdbVotes: number
    imdbID: string
    Type: string        // TODO: Use enum
    DVD: Date
    BoxOffice: number
    Production: string
    Website: string
    Response: boolean
}

export interface MovieDetailState {
    loading: boolean
    data: MovieDetail | null
    error?: Error
}

export const fetchMovieDetail = createAsyncThunk<
    MovieDetail,
    { [key: string]: string },
    { rejectValue: Error }
>('movieDetail/fetch', async (reqBody, thunkAPI: any) => {
    try {
        const data = await thunkAPI.extra.api.getRequest(reqBody)
        return await Promise.resolve(data)
    } catch (err) {
        const error = err as Error
        return thunkAPI.rejectWithValue(error)
    }
})

const initialState: MovieDetailState = {
    loading: false,
    data: null
}
const movieDetailSlice = createSlice({
    name: 'movieDetail',
    initialState,
    reducers: {
        // ...
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovieDetail.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchMovieDetail.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(fetchMovieDetail.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export const getMovieDetail = (state: RootState) => state.movieDetail

export default movieDetailSlice.reducer
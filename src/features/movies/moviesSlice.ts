import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

// Schema from gotten on from OMDB's API
// by using the search parameter in query
export interface Movie {
    Title: string
    Year: number
    imdbID: string
    Type: string
    Poster: string
}

export interface MoviesState {
    loading: boolean
    data: Movie[]
    error?: Error
}

export const fetchMovies = createAsyncThunk<
    Movie[],
    { [key: string]: string },
    { rejectValue: Error }
>('movies/fetch', async (reqBody, thunkAPI: any) => {
    try {
        const { Search } = await thunkAPI.extra.api.getRequest(reqBody)
        return await Promise.resolve(Search)
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

export const getMovies = (state: RootState) => state.movies

export default moviesSlice.reducer
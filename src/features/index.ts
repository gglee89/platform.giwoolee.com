import { combineReducers } from '@reduxjs/toolkit'

import { MoviesReducer } from './movies'
import { MovieDetailReducer } from './movieDetail'

const rootReducer = combineReducers({
    movies: MoviesReducer,
    movieDetail: MovieDetailReducer
})

export default rootReducer
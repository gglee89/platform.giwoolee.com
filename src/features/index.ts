import { combineReducers } from '@reduxjs/toolkit'

import { MoviesReducer } from './movies'

const rootReducer = combineReducers({
    movies: MoviesReducer
})

export default rootReducer
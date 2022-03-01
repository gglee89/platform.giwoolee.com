import { configureStore } from '@reduxjs/toolkit'

// Reducers
import rootReducer from '../features'

// Services
import * as services from '../services'

// Middleware
import logger from 'redux-logger'

// Setup redux store with the extraArgument option enabled
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: services,
      },
    }).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

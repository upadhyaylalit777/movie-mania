import { configureStore } from '@reduxjs/toolkit'

import movieReducer from '../slice/movieSlice'
import favoritesReducer from '../slice/favoritesSlice'
export const store = configureStore({
    reducer: {
        movies: movieReducer,
        favorites: favoritesReducer,
    }
})
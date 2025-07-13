import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    movies: [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const movie = action.payload;
      const exists = state.movies.find((m) => m.imdbId === movie.imdbId);
      if (exists) {
        state.movies = state.movies.filter((m) => m.imdbId !== movie.imdbId);
      } else {
        state.movies.push(movie);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;

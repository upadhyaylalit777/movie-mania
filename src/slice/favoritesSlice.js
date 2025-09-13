import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: JSON.parse(localStorage.getItem('favorites')) || [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const movie = action.payload;
      const exists = state.movies.find((m) => m.imdbId === movie.imdbId);
      if (exists) {
        state.movies = state.movies.filter((m) => m.imdbId !== movie.imdbId);
      } else {
        state.movies.push(movie);
      }
      localStorage.setItem('favorites', JSON.stringify(state.movies));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
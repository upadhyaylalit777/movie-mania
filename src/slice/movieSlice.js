// slice/movieSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [],
  genreFilter: 'All',
  ratingFilter: 'All',
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies:      (s, a) => { s.movies = a.payload; },
    setGenreFilter: (s, a) => { s.genreFilter  = a.payload; },
    setRatingFilter:(s, a) => { s.ratingFilter = a.payload; },
  },
});

export const { setMovies, setGenreFilter, setRatingFilter } = movieSlice.actions;
export default movieSlice.reducer;

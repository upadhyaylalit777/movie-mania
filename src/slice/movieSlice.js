import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPopularMovies, searchMovies } from '../api/tmdb';

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopular',
  async () => {
    const response = await getPopularMovies();
    return response;
  }
);

export const searchMoviesByQuery = createAsyncThunk(
  'movies/search',
  async (query) => {
    const response = await searchMovies(query);
    return response;
  }
);

const initialState = {
  movies: [],
  loading: false,
  error: null,
  genreFilter: 'All',
  ratingFilter: 'All',
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setGenreFilter: (s, a) => { s.genreFilter  = a.payload; },
    setRatingFilter:(s, a) => { s.ratingFilter = a.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchMoviesByQuery.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(searchMoviesByQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchMoviesByQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setGenreFilter, setRatingFilter } = movieSlice.actions;
export default movieSlice.reducer;
// api/movies.js
import axios from 'axios';
import { setMovies } from '../slice/movieSlice';

export const getMovies = (query = '') => async (dispatch) => {
  const url = `https://imdb.iamidiotareyoutoo.com/search?q=${encodeURIComponent(query)}`;

  try {
    const { data } = await axios.get(url);
    console.log('API raw response:', data);

    const rawMovies = Array.isArray(data.description) ? data.description : [];

    const parsedMovies = rawMovies.map((movie) => ({
      title: movie['#TITLE'],
      imdbId: movie['#IMDB_ID'],
      year: movie['#YEAR'],
      actors: movie['#ACTORS'],
      image: movie['#IMG_POSTER'] || null,
    }));

    console.log('Parsed movies:', parsedMovies);

    dispatch(setMovies(parsedMovies));
    return parsedMovies;
  } catch (err) {
    console.error('Failed to fetch movies:', err);
    dispatch(setMovies([]));
    return [];
  }
};

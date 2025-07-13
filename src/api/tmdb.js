// src/api/tmdb.js
import axios from 'axios';
import { setMovies } from '../slice/movieSlice';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

let genreMap = {}; // memory cache for genre IDs

const fetchGenreMap = async () => {
  if (Object.keys(genreMap).length > 0) return genreMap;

  try {
    const { data } = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: { api_key: API_KEY, language: 'en-US' },
    });

    data.genres.forEach((g) => {
      genreMap[g.id] = g.name;
    });
  } catch (err) {
    console.error('Failed to fetch genre list:', err);
  }

  return genreMap;
};

// ✅ Fetch multiple pages of popular movies (for better pagination)
export const getPopularMovies = (totalPagesToFetch = 3) => async (dispatch) => {
  try {
    await fetchGenreMap();

    let allMovies = [];

    for (let page = 1; page <= totalPagesToFetch; page++) {
      const res = await axios.get(`${BASE_URL}/movie/popular`, {
        params: { api_key: API_KEY, language: 'en-US', page },
      });

      const movies = await Promise.all(
        res.data.results.map(async (movie) => {
          let cast = 'N/A';
          try {
            const creditsRes = await axios.get(`${BASE_URL}/movie/${movie.id}/credits`, {
              params: { api_key: API_KEY },
            });

            cast = creditsRes.data.cast.slice(0, 3).map((a) => a.name).join(', ');
          } catch (err) {
            console.warn('Cast fetch failed:', err);
          }

          return {
            imdbId: movie.id,
            title: movie.title,
            year: movie.release_date?.split('-')[0] || '',
            rating: movie.vote_average?.toFixed(1) || 'N/A',
            description: movie.overview || 'No description.',
            actors: cast,
            image: movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : null,
            genres: movie.genre_ids.map((id) => genreMap[id] || 'Unknown'),
          };
        })
      );

      allMovies = allMovies.concat(movies);
    }

    dispatch(setMovies(allMovies));
    return allMovies;
  } catch (err) {
    console.error('Failed to fetch movies:', err);
    dispatch(setMovies([]));
    return [];
  }
};

// ✅ Search still only fetches 1 page (as per TMDB's default)
export const searchMovies = (query) => async (dispatch) => {
  if (!query.trim()) return dispatch(getPopularMovies());

  try {
    await fetchGenreMap();

    const res = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        query,
        include_adult: false,
        page: 1,
      },
    });

    const movies = await Promise.all(
      res.data.results.map(async (movie) => ({
        imdbId: movie.id,
        title: movie.title,
        year: movie.release_date?.split('-')[0] || '',
        rating: movie.vote_average?.toFixed(1) || 'N/A',
        description: movie.overview || 'No description.',
        actors: 'N/A', // optionally skip cast for search results
        image: movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : null,
        genres: movie.genre_ids.map((id) => genreMap[id] || 'Unknown'),
      }))
    );

    dispatch(setMovies(movies));
    return movies;

  } catch (err) {
    console.error('Search failed:', err);
    dispatch(setMovies([]));
    return [];
  }
};

import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

let genreMap = {};

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

export const getPopularMovies = async (totalPagesToFetch = 3) => {
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
    return allMovies;
  } catch (err) {
    console.error('Failed to fetch movies:', err);
    return [];
  }
};

export const searchMovies = async (query) => {
  if (!query.trim()) return [];

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
        actors: 'N/A',
        image: movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : null,
        genres: movie.genre_ids.map((id) => genreMap[id] || 'Unknown'),
      }))
    );
    return movies;
  } catch (err) {
    console.error('Search failed:', err);
    return [];
  }
};
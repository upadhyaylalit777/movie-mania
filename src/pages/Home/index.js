// src/pages/Home.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import { debounce } from 'lodash';

import MovieCard from '../../components/MovieCard';
import { getPopularMovies, searchMovies } from '../../api/tmdb';

const Home = ({ searchQuery = '', genreFilter = '', ratingFilter = '' }) => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const [page, setPage] = useState(1);

  const debouncedSearch = useMemo(
    () =>
      debounce((query) => {
        dispatch(searchMovies(query));
      }, 500),
    [dispatch]
  );

  useEffect(() => {
    if (searchQuery.trim()) {
      debouncedSearch(searchQuery);
    } else {
      dispatch(getPopularMovies());
    }
  }, [searchQuery, dispatch, debouncedSearch]);

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      // Genre filtering - check multiple possible genre properties
      let genreMatch = true;
      if (genreFilter) {
        genreMatch = false;
        
        // Check if genres is an array (contains genre objects or strings)
        if (Array.isArray(movie.genres)) {
          genreMatch = movie.genres.some(genre => {
            const genreName = typeof genre === 'string' ? genre : genre.name;
            return genreName?.toLowerCase() === genreFilter.toLowerCase();
          });
        }
        // Check if genre_ids exists (TMDB API sometimes uses this)
        else if (movie.genre_ids && Array.isArray(movie.genre_ids)) {
          // You might need to map genre IDs to names
          // This is a simplified check - you'd need actual genre mapping
          genreMatch = movie.genre_ids.length > 0;
        }
        // Check if there's a single genre property
        else if (movie.genre) {
          genreMatch = movie.genre.toLowerCase() === genreFilter.toLowerCase();
        }
        // Fallback: check if the movie object has genre information in other formats
        else if (movie.genres && typeof movie.genres === 'string') {
          genreMatch = movie.genres.toLowerCase().includes(genreFilter.toLowerCase());
        }
      }

      // Rating filtering - handle different rating properties and formats
      let ratingMatch = true;
      if (ratingFilter) {
        let movieRating = 0;
        
        // Check different possible rating properties
        if (movie.vote_average) {
          movieRating = parseFloat(movie.vote_average);
        } else if (movie.rating) {
          movieRating = parseFloat(movie.rating);
        } else if (movie.imdbRating) {
          movieRating = parseFloat(movie.imdbRating);
        }

        // Parse rating filter (e.g., "9+" -> 9, "8+" -> 8)
        const minRating = parseFloat(ratingFilter.replace('+', ''));
        ratingMatch = movieRating >= minRating;
      }

      return genreMatch && ratingMatch;
    });
  }, [movies, genreFilter, ratingFilter]);

  const moviesPerPage = 12;
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage) || 1;
  const paginatedMovies = filteredMovies.slice((page - 1) * moviesPerPage, page * moviesPerPage);

  useEffect(() => {
    setPage(1); // reset to page 1 when filters or search query change
  }, [searchQuery, genreFilter, ratingFilter]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Debug logging - remove after testing
  console.log('Filter values:', { genreFilter, ratingFilter });
  console.log('Total movies:', movies.length);
  console.log('Filtered movies:', filteredMovies.length);
  console.log('Sample movie structure:', movies[0]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      {paginatedMovies.length === 0 ? (
        <Typography variant="h6" align="center">
          No movies found.
        </Typography>
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'center',
            }}
          >
            {paginatedMovies.map((movie) => (
              <Box
                key={movie.imdbId || movie.id}
                sx={{
                  flexGrow: 1,
                  flexBasis: {
                    xs: '100%',
                    sm: 'calc(50% - 16px)',
                    md: 'calc(50% - 16px)',
                    lg: 'calc(25% - 16px)',
                  },
                  display: 'grid',
                }}
              >
                <MovieCard {...movie} />
              </Box>
            ))}
          </Box>
          <Box mt={4} display="flex" justifyContent="center">
            <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
          </Box>
        </>
      )}
    </Container>
  );
};

export default Home;
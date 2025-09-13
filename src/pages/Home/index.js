import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Skeleton from '@mui/material/Skeleton';
import { debounce } from 'lodash';

import MovieCard from '../../components/MovieCard';
import { fetchPopularMovies, searchMoviesByQuery } from '../../slice/movieSlice';

const Home = ({ searchQuery = '', genreFilter = '', ratingFilter = '' }) => {
  const dispatch = useDispatch();
  const { movies, loading } = useSelector((state) => state.movies);
  const [page, setPage] = useState(1);

  const debouncedSearch = useMemo(
    () =>
      debounce((query) => {
        dispatch(searchMoviesByQuery(query));
      }, 500),
    [dispatch]
  );

  useEffect(() => {
    if (searchQuery.trim()) {
      debouncedSearch(searchQuery);
    } else {
      debouncedSearch.cancel();
      dispatch(fetchPopularMovies());
    }
  }, [searchQuery, dispatch, debouncedSearch]);

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      let genreMatch = true;
      if (genreFilter) {
        genreMatch = false;
        if (Array.isArray(movie.genres)) {
          genreMatch = movie.genres.some(genre => {
            const genreName = typeof genre === 'string' ? genre : genre.name;
            return genreName?.toLowerCase() === genreFilter.toLowerCase();
          });
        }
        else if (movie.genre_ids && Array.isArray(movie.genre_ids)) {
          genreMatch = movie.genre_ids.length > 0;
        }
        else if (movie.genre) {
          genreMatch = movie.genre.toLowerCase() === genreFilter.toLowerCase();
        }
        else if (movie.genres && typeof movie.genres === 'string') {
          genreMatch = movie.genres.toLowerCase().includes(genreFilter.toLowerCase());
        }
      }

      let ratingMatch = true;
      if (ratingFilter) {
        let movieRating = 0;
        if (movie.vote_average) movieRating = parseFloat(movie.vote_average);
        else if (movie.rating) movieRating = parseFloat(movie.rating);
        else if (movie.imdbRating) movieRating = parseFloat(movie.imdbRating);
        
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
    setPage(1);
  }, [searchQuery, genreFilter, ratingFilter]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const renderSkeletons = () => (
    Array.from(new Array(moviesPerPage)).map((_, index) => (
      <Box
        key={index}
        sx={{
          flexBasis: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(50% - 16px)', lg: 'calc(25% - 16px)' },
          display: 'grid',
        }}
      >
        <Skeleton variant="rectangular" sx={{ height: 450, borderRadius: 2 }} />
        <Skeleton variant="text" sx={{ fontSize: '1.2rem', mt: 1 }} />
        <Skeleton variant="text" width="60%" />
      </Box>
    ))
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      {loading ? (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
          {renderSkeletons()}
        </Box>
      ) : paginatedMovies.length === 0 ? (
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
                  // ✅ THE FIX: flexGrow is removed to prevent stretching
                  flexBasis: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(50% - 16px)', lg: 'calc(25% - 16px)' },
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
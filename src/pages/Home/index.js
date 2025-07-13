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
      const genreMatch = genreFilter ? movie.genres?.includes(genreFilter) : true;
      const ratingMatch = ratingFilter ? parseFloat(movie.rating) >= parseFloat(ratingFilter) : true;
      return genreMatch && ratingMatch;
    });
  }, [movies, genreFilter, ratingFilter]);

  const moviesPerPage = 12;
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage) || 1; // ensure at least 1 page
  const paginatedMovies = filteredMovies.slice((page - 1) * moviesPerPage, page * moviesPerPage);

  useEffect(() => {
    setPage(1); // reset to page 1 when filters or search query change
  }, [searchQuery, genreFilter, ratingFilter]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
                key={movie.imdbId}
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

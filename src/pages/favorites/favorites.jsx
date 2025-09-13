import React from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MovieCard from '../../components/MovieCard';

const FavoritesPage = () => {
    const favorites = useSelector((state) => state.favorites.movies || []);

    return (
        <Container maxWidth="lg" sx={{
            mt: 4, mb: 6
        }} >
            <Typography variant="h5" gutterBottom >Favorites</Typography>
            {favorites.length === 0 ? (
                <Typography align='center'> No favorites added yet.</Typography>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 2,
                        justifyContent: 'center',
                    }}
                >
                    {favorites.map((movie) => (
                        <Box
                            key={movie.imdbId}
                            sx={{
                                // ✅ THE FIX: flexGrow is removed to prevent stretching
                                flexBasis: {
                                    xs: '100%',
                                    sm: 'calc(50% - 16px)',
                                    md: 'calc(50% - 16px)',
                                    lg: 'calc(25% - 16px)',
                                },
                                // ✅ Using 'grid' ensures perfect equal-height cards
                                display: 'grid',
                            }}
                        >
                            <MovieCard {...movie} />
                        </Box>
                    ))}
                </Box>
            )}
        </Container>
    );
};

export default FavoritesPage;
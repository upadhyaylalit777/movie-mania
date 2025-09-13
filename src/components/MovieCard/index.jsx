import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Chip,
  Stack,
  Box,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarRateIcon from '@mui/icons-material/StarRate';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../slice/favoritesSlice';

const smartTrim = (str, maxLength = 120) => {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  const trimmed = str.substr(0, str.lastIndexOf(' ', maxLength));
  return trimmed + '...';
};

const MovieCard = ({ imdbId, title, year, image, description, rating, actors, genres = [] }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.movies);
  const isFavorite = favorites.some((movie) => movie.imdbId === imdbId);

  return (
    <Card sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: 6,
      },
    }}>
      <IconButton
        onClick={() =>
          dispatch(
            toggleFavorite({
              imdbId,
              title,
              year,
              image,
              description,
              rating,
              actors,
              genres,
            })
          )
        }
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          },
        }}
      >
        <FavoriteIcon sx={{ color: isFavorite ? 'red' : 'white' }} />
      </IconButton>

      {image && (
        <CardMedia
          component="img"
          height="250" // ✅ THE FIX: Reduced height from 300 to 250
          image={image}
          alt={title}
          loading="lazy"
          sx={{ objectFit: 'cover' }}
        />
      )}

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {title} ({year})
        </Typography>

        {rating ? (
          <Chip
            icon={<StarRateIcon />}
            label={rating}
            color="warning"
            size="small"
            sx={{ mb: 1.5, width: 'fit-content' }}
          />
        ) : (
          <Box sx={{ height: '24px', mb: 1.5 }} />
        )}
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {smartTrim(description)}
        </Typography>
        
        <Box sx={{ flexGrow: 1 }} /> 

        {actors && (
          <Typography variant="caption" display="block" sx={{ mb: 1, fontStyle: 'italic' }}>
            <strong>Cast:</strong> {actors}
          </Typography>
        )}

        <Stack 
          direction="row" 
          spacing={1} 
          useFlexGap
          flexWrap="wrap" 
          sx={{ 
            mt: 'auto', 
            pt: 1,
            minHeight: '56px' 
          }}
        >
          {genres.map((genre) => (
            <Chip key={genre} label={genre} size="small" variant="outlined" />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
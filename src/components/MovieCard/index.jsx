import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  IconButton,
  Chip,
  Stack,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
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
    <Card sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {image && (
        <CardMedia
          component="img"
          height="300"
          image={image}
          alt={title}
          loading="lazy"
          sx={{ objectFit: 'cover' }}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {title} ({year})
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {smartTrim(description)}
        </Typography>

        {actors && (
          <Typography variant="caption" display="block" sx={{ mb: 1 }}>
            <strong>Cast:</strong> {actors}
          </Typography>
        )}

        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1, mb: 1 }}>
          {genres.map((genre) => (
            <Chip key={genre} label={genre} size="small" variant="outlined" />
          ))}
        </Stack>

        {rating && (
          <Typography variant="body2" color="text.secondary">
            ⭐ {rating}
          </Typography>
        )}
      </CardContent>

      <CardActions>
        <Button size="small">Details</Button>
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
        >
          <FavoriteIcon sx={{ color: isFavorite ? 'red' : 'gray' }} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default MovieCard;

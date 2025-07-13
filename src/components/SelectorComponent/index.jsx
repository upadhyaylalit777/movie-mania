// components/SelectorComponent.jsx
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { setGenreFilter, setRatingFilter } from '../../slice/movieSlice';

/**
 * Props:
 *   type = "genre"  → shows genre list
 *   type = "rating" → shows min‑rating list
 */
export default function SelectorComponent({ type = 'genre' }) {
  const dispatch = useDispatch();

  /* --- options -------------------------------------- */
  const genreOptions  = ['All', 'Action', 'Comedy', 'Drama', 'Thriller', 'Sci‑Fi', 'Animation'];
  const ratingOptions = ['All', '9', '8', '7', '6'];      // “9” means >= 9.0

  /* --- read current value from Redux ---------------- */
  const selected = useSelector((s) =>
    type === 'genre' ? s.movies.genreFilter : s.movies.ratingFilter
  );

  /* --- handle change -------------------------------- */
  const handleChange = (e) => {
    const value = e.target.value;
    if (type === 'genre')  dispatch(setGenreFilter(value));
    else                   dispatch(setRatingFilter(value));
  };

  /* --- UI ------------------------------------------- */
  const label  = type === 'genre' ? 'Genre'  : 'Rating';
  const items  = type === 'genre' ? genreOptions : ratingOptions;

  return (
    <Box sx={{ minWidth: 140 }}>
      <FormControl fullWidth size="small">
        <InputLabel>{label}</InputLabel>
        <Select label={label} value={selected} onChange={handleChange}>
          {items.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {type === 'rating' && opt !== 'All' ? `${opt}+` : opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

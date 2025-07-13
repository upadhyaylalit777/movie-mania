import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(3),
  width: '100%',
  maxWidth: 300,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
  },
}));

const Navbar = ({ onSearch, onGenreChange, onRatingChange, onTogglePage, currentPage }) => {
  const [genre, setGenre] = React.useState('');
  const [rating, setRating] = React.useState('');

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  const handleGenreChange = (e) => {
    const value = e.target.value;
    setGenre(value);
    onGenreChange(value);
  };

  const handleRatingChange = (e) => {
    const value = e.target.value;
    setRating(value);
    onRatingChange(value);
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
            MovieMania
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} onChange={handleSearchChange} />
          </Search>

          <Select
            value={genre}
            onChange={handleGenreChange}
            displayEmpty
            sx={{ ml: 2, color: 'white', borderColor: 'white' }}
            inputProps={{ 'aria-label': 'Genre' }}
          >
            <MenuItem value="">All Genres</MenuItem>
            <MenuItem value="Action">Action</MenuItem>
            <MenuItem value="Drama">Drama</MenuItem>
            <MenuItem value="Comedy">Comedy</MenuItem>
            <MenuItem value="Horror">Horror</MenuItem>
            <MenuItem value="Fantasy">Fantasy</MenuItem>
            <MenuItem value="Thriller">Thriller</MenuItem>
            <MenuItem value="Science Fiction">Science Fiction</MenuItem>
          </Select>

          <Select
            value={rating}
            onChange={handleRatingChange}
            displayEmpty
            sx={{ ml: 2, color: 'white' }}
            inputProps={{ 'aria-label': 'Rating' }}
          >
            <MenuItem value="">All Ratings</MenuItem>
            <MenuItem value="9">9+</MenuItem>
            <MenuItem value="8">8+</MenuItem>
            <MenuItem value="7">7+</MenuItem>
            <MenuItem value="6">6+</MenuItem>
          </Select>

          <Box sx={{ flexGrow: 1 }} />

          <Button color="inherit" onClick={onTogglePage}>
            {currentPage === 'home' ? 'Favorites' : 'Home'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;

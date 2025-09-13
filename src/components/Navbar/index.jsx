import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  InputAdornment,
  Collapse,
  ListItemIcon, // Added for better icon alignment in the drawer
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Favorite as FavoriteIcon,
  Home as HomeIcon,
  FilterList as FilterIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Brightness4 as Brightness4Icon, // Moon icon for dark mode
  Brightness7 as Brightness7Icon, // Sun icon for light mode
} from '@mui/icons-material';

// Accept the new props for theme handling
const Navbar = ({ onTogglePage, currentPage, onSearch, onGenreChange, onRatingChange, themeMode, onThemeChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [genreValue, setGenreValue] = useState('');
  const [ratingValue, setRatingValue] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    onSearch(event.target.value);
  };

  const handleGenreChange = (event) => {
    setGenreValue(event.target.value);
    onGenreChange(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRatingValue(event.target.value);
    onRatingChange(event.target.value);
  };

  const handlePageToggle = () => {
    onTogglePage();
    setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{ width: 280, pt: 2 }}>
      <List>
        <ListItem button onClick={handlePageToggle}>
          <ListItemIcon>{currentPage === 'home' ? <FavoriteIcon /> : <HomeIcon />}</ListItemIcon>
          <ListItemText primary={currentPage === 'home' ? 'Favorites' : 'Home'} />
        </ListItem>

        {/* Theme toggle for mobile drawer */}
        <ListItem button onClick={onThemeChange}>
          <ListItemIcon>{themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}</ListItemIcon>
          <ListItemText primary={`Switch to ${themeMode === 'light' ? 'Dark' : 'Light'} Mode`} />
        </ListItem>
        
        <ListItem>
          <TextField
            fullWidth
            placeholder="Search movies..."
            value={searchValue}
            onChange={handleSearchChange}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </ListItem>

        <ListItem button onClick={() => setFiltersOpen(!filtersOpen)}>
          <ListItemIcon><FilterIcon /></ListItemIcon>
          <ListItemText primary="Filters" />
          {filtersOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>

        <Collapse in={filtersOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem sx={{ pl: 9 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Genre</InputLabel>
                <Select value={genreValue} onChange={handleGenreChange} label="Genre">
                  <MenuItem value="">All Genres</MenuItem>
                  <MenuItem value="action">Action</MenuItem>
                  <MenuItem value="comedy">Comedy</MenuItem>
                  <MenuItem value="drama">Drama</MenuItem>
                  <MenuItem value="horror">Horror</MenuItem>
                  <MenuItem value="romance">Romance</MenuItem>
                  <MenuItem value="sci-fi">Sci-Fi</MenuItem>
                  <MenuItem value="thriller">Thriller</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
            
            <ListItem sx={{ pl: 9 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Rating</InputLabel>
                <Select value={ratingValue} onChange={handleRatingChange} label="Rating">
                  <MenuItem value="">All Ratings</MenuItem>
                  <MenuItem value="9+">9+ Stars</MenuItem>
                  <MenuItem value="8+">8+ Stars</MenuItem>
                  <MenuItem value="7+">7+ Stars</MenuItem>
                  <MenuItem value="6+">6+ Stars</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar>
          <Typography 
            variant="h6" 
            component="div" 
            onClick={() => {
              if (currentPage !== 'home') {
                onTogglePage();
              }
              if (mobileOpen) {
                setMobileOpen(false);
              }
            }}
            sx={{ 
              flexGrow: isMobile ? 1 : 0,
              mr: isMobile ? 0 : 4,
              fontSize: isSmallMobile ? '1.1rem' : '1.25rem',
              cursor: 'pointer',
              userSelect: 'none',
              '&:hover': {
                opacity: 0.8,
              }
            }}
          >
            Moviemania
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
              <TextField
                placeholder="Search movies..."
                value={searchValue}
                onChange={handleSearchChange}
                size="small"
                sx={{ 
                  minWidth: 200,
                  maxWidth: 300,
                  backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.7)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'rgba(255, 255, 255, 0.7)',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'white' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel sx={{ color: 'white' }}>Genre</InputLabel>
                <Select
                  value={genreValue}
                  onChange={handleGenreChange}
                  label="Genre"
                  sx={{
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.7)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '& .MuiSvgIcon-root': {
                      color: 'white',
                    },
                  }}
                >
                  <MenuItem value="">All Genres</MenuItem>
                  <MenuItem value="action">Action</MenuItem>
                  <MenuItem value="comedy">Comedy</MenuItem>
                  <MenuItem value="drama">Drama</MenuItem>
                  <MenuItem value="horror">Horror</MenuItem>
                  <MenuItem value="romance">Romance</MenuItem>
                  <MenuItem value="sci-fi">Sci-Fi</MenuItem>
                  <MenuItem value="thriller">Thriller</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel sx={{ color: 'white' }}>Rating</InputLabel>
                <Select
                  value={ratingValue}
                  onChange={handleRatingChange}
                  label="Rating"
                  sx={{
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.7)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '& .MuiSvgIcon-root': {
                      color: 'white',
                    },
                  }}
                >
                  <MenuItem value="">All Ratings</MenuItem>
                  <MenuItem value="9+">9+ Stars</MenuItem>
                  <MenuItem value="8+">8+ Stars</MenuItem>
                  <MenuItem value="7+">7+ Stars</MenuItem>
                  <MenuItem value="6+">6+ Stars</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}

          <Box sx={{ flexGrow: 1 }} />

          {!isMobile && (
            <>
              <Button
                color="inherit"
                onClick={handlePageToggle}
                startIcon={currentPage === 'home' ? <FavoriteIcon /> : <HomeIcon />}
              >
                {currentPage === 'home' ? 'Favorites' : 'Home'}
              </Button>
              {/* Theme toggle for desktop */}
              <IconButton sx={{ ml: 1 }} onClick={onThemeChange} color="inherit">
                {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </>
          )}

          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
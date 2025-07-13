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
  Collapse
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Favorite as FavoriteIcon,
  Home as HomeIcon,
  FilterList as FilterIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';

const Navbar = ({ onTogglePage, currentPage, onSearch, onGenreChange, onRatingChange }) => {
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

  const handleLogoClick = () => {
    // Only navigate to home if not already on home page
    if (currentPage !== 'home') {
      onTogglePage();
    }
    setMobileOpen(false);
  };

  // Mobile drawer content
  const drawer = (
    <Box sx={{ width: 280, pt: 2 }}>
      <List>
        {/* Page Navigation */}
        <ListItem button onClick={handlePageToggle}>
          {currentPage === 'home' ? <FavoriteIcon sx={{ mr: 2 }} /> : <HomeIcon sx={{ mr: 2 }} />}
          <ListItemText 
            primary={currentPage === 'home' ? 'Favorites' : 'Home'} 
            sx={{ color: theme.palette.primary.main }}
          />
        </ListItem>
        
        {/* Search */}
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

        {/* Filters Toggle */}
        <ListItem button onClick={() => setFiltersOpen(!filtersOpen)}>
          <FilterIcon sx={{ mr: 2 }} />
          <ListItemText primary="Filters" />
          {filtersOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>

        {/* Collapsible Filters */}
        <Collapse in={filtersOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem sx={{ pl: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Genre</InputLabel>
                <Select
                  value={genreValue}
                  onChange={handleGenreChange}
                  label="Genre"
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
            </ListItem>
            
            <ListItem sx={{ pl: 4 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Rating</InputLabel>
                <Select
                  value={ratingValue}
                  onChange={handleRatingChange}
                  label="Rating"
                >
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
          {/* Logo/Title */}
          <Typography 
            variant="h6" 
            component="div" 
            onClick={handleLogoClick}
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
            MovieApp
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
              {/* Search */}
              <TextField
                placeholder="Search movies..."
                value={searchValue}
                onChange={handleSearchChange}
                size="small"
                sx={{ 
                  minWidth: 200,
                  maxWidth: 300,
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
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

              {/* Genre Filter */}
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

              {/* Rating Filter */}
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

          {/* Desktop Page Toggle Button */}
          {!isMobile && (
            <Button
              color="inherit"
              onClick={handlePageToggle}
              startIcon={currentPage === 'home' ? <FavoriteIcon /> : <HomeIcon />}
              sx={{ ml: 2 }}
            >
              {currentPage === 'home' ? 'Favorites' : 'Home'}
            </Button>
          )}

          {/* Mobile Menu Button */}
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

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
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
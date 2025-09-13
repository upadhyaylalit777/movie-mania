import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import FavoritesPage from './pages/favorites/favorites';
import Footer from './components/Footer/Footer';

function App() {
  // State to manage the theme mode, initialized from localStorage or defaults to 'light'
  const [themeMode, setThemeMode] = useState(localStorage.getItem('themeMode') || 'light');
  
  const [page, setPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  // A memoized theme that re-creates only when the themeMode changes
  const theme = useMemo(() => createTheme({
    palette: {
      mode: themeMode,
      ...(themeMode === 'light'
        ? { // Values for light mode
            primary: { main: '#1565c0' },
            background: { default: '#f4f6f8' },
          }
        : { // Values for dark mode
            primary: { main: '#90caf9' },
            background: { default: '#121212', paper: '#1e1e1e' },
          }),
    },
    // ✅ This section enables global smooth scrolling
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            scrollBehavior: 'smooth',
          },
        },
      },
    },
  }), [themeMode]);

  // Function to toggle the theme
  const handleThemeChange = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newMode);
    localStorage.setItem('themeMode', newMode); // Save choice to localStorage
  };

  const handleTogglePage = () => {
    setPage((prev) => (prev === 'home' ? 'favorites' : 'home'));
    window.scrollTo({ top: 0, behavior: 'smooth' }); // This is still useful for targeted scrolls
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
        <Navbar
          onTogglePage={handleTogglePage}
          currentPage={page}
          onSearch={setSearchQuery}
          onGenreChange={setGenreFilter}
          onRatingChange={setRatingFilter}
          // Pass theme state and handler to Navbar
          themeMode={themeMode}
          onThemeChange={handleThemeChange}
        />
        <Box component="main" sx={{ flexGrow: 1 }}>
          {page === 'home' ? (
            <Home
              searchQuery={searchQuery}
              genreFilter={genreFilter}
              ratingFilter={ratingFilter}
            />
          ) : (
            <FavoritesPage />
          )}
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
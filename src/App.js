// App.js
import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import FavoritesPage from './pages/favorites/favorites';
import Footer from './components/Footer/Footer';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1565c0' },
    background: { default: '#f4f6f8' },
  },
});

function App() {
  const [page, setPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  const handleTogglePage = () => {
    setPage((prev) => (prev === 'home' ? 'favorites' : 'home'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar
        onTogglePage={handleTogglePage}
        currentPage={page}
        onSearch={setSearchQuery}
        onGenreChange={setGenreFilter}
        onRatingChange={setRatingFilter}
      />
      {page === 'home' ? (
        <Home
          searchQuery={searchQuery}
          genreFilter={genreFilter}
          ratingFilter={ratingFilter}
        />
      ) : (
        <FavoritesPage />
      )}
      <Footer />
    </ThemeProvider>
  );
}

export default App;

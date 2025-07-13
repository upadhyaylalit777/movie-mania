import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer/Footer';
import Box from '@mui/material/Box';


export default function Layout({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {/* <Navbar onSearch={debouncedSearch} /> */}
      <Box component="main" sx={{ flex: 1, py: 3 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

// components/Footer.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Footer = () => {
  return (
    <AppBar
      position="static"
      component="footer"
      color="primary"
      sx={{ mt: 4, top: 'auto', bottom: 0 }}
    >
      <Toolbar>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Typography variant="body2" color="inherit">
            © {new Date().getFullYear()} Moviemania. All rights reserved.
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;

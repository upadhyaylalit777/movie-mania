// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // change to 'dark' if preferred
    primary: {
      main: '#0d47a1', // deep blue
    },
    secondary: {
      main: '#f50057', // pink
    },
    background: {
      default: 'gray',
    },
  },
  typography: {
    fontFamily: `'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
  },
});

export default theme;

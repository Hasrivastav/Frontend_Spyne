import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CssVarsProvider, extendTheme as joyExtendTheme } from '@mui/joy';
import { ThemeProvider, createTheme as muiCreateTheme } from '@mui/material/styles';

const joyTheme = joyExtendTheme({
 
});

const muiTheme = muiCreateTheme({
  typography: {
    fontWeightBold: 700,
    fontWeightRegular: 400,
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={muiTheme}>
      <CssVarsProvider theme={joyTheme}>
        <App />
      </CssVarsProvider>
    </ThemeProvider>
  </StrictMode>
);

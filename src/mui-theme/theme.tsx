'use client';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: false,
  palette: {
    primary: { main: '#1671b2', dark: '#07436e', light: '#4782b3', contrastText: '#ffffff' },
    secondary: { main: '#ff7300', dark: '#e06600', light: '#ff9f43', contrastText: '#ffffff' },
    error: { main: '#ea5455' },
    success: { main: '#45ca80' },
    warning: { main: '#f2b24e' },
    info: { main: '#00cfe8' },
    text: { primary: '#383e50', secondary: '#767676' },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: "'Noto Sans Arabic', 'Noto Sans', sans-serif",
    button: { textTransform: 'none', fontWeight: 700 },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      // @ts-ignore custom breakpoint preserved from the original theme
      xxl: 1432,
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '0.8rem',
          fontFamily: "'Noto Sans Arabic', 'Noto Sans', sans-serif",
          padding: '7px 15px',
          borderRadius: 8,
          backgroundColor: 'rgba(7, 67, 110, 0.94)',
        },
      },
    },
  },
});

function ThemeProviderContext({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default ThemeProviderContext;

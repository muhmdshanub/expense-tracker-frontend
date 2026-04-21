import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0a905a', // Vibrant green from FinTrack reference
    },
    secondary: {
      main: '#e8ecef', // Light grey for secondary actions/chips
    },
    background: {
      default: '#f4f7f6', // Very subtle grey background for the app body
      paper: '#ffffff', // Cards are pure white
    },
    text: {
      primary: '#1a1d1f',
      secondary: '#6f767e',
    }
  },
  typography: {
    fontFamily: '"Inter", "Outfit", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    }
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
          border: '1px solid rgba(0,0,0,0.05)',
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          }
        }
      }
    }
  }
});

export default theme;

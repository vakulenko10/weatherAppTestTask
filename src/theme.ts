import { createTheme } from '@mui/material/styles';
import { designTokens as t } from './styles/designTokens';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: t.colors.primary,
      contrastText: '#ffffff',
    },
    secondary: {
      main: t.colors.secondary,
      contrastText: '#ffffff',
    },
    info: {
      main: t.colors.info,
    },
    warning: {
      main: t.colors.warning,
    },
    background: {
      default: t.colors.background,
      paper: t.colors.paper,
    },
    text: {
      primary: t.colors.textPrimary,
      secondary: t.colors.textSecondary,
    },
  },

  typography: {
    fontFamily: t.typography.fontFamily,
    h1: {
      fontSize: t.typography.h1,
      fontWeight: 700,
      color: t.colors.textPrimary,
    },
    h2: {
      fontSize: t.typography.h2,
      fontWeight: 600,
      color: t.colors.textPrimary,
    },
    h3: {
      fontSize: t.typography.h3,
      fontWeight: 500,
    },
    body1: {
      fontSize: t.typography.body1,
    },
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: t.colors.primary,
          color: '#ffffff',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: t.radius.base,
          padding: t.spacing.buttonPadding,
          textTransform: 'none',
          fontWeight: 500,
        },
        containedPrimary: {
          backgroundColor: t.colors.primary,
          '&:hover': {
            backgroundColor: '#6b857c',
          },
        },
        containedSecondary: {
          backgroundColor: t.colors.secondary,
          '&:hover': {
            backgroundColor: '#91af94',
          },
        },
        outlined: {
          borderColor: t.colors.primary,
          color: t.colors.textPrimary,
          '&:hover': {
            backgroundColor: '#e7e9d6',
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: t.colors.paper,
          borderRadius: t.radius.card,
          boxShadow: t.shadow.card,
          padding: t.spacing.cardPadding,
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: t.colors.paper,
          borderRadius: t.radius.textField,
          '& label': {
            color: t.colors.secondary,
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: t.colors.info,
            },
            '&:hover fieldset': {
              borderColor: t.colors.secondary,
            },
            '&.Mui-focused fieldset': {
              borderColor: t.colors.primary,
            },
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: t.radius.base,
          padding: t.spacing.paperPadding,
          backgroundColor: t.colors.paper,
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '0.85rem',
          backgroundColor: t.colors.primary,
        },
      },
    },
  },
});
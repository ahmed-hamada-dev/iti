import AboutPage from '#/components/about/AboutPage'
import Features from '#/components/features/Features'
import Hero from '#/components/hero/Hero'
import Contact from '#/components/contact/Contact'
import { createFileRoute } from '@tanstack/react-router'
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material'

export const Route = createFileRoute('/material-day1')({
  component: RouteComponent,
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
    divider: '#334155',
    action: {
      hover: 'rgba(255, 255, 255, 0.05)',
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
  },
});

function RouteComponent() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <Hero />
        <AboutPage />
        <Features />
        <Contact />
    </ThemeProvider>
  )
}

import { Button, Typography, Box } from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';

export default function Hero() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* background image */}
      <Box
        component="img"
        src="/images/hero.png"
        alt="Squirrel in the forest"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />

      {/* Dark overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0, 0, 0, 0.45)',
          zIndex: 1,
        }}
      />

      {/*  content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          px: 3,
          py: 10,
          maxWidth: 750,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ fontSize: { xs: '2rem', md: '3.5rem' }, fontWeight: 'bold', color: '#fff' }}
        >
          Welcome to Our Restaurant
        </Typography>
        <Typography
          variant="h6"
          sx={{ mb: 4, color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem' }}
        >
          Delicious food served with love
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<ExploreIcon />}
          sx={{ px: 5, py: 1.5, borderRadius: 3, fontSize: '1.1rem' }}
        >
          View Menu
        </Button>
      </Box>
    </Box>
  );
}

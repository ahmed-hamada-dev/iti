import { Button, Typography, Box } from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import InfoIcon from '@mui/icons-material/Info';

export default function Hero() {
  return (
    <Box sx={{ bgcolor: 'background.paper', pt: 12, pb: 8, minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, display: 'flex', flexDirection: 'row', gap: 4, alignItems: 'center', width: '100%' }}>
        <Box sx={{ flex: 1.1 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontSize: '4rem', fontWeight: 'bold' }}>
            Explore the Secret Life of <Box component="span" color="primary.main">Squirrels</Box>
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 550, fontSize: '1.25rem' }}>
            From planting forests to escaping predators with lightning speed,
            squirrels are nature's most fascinating and intelligent gardeners.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <Button variant="contained" size="large" startIcon={<ExploreIcon />} sx={{ px: 4, py: 1.5, borderRadius: 3, fontSize: '1.1rem' }}>
              Discover More
            </Button>
            <Button variant="outlined" size="large" startIcon={<InfoIcon />} sx={{ px: 4, py: 1.5, borderRadius: 3, fontSize: '1.1rem' }}>
              Our Mission
            </Button>
          </Box>
        </Box>
        <Box sx={{ flex: 0.9, display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Box
            component="img"
            src="/images/hero.png"
            alt="Squirrel in the forest"
            sx={{
              width: '100%',
              height: 550,
              objectFit: 'cover',
              borderRadius: 8,
              boxShadow: '20px 20px 0px 0px rgba(25, 118, 210, 0.2)'
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

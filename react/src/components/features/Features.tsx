import { Card, Typography, Box ,Grid} from '@mui/material';
import ForestIcon from '@mui/icons-material/Forest';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TerrainIcon from '@mui/icons-material/Terrain';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

export default function Features() {
  const features = [
    {
      title: "Nature's Foresters",
      description: "Squirrels bury thousands of nuts each year. The forgotten ones grow into new trees, making squirrels the primary planters of oak and walnut forests.",
      icon: <ForestIcon fontSize="large" color="primary" />
    },
    {
      title: "Masters of Deception",
      description: "To protect their food, squirrels will pretend to bury nuts when they know they're being watched by potential thieves.",
      icon: <VisibilityOffIcon fontSize="large" color="primary" />
    },
    {
      title: "Super-Powered Jumpers",
      description: "They can leap horizontally up to 20 feet and fall from heights of 100 feet without injury, thanks to their incredible anatomy.",
      icon: <TerrainIcon fontSize="large" color="primary" />
    },
    {
      title: "Universal Communicators",
      description: "Using complex tail flickers and chirps, squirrels communicate warnings about predators and even signal food sources to their community.",
      icon: <RecordVoiceOverIcon fontSize="large" color="primary" />
    },
  ];

  return (
    <Box sx={{ py: 10, bgcolor: 'background.paper' }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, width: '100%' }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Why they are <Box component="span" color="primary.main">Extraordinary</Box>
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            More than just park dwellers, squirrels are sophisticated mammals with complex lives and critical forest roles.
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid key={index} size={{ xs: 12, md: 6, lg: 3 }}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                borderRadius: 4, 
                transition: '0.3s', 
                border: '1px solid', 
                borderColor: 'divider',
                boxShadow: 'none',
                '&:hover': { transform: 'translateY(-8px)', boxShadow: 4, borderColor: 'primary.main' } 
              }}>
                <Box sx={{ p: 4, flexGrow: 1 }}>
                  <Box sx={{ mb: 3, display: 'inline-flex', p: 1.5, borderRadius: 2, bgcolor: 'rgba(16, 185, 129, 0.15)' }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

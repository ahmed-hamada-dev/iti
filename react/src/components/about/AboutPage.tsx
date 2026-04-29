import { Card, Typography, Box, Paper,Grid } from '@mui/material';

export default function AboutPage() {
  const sections = [
    {
      title: "Reforestation Experts",
      content: "Squirrels are nature's gardeners. By burying nuts and occasionally forgetting their precise location, they facilitate the growth of millions of trees globally, maintaining the health of our forests.",
    },
    {
      title: "Ecosystem Balance",
      content: "They serve as a vital link in the food chain and help disperse fungi spores, which are essential for soil health and nutrient cycling in woodland areas.",
    },
    {
      title: "Remarkable Adaptations",
      content: "From their 180-degree rotating ankles to their bushy tails that serve as balance markers and umbrellas, squirrels are marvels of evolutionary engineering.",
    },
  ];

  return (
    <Box sx={{ py: 10, bgcolor: 'background.default' }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, width: '100%' }}>
        {/* Content  */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Why Squirrels Matter
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Beyond their playful antics, squirrels are foundational to many of the world's most critical ecosystems.
          </Typography>
        </Box>

{/* Cards */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {sections.map((section, index) => (
            <Grid key={index} size={{ xs: 12, md: 6, lg: 4 }}>
              <Card sx={{ height: '100%', borderRadius: 4, transition: '0.3s', '&:hover': { transform: 'scale(1.02)', borderColor: 'primary.main' }, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                <Box sx={{ p: 4 }}>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {section.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {section.content}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

{/* info card */}
        <Paper elevation={0} sx={{ p: { xs: 4, md: 8 }, bgcolor: 'action.hover', borderRadius: { xs: 4, md: 8 }, textAlign: 'center', border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
            Protecting Our Smallest Allies
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', mt: 2, fontSize: { xs: '1rem', md: '1.25rem' } }}>
            As urbanization continues to expand, protecting squirrel habitats is more important than ever. 
            By maintaining green spaces and old-growth trees, we ensure these brilliant creatures continue 
            their vital work for generations to come.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}

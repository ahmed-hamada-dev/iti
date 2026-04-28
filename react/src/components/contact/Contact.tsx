import { Box, Typography, Button, Card } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Contact() {
  return (
    <Box sx={{ py: 10, bgcolor: 'background.default' }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, width: '100%' }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Get in <Box component="span" color="primary.main">Touch</Box>
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Have questions about squirrel conservation or want to join our mission? We'd love to hear from you.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 6 }}>
          <Box sx={{ width: '41.666%' }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Contact Information
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Reach out to us through any of these channels or fill out the form.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <EmailIcon color="primary" sx={{ mr: 2 }} />
              <Typography variant="body1">contact@ahmed-hamada.dev</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <PhoneIcon color="primary" sx={{ mr: 2 }} />
              <Typography variant="body1">+20 1060257232</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon color="primary" sx={{ mr: 2 }} />
              <Typography variant="body1">Egypt</Typography>
            </Box>
          </Box>
          <Box sx={{ width: '58.333%' }}>
            <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
              <Box sx={{ p: 4 }}>
                <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
                    <Box sx={{ width: '50%' }}>
                      <Box component="input" placeholder="First Name" sx={{ width: '100%', p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, fontFamily: 'inherit', fontSize: '1rem', boxSizing: 'border-box' }} />
                    </Box>
                    <Box sx={{ width: '50%' }}>
                      <Box component="input" placeholder="Last Name" sx={{ width: '100%', p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, fontFamily: 'inherit', fontSize: '1rem', boxSizing: 'border-box' }} />
                    </Box>
                  </Box>
                  <Box component="input" type="email" placeholder="Email Address" sx={{ width: '100%', p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, fontFamily: 'inherit', fontSize: '1rem', boxSizing: 'border-box' }} />
                  <Box component="textarea" placeholder="Message" rows={4} sx={{ width: '100%', p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, fontFamily: 'inherit', fontSize: '1rem', boxSizing: 'border-box', resize: 'vertical' }} />
                  <Button variant="contained" size="large" endIcon={<SendIcon />} sx={{ mt: 2, py: 1.5, borderRadius: 2 }}>
                    Send Message
                  </Button>
                </Box>
              </Box>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Grid } from '@mui/material';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: '#f0fdf4',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#1a365d',
                mb: 2
              }}
            >
              ABOUT
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box
              component="img"
              src="/public/profile.jpeg"
              alt="Profile"
              sx={{
                width: 50,
                height: 50,
                borderRadius: '50%'
              }}
              />
              <Typography
              sx={{
                color: '#1a365d',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
              >
              Akash <Heart className="h-5 w-5 text-orange-500" />
              </Typography>
            </Box>
            <Typography
              component="a"
              href="https://github.com/abdurrahman-akash/CPU-Scheduling-Simulator"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#64748b',
                textDecoration: 'none',
                '&:hover': { color: '#2563eb' }
              }}
            >
              Source Code
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#1a365d',
                mb: 2
              }}
            >
              PRODUCTS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {[
                'Build Modern Full-Stack Apps: Next.js Course',
                'Next.js Workshop',
                'Developer to Leader',
                "Engineering Leader's Playbook"
              ].map((item) => (
                <Typography
                  key={item}
                  component={Link}
                  to="#"
                  sx={{
                    color: '#64748b',
                    textDecoration: 'none',
                    '&:hover': { color: '#2563eb' }
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#1a365d',
                mb: 2
              }}
            >
              RESOURCES
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {[
                'Blog',
                'Frontend Snacks Newsletter',
                "Engineering Leader's Snacks Newsletter",
                'Free Course: Next.js Hot Tips'
              ].map((item) => (
                <Typography
                  key={item}
                  component={Link}
                  to="#"
                  sx={{
                    color: '#64748b',
                    textDecoration: 'none',
                    '&:hover': { color: '#2563eb' }
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          align="center"
          sx={{
            color: '#64748b',
            mt: 6,
            pt: 3,
            borderTop: '1px solid',
            borderColor: 'rgba(226, 232, 240, 0.8)'
          }}
        >
          © {new Date().getFullYear()} CPU Scheduler. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}
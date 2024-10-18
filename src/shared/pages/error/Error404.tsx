import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { IconChevronLeft } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

interface Error404Props {
  message?: string;
  buttonText?: string;
  buttonLink?: string;
  icon?: React.ReactNode;
}

const Error404: React.FC<Error404Props> = ({
  message = 'La página que estás buscando no fue encontrada.',
  buttonText = 'Go Home',
  buttonLink = '/',
  icon = <IconChevronLeft />,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '70vh',
        boxSizing: 'border-box',
        flexDirection: { xs: 'column', sm: 'row' },
        textAlign: { xs: 'center', sm: 'left' },
      }}
    >
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item sm={5} textAlign="center">
          <iframe
            src="https://lottie.host/embed/c6e03d6e-898e-43e6-a7bc-5f89c28528c6/jAxnKQZY3T.json"
            style={{ border: 'none', width: '100%', height: '350px' }}
          ></iframe>
        </Grid>
        <Grid item sm={6}>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, margin: 0 }}
          >
            Sorry!
          </Typography>
          <Typography
            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' }, maxWidth: '600px' }}
          >
            {message}
          </Typography>
          <Link to={buttonLink} style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={{ marginTop: '20px' }}>
              {icon} {buttonText}
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Error404;

import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorImg from '@/assets/images/backgrounds/errorimg.svg';

interface Error404Props {
  message?: string;
  buttonText?: string;
  buttonLink?: string;
}

const Error404: React.FC<Error404Props> = ({
  message = 'La página que estás buscando no fue encontrada.',
  buttonText = 'Go Home',
  buttonLink = '/',
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      textAlign="center"
      justifyContent="center"
    >
      <Container maxWidth="md">
        <img src={ErrorImg} alt="404" />
        <Typography align="center" variant="h1" mb={4}>
          Opps!!!
        </Typography>
        <Typography align="center" variant="h4" mb={4}>
          {message}
        </Typography>
        <Button
          color="primary"
          variant="contained"
          component={Link}
          to={buttonLink}
          disableElevation
        >
          {buttonText}
        </Button>
      </Container>
    </Box>
  );
};

export default Error404;

import { useEffect, useState } from 'react';
import { Box, Avatar, useTheme } from '@mui/material';

type ImageSwitchProps = {
  primaryImageUrl?: string;
  secondaryImageUrl?: string;
  size?: number;
  smallSize?: number;
};

const ImageSwitch = ({
  primaryImageUrl,
  secondaryImageUrl,
  size = 200,
  smallSize = 60,
}: ImageSwitchProps) => {
  const [mainImage, setMainImage] = useState(primaryImageUrl);
  const [smallImage, setSmallImage] = useState(secondaryImageUrl);

  const theme = useTheme();

  const handleImageSwitch = () => {
    const tempImage = mainImage;
    setMainImage(smallImage);
    setSmallImage(tempImage);
  };

  useEffect(() => {
    setMainImage(primaryImageUrl);
    setSmallImage(secondaryImageUrl);
  }, [primaryImageUrl, secondaryImageUrl]);

  return (
    <Box
      sx={{
        alignItems: 'center',
      }}
    >
      {/* Imagen principal grande */}
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <Avatar
          src={mainImage}
          alt="Imagen principal"
          sx={{
            width: size,
            height: size,
            border: `4px solid ${theme.palette.primary.main}`,
            cursor: 'default',
            backgroundColor: 'white',
            overflow: 'hidden', // importante para que no se desborde
          }}
          imgProps={{
            style: {
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            },
          }}
        />

        {/* Imagen pequeña en la esquina inferior izquierda */}
        <Avatar
          src={smallImage}
          alt="Imagen secundaria"
          onClick={handleImageSwitch}
          sx={{
            width: smallSize,
            height: smallSize,
            border: `3px solid ${theme.palette.secondary.main}`,
            backgroundColor: 'white',
            position: 'absolute',
            bottom: -10,
            left: -10,
            cursor: 'pointer',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.1)',
            },
            '&:active': {
              transform: 'scale(0.95)',
            },
          }}
          imgProps={{
            style: {
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            },
          }}
        />
      </Box>
    </Box>
  );
};
export default ImageSwitch;

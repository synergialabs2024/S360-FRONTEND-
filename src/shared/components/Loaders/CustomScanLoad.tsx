import { Backdrop, Box, LinearProgress } from '@mui/material';

export type CustomScanLoadProps = {
  isOpen: boolean;
  name: 'rostro' | 'archivo' | 'cedula';
};

const CustomScanLoad: React.FC<CustomScanLoadProps> = ({ isOpen, name }) => {
  const renderGif = () => {
    switch (name) {
      case 'rostro':
        return (
          <iframe
            src="https://lottie.host/embed/1fead640-5a91-43df-a340-554b1a73e899/zTpuC3OsTx.json"
            style={{ border: 'none', marginBottom: '1cm' }}
          ></iframe>
        );
      case 'archivo':
        return (
          <iframe
            src="https://lottie.host/embed/050bab18-516f-40ad-8c54-2c38e0290de9/Ll8Uh1MA8r.json"
            style={{ border: 'none', marginBottom: '1cm' }}
          ></iframe>
        );
      case 'cedula':
        return (
          <iframe
            src="https://lottie.host/embed/6b8b3a82-e53c-4b23-8b77-6c95ac3cdc72/yPuYlMaUEi.json"
            style={{ border: 'none' }}
          ></iframe>
        );
      default:
        return null;
    }
  };

  return (
    <Backdrop sx={{ color: '#fff', zIndex: () => 10000 + 1 }} open={isOpen}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {renderGif()}

        <LinearProgress
          sx={{
            width: '100%',
            maxWidth: '10cm',
            minWidth: '8cm',
          }}
        />
      </Box>
    </Backdrop>
  );
};

export default CustomScanLoad;

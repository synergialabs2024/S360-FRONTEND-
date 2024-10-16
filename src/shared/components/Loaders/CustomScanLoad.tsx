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
            src="https://lottie.host/embed/5cd310ed-ff14-4073-b8a8-b005cd9a7a32/RB2m8wl3Ep.json"
            style={{ border: 'none', marginBottom: '1cm' }}
          ></iframe>
        );
      case 'archivo':
        return (
          <iframe
            src="https://lottie.host/embed/b6ca978c-b065-40e4-9f62-7a3470a0695e/KLgnU28XcW.json"
            style={{ border: 'none', marginBottom: '1cm' }}
          ></iframe>
        );
      case 'cedula':
        return (
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '187px',
            }}
          >
            <iframe
              src="https://lottie.host/embed/d5d0dcea-cf9b-4473-be08-7bc6deb6d405/bncIbcy7Z4.json"
              style={{
                border: 'none',
                width: '100%',
                height: '350px',
                position: 'absolute',
                top: '-45%',
              }}
            ></iframe>
          </div>
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

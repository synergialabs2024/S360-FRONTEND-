import { Backdrop, Box } from '@mui/material';

export type CustomLineLoadProps = {
  percentage?: number;
  bDrop?: boolean;
};

const CustomLineLoad: React.FC<CustomLineLoadProps> = ({
  percentage = 100,
  bDrop = false,
}) => {
  const iframeStyles = {
    border: 'none',
    clipPath: 'inset(25% 0 25% 0)',
    width: '100%',
    height: `${percentage}%`,
  };

  const containerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    clipPath: 'inset(25% 0 25% 0)',
  };

  return (
    <>
      {bDrop ? (
        <Backdrop sx={{ zIndex: 10001 }} open={true}>
          <Box sx={{ display: 'flex' }}>
            <Box sx={containerStyles}>
              <iframe
                src="https://lottie.host/embed/5c811360-d048-43b4-8817-3d59bc8e2537/guIFnSbYCI.json"
                style={iframeStyles}
              />
            </Box>
          </Box>
        </Backdrop>
      ) : (
        <Box sx={{ display: 'flex' }}>
          <Box sx={containerStyles}>
            <iframe
              src="https://lottie.host/embed/5c811360-d048-43b4-8817-3d59bc8e2537/guIFnSbYCI.json"
              style={iframeStyles}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default CustomLineLoad;

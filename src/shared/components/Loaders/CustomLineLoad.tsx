import { Box } from '@mui/material';

export type CustomLineLoadProps = {
  percentage?: number;
};

const CustomLineLoad: React.FC<CustomLineLoadProps> = ({
  percentage = 100,
}) => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            minHeight: '5cm',
            clipPath: 'inset(25% 0 25% 0)',
          }}
        >
          <iframe
            src="https://lottie.host/embed/5c811360-d048-43b4-8817-3d59bc8e2537/guIFnSbYCI.json"
            style={{
              border: 'none',
              clipPath: 'inset(25% 0 25% 0)',
              width: '100%',
              height: `${percentage}%`,
            }}
          ></iframe>
        </Box>
      </Box>
    </>
  );
};

export default CustomLineLoad;

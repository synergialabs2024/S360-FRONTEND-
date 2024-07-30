import { Box, CircularProgress } from '@mui/material';

export type CustomCircularPorgressProps = {
  size?: number;
};

const CustomCircularPorgress: React.FC<CustomCircularPorgressProps> = ({
  size = 27,
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
          }}
        >
          <CircularProgress size={size} />
        </Box>
      </Box>
    </>
  );
};

export default CustomCircularPorgress;

import { Box, LinearProgress } from '@mui/material';

export type LoaderRouterProps = {};

const LoaderRouter: React.FC<LoaderRouterProps> = () => {
  return (
    <Box
      sx={{ position: 'fixed', top: 0, left: 0, zIndex: 1301, width: '100%' }}
    >
      <LinearProgress color="primary" />
    </Box>
  );
};

export default LoaderRouter;

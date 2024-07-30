import { Backdrop, CircularProgress } from '@mui/material';

import { useUiStore } from '@/store/ui';

export type CustomBackdropLoaderProps = {};

const CustomBackdropLoader: React.FC<CustomBackdropLoaderProps> = () => {
  const isOpen = useUiStore(s => s.isGlobalLoading);

  return (
    <Backdrop sx={{ color: '#fff', zIndex: () => 9999 + 1 }} open={isOpen}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default CustomBackdropLoader;

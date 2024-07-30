import { useMediaQuery, useTheme } from '@mui/material';

type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const useIsMediaQuery = (breakpointValue: Breakpoints) => {
  const theme: any = useTheme();

  return useMediaQuery(theme.breakpoints.down(breakpointValue));
};

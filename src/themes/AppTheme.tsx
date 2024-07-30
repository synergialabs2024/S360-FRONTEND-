import { CssBaseline, ThemeProvider } from '@mui/material';
import { useMemo } from 'react';

import { useUiStore } from '@/store/ui';
import createAppTheme from '.';

export type AppThemeProps = {
  children: React.ReactNode;
};

export type ColorMode = 'light' | 'dark';

const AppTheme: React.FC<AppThemeProps> = ({ children }) => {
  const customization = useUiStore(s => s.customization);

  const theme = useMemo(() => createAppTheme(customization), [customization]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {children}
    </ThemeProvider>
  );
};

export default AppTheme;

import merge from 'lodash/merge';
import { createTheme } from '@mui/material/styles'; // Importación de createTheme
import { useEffect } from 'react';
import components from './Components';
import typography from './Typography';
import { shadows, darkshadows } from './Shadows';
import { DarkThemeColors } from './DarkThemeColors';
import { LightThemeColors } from './LightThemeColors';
import { baseDarkTheme, baselightTheme } from './DefaultColors';
import * as locales from '@mui/material/locale'; // Revisa si esto es necesario
import { useUiStore } from '@/store/ui';

export const BuildTheme = (config: any = {}) => {
  const themeOptions = LightThemeColors.find(
    theme => theme.name === config.theme,
  );
  const darkthemeOptions = DarkThemeColors.find(
    theme => theme.name === config.theme,
  );
  const customizer = useUiStore(state => state.state);
  const defaultTheme =
    customizer.activeMode === 'dark' ? baseDarkTheme : baselightTheme;
  const defaultShadow =
    customizer.activeMode === 'dark' ? darkshadows : shadows;
  const themeSelect =
    customizer.activeMode === 'dark' ? darkthemeOptions : themeOptions;

  const baseMode = {
    palette: {
      mode: customizer.activeMode,
    },
    shape: {
      borderRadius: customizer.borderRadius,
    },
    shadows: defaultShadow,
    typography: typography,
  };

  const theme = createTheme(
    merge({}, baseMode, defaultTheme, locales, themeSelect, {
      direction: config.direction,
    }),
  );

  theme.components = components(theme);

  return theme;
};

export const ThemeSettings = () => {
  const activDir = useUiStore(state => state.state.activeDir);
  const activeTheme = useUiStore(state => state.state.activeTheme);
  const theme = BuildTheme({
    direction: activDir,
    theme: activeTheme,
  });

  useEffect(() => {
    document.dir = activDir;
  }, [activDir]);

  return theme;
};

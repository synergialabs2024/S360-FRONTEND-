import { createTheme, Theme } from '@mui/material/styles';
import { esES } from '@mui/x-date-pickers/locales';

import colors from '@/assets/scss/_themes-vars.module.scss';
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';

interface CustomizationOptions {
  [key: string]: any;
}

export const createAppTheme = (customization: CustomizationOptions): Theme => {
  const color = colors;

  const themeOption = {
    colors: color,
    heading: color.grey900,
    paper: color.paper,
    backgroundDefault: color.paper,
    background: color.primaryLight,
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    menuSelected: color.primaryDark,
    menuSelectedBack: color.primaryLight,
    divider: color.grey200,
    customization,
    fontFamily: customization.fontFamily,
  };

  const themeOptions = {
    direction: 'ltr',
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px',
        },
      },
    },
    typography: themeTypography(themeOption),
  };

  const themes = createTheme(
    themeOptions as any,

    // locale
    esES,
  );
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default createAppTheme;

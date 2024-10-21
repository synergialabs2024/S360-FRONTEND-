/* eslint-disable indent */
import { useMediaQuery, useTheme, type Breakpoint } from '@mui/material';

type NumberOrBreakpoint = number | Breakpoint;

export const useResponsive = (
  query: 'up' | 'down' | 'between' | 'only',
  start: NumberOrBreakpoint,
  end?: NumberOrBreakpoint
): boolean => {
  const theme = useTheme();

  const mediaUp = useMediaQuery(theme.breakpoints.up(start));

  const mediaDown = useMediaQuery(theme.breakpoints.down(start));

  const mediaBetween = end
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useMediaQuery(theme.breakpoints.between(start, end))
    : false;

  const mediaOnly = useMediaQuery(theme.breakpoints.only(start as Breakpoint));

  if (query === 'up') {
    return mediaUp;
  }

  if (query === 'down') {
    return mediaDown;
  }

  if (query === 'between') {
    return mediaBetween;
  }

  return mediaOnly;
};

export const useWidth = (): string => {
  const theme = useTheme();

  const keys = [...theme.breakpoints.keys].reverse();

  return (
    keys.reduce((output: string | null, key: Breakpoint) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));

      return !output && matches ? key : output;
    }, null) || 'xs'
  );
};

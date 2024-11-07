// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';

import { Card } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { useUiStore } from '@/store/ui/ui.store';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const AppCard = ({ children }: Props) => {
  const customizer = useUiStore(state => state.state);
  const theme = useTheme();
  const borderColor = theme.palette.divider;

  return (
    <Card
      sx={{
        padding: 0,
        border: !customizer.isCardShadow ? `1px solid ${borderColor}` : 'none',
      }}
      elevation={customizer.isCardShadow ? 9 : 0}
      variant={!customizer.isCardShadow ? 'outlined' : undefined}
    >
      {children}
    </Card>
  );
};

export default AppCard;

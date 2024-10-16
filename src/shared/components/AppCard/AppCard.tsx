// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';

import { Card } from '@mui/material';
import { useSelector } from '@/store/Store';
import { AppState } from '@/store/Store';

import { useTheme } from '@mui/material/styles';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const AppCard = ({ children }: Props) => {
  const customizer = useSelector((state: AppState) => state.customizer);
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

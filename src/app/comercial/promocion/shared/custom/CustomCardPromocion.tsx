import { Box, Grid, BoxProps } from '@mui/material';
import React from 'react';

export interface CustomCardPromocionProps extends BoxProps {
  contentNode: React.ReactNode;
}

const CustomCardPromocion: React.FC<CustomCardPromocionProps> = ({
  contentNode,
  ...boxProps
}) => {
  return (
    <Box
      p={3}
      bgcolor="rgba(245, 245, 245, 0.2)"
      boxShadow={4}
      borderRadius={2}
      {...boxProps}
      width="100%"
    >
      <Grid container alignItems="center">
        {contentNode}
      </Grid>
    </Box>
  );
};

export default CustomCardPromocion;

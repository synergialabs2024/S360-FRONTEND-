import { Box, Grid } from '@mui/material';

import { gridSize } from '@/shared/constants/ui';
import { GridSizeType, SxPropsThemeType } from '@/shared/interfaces';

export type CustomTabPanelProps = {
  children: React.ReactNode;
  index: number | string;
  value: number | string;

  sxBox?: SxPropsThemeType;
  ptGrid?: string | number;
  sxChild?: GridSizeType;
};

const CustomTabPanel: React.FC<CustomTabPanelProps> = ({
  children,
  value,
  index,
  sxBox = { padding: '0px 9px 0px 0px', minWidth: '100%' },
  ptGrid = 2,
  sxChild = gridSize,
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ width: '100%' }}
    >
      {value === index && (
        <Box sx={sxBox}>
          <Grid item container spacing={3} justifyContent="center" pt={ptGrid}>
            <Grid item container {...sxChild} spacing={3}>
              {children}
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
};

export default CustomTabPanel;

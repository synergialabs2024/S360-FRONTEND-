import { Grid } from '@mui/material';

import { gridSize } from '@/shared/constants';
import { GridSizeType, SxPropsThemeType } from '@/shared/interfaces';

export type CustomTabPanelProps = {
  children: React.ReactNode;
  index: number | string;
  value: number | string;

  sxBox?: SxPropsThemeType;
  ptGrid?: string | number;
  gridSizeChild?: GridSizeType;
};

const CustomTabPanel: React.FC<CustomTabPanelProps> = ({
  children,
  value,
  index,
  sxBox = {
    padding: 0,
    margin: 0,
    minWidth: '100%',
    width: '100%',
  },
  ptGrid = 2,
  gridSizeChild = gridSize,
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{
        padding: 0,
        margin: 0,
        minWidth: '100%',
        width: '100%',
      }}
    >
      {value === index && (
        // to be used directly with Custom Form Components
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{
            pt: ptGrid,
            ...sxBox,
          }}
        >
          <Grid
            item
            {...gridSizeChild}
            sx={{
              width: '100%',
              p: 0,
              m: 0,
            }}
          >
            {children}
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default CustomTabPanel;

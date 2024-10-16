import { Theme } from '@emotion/react';
import { Grid, SxProps } from '@mui/material';

export type NestedTabsSceneProps = {
  tabs: React.ReactNode;
  children: React.ReactNode;

  sxContainer?: SxProps<Theme> | undefined;
};

const NestedTabsScene: React.FC<NestedTabsSceneProps> = ({
  children,
  tabs,
  sxContainer,
}) => {
  return (
    <Grid
      item
      xs={12}
      container
      justifyContent="flex-start"
      spacing={2}
      sx={sxContainer}
    >
      <Grid item xs={12}>
        {tabs}
      </Grid>

      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
};

export default NestedTabsScene;

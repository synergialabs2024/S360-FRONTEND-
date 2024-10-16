import { Grid } from '@mui/material';

export type GridTableTabsContainerOnlyProps = {
  children: React.ReactNode;
};

const GridTableTabsContainerOnly: React.FC<GridTableTabsContainerOnlyProps> = ({
  children,
}) => {
  return (
    <Grid item xs={12}>
      {children}
    </Grid>
  );
};

export default GridTableTabsContainerOnly;

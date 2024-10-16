import { Box } from '@mui/material';

import FormTabsOnly from './FormTabsOnly';

export type BoxFormTabsOnlyProps = {
  tabValue: number;
  handleTabChange: (event: React.ChangeEvent<{}>, newValue: number) => void;

  children: React.ReactNode; // tabs
};

const BoxFormTabsOnly: React.FC<BoxFormTabsOnlyProps> = ({
  handleTabChange,
  tabValue,
  children,
}) => {
  return (
    <>
      <Box>
        <FormTabsOnly value={tabValue} onChange={handleTabChange}>
          {children}
        </FormTabsOnly>
      </Box>
    </>
  );
};

export default BoxFormTabsOnly;

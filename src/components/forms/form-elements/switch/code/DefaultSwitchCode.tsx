import CodeDialog from '@/components/shared/CodeDialog';
const DefaultSwitchCode = () => {
  return (
    <>
      <CodeDialog>
        {`

import * as React from 'react';
import { Box, Switch } from '@mui/material';

<Box textAlign="center">
    <Switch defaultChecked />
    <Switch />
    <Switch disabled defaultChecked />
    <Switch disabled />
</Box>
`}
      </CodeDialog>
    </>
  );
};

export default DefaultSwitchCode;

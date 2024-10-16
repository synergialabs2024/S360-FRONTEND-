import CodeDialog from '@/components/shared/CodeDialog';
const SizesSwitchCode = () => {
  return (
    <>
      <CodeDialog>
        {`

import * as React from 'react';
import { Box, Switch } from '@mui/material';

<Box textAlign="center">
    <Switch defaultChecked size="small" />
    <Switch defaultChecked />
</Box>
`}
      </CodeDialog>
    </>
  );
};

export default SizesSwitchCode;

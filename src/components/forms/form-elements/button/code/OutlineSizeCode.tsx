import CodeDialog from '@/components/shared/CodeDialog';
const OutlineSizeCode = () => {
  return (
    <>
      <CodeDialog>
        {`

import * as React from 'react';
import { Button, Stack } from '@mui/material';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="center">
    <Button variant="outlined" size="small">
      Small
    </Button>
    <Button variant="outlined" size="medium">
      Medium
    </Button>
    <Button variant="outlined" size="large">
      Large
    </Button>
</Stack>`}
      </CodeDialog>
    </>
  );
};

export default OutlineSizeCode;

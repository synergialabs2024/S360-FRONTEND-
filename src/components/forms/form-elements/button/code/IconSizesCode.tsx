import CodeDialog from '@/components/shared/CodeDialog';
const IconSizesCode = () => {
  return (
    <>
      <CodeDialog>
        {`

import * as React from 'react';
import { IconButton, Tooltip, Stack } from '@mui/material';
import { IconBell } from '@tabler/icons-react';

<Stack spacing={1} direction="row" justifyContent="center">
    <Tooltip title="Bell">
      <IconButton aria-label="small-bell">
        <IconBell width={16} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Bell">
      <IconButton size="medium" aria-label="medium-bell">
        <IconBell width={19} />
      </IconButton>
    </Tooltip>
    <Tooltip title="Bell">
      <IconButton aria-label="large-bell">
        <IconBell width={21} />
      </IconButton>
    </Tooltip>
</Stack>`}
      </CodeDialog>
    </>
  );
};

export default IconSizesCode;

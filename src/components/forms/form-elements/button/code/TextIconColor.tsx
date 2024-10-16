import CodeDialog from '@/components/shared/CodeDialog';
const TextIconColor = () => {
  return (
    <>
      <CodeDialog>
        {`

import * as React from 'react';
import { Button, Stack } from '@mui/material';
import { IconTrash, IconSend } from '@tabler/icons-react';

<Stack spacing={1} direction="row" justifyContent="center">
    <Button color="error" startIcon={<IconTrash width={18} />}>
      Left Icon
    </Button>
    <Button color="secondary" endIcon={<IconSend width={18} />}>
      Right Icon
    </Button>
</Stack>`}
      </CodeDialog>
    </>
  );
};

export default TextIconColor;

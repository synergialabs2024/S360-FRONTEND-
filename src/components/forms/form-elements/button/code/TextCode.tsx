import CodeDialog from '@/components/shared/CodeDialog';
const TextCode = () => {
  return (
    <>
      <CodeDialog>
        {`

import * as React from 'react';
import { Button, Stack } from '@mui/material';

<Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent="center">
    <Button color="primary">Primary</Button>
    <Button color="secondary">Secondary</Button>
    <Button disabled>Disabled</Button>
    <Button href="#text-buttons" color="primary">
      Link
    </Button>
</Stack>`}
      </CodeDialog>
    </>
  );
};

export default TextCode;

import CodeDialog from '@/components/shared/CodeDialog';
const TextSecondaryCode = () => {
  return (
    <>
      <CodeDialog>
        {`

import { Typography } from '@mui/material';

<Typography variant="body1" color="textSecondary">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
</Typography>`}
      </CodeDialog>
    </>
  );
};

export default TextSecondaryCode;

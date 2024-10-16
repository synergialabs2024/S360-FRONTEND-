import CodeDialog from '@/components/shared/CodeDialog';
const GroupedSizeCode = () => {
  return (
    <>
      <CodeDialog>
        {`

import * as React from 'react';
import { Avatar, AvatarGroup, Badge, Stack } from '@mui/material';
import { IconMoodSmile } from '@tabler/icons-react';

import User2 from '@/assets/images/profile/user-2.jpg';
import User3 from '@/assets/images/profile/user-3.jpg';
import User4 from '@/assets/images/profile/user-4.jpg';

<Stack direction="row" spacing={1} justifyContent="center">
    <AvatarGroup max={4}>
        <Avatar alt="Remy Sharp" sx={{ width: 56, height: 56 }} src={User4} />
        <Avatar alt="Travis Howard" sx={{ width: 56, height: 56 }} src={User2} />
        <Avatar alt="Cindy Baker" sx={{ width: 56, height: 56 }} src={User3} />
    </AvatarGroup>
</Stack>`}
      </CodeDialog>
    </>
  );
};

export default GroupedSizeCode;

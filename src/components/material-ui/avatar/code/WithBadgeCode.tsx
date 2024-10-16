import CodeDialog from '@/components/shared/CodeDialog';
const WithBadgeCode = () => {
  return (
    <>
      <CodeDialog>
        {`

import * as React from 'react';
import { Avatar, AvatarGroup, Stack } from '@mui/material';
import { IconMoodSmile } from '@tabler/icons-react';

import User1 from '@/assets/images/profile/user-1.jpg';
import User2 from '@/assets/images/profile/user-2.jpg';
import User3 from '@/assets/images/profile/user-3.jpg';
import User4 from '@/assets/images/profile/user-4.jpg';
import User5 from '@/assets/images/profile/user-5.jpg';

<Stack direction="row" spacing={1} justifyContent="center">
    <AvatarGroup>
        <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
                <Avatar sx={{ width: 22, height: 22 }} alt="Remy Sharp" src={User4} />
            }
        >
            <Avatar alt="Travis Howard" src={User2} />
        </Badge>
    </AvatarGroup>
    <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        color="success"
    >
        <Avatar alt="Remy Sharp" src={User3} />
    </Badge>
    <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        color="warning"
    >
        <Avatar alt="Remy Sharp" src={User4} />
    </Badge>
    <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        color="error"
    >
        <Avatar alt="Remy Sharp" src={User5} />
    </Badge>
</Stack>`}
      </CodeDialog>
    </>
  );
};

export default WithBadgeCode;

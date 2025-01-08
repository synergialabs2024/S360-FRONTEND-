// @ts-ignore
import React, { useState } from 'react';
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
  Stack,
} from '@mui/material';

import { IconMail } from '@tabler/icons-react';

import ProfileImg from '@/assets/images/profile/user-1.jpg';

import { useAuthStore } from '@/store/auth';

const Profile = () => {
  const onLogout = useAuthStore(s => s.onLogout);

  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const user = useAuthStore(s => s.user);

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={ProfileImg}
          alt={ProfileImg}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '360px',
            p: 4,
          },
        }}
      >
        <Typography variant="h5">Perfil de usuario</Typography>
        <Stack direction="row" py={3} spacing={2} alignItems="center">
          <Avatar
            src={ProfileImg}
            alt={ProfileImg}
            sx={{ width: 95, height: 95 }}
          />
          <Box>
            <Typography
              variant="subtitle2"
              color="textPrimary"
              fontWeight={600}
            >
              {user?.username}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {user?.role}
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <IconMail width={15} height={15} />
              {user?.email}
            </Typography>
          </Box>
        </Stack>
        <Divider />
        <Box mt={2}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={async () => {
              await onLogout();
            }}
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;

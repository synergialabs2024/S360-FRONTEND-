import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import { useSelector } from '@/store/Store';
import img1 from '@/assets/images/profile/user-1.jpg';
import { IconPower } from '@tabler/icons-react';
import { AppState } from '@/store/Store';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';

export const Profile = () => {
  const onLogout = useAuthStore(s => s.onLogout);
  const customizer = useSelector((state: AppState) => state.customizer);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : '';

  const user = useAuthStore(s => s.user);

  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar alt="Remy Sharp" src={img1} />

          <Box>
            <Typography variant="h6">{user?.username} </Typography>
            <Typography variant="caption">{user?.role}</Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                color="primary"
                aria-label="logout"
                size="small"
                onClick={async () => {
                  await onLogout();
                }}
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  );
};

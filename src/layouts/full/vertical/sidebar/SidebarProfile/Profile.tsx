import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import img1 from '@/assets/images/profile/user-1.jpg';
import { IconPower } from '@tabler/icons-react';
import { useAuthStore } from '@/store/auth';
import { useUiStore } from '@/store/ui/ui.store';

export const Profile = () => {
  const onLogout = useAuthStore(s => s.onLogout);
  const customizer = useUiStore(state => state.state);
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

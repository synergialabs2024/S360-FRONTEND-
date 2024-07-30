import { useUiStore } from '@/store/ui';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { useTheme } from '@mui/material/styles';
import { IconMenu2 } from '@tabler/icons-react';

import LogoSection from './LogoSection';
import { NotificationSection } from './NotificationSection';
import ProfileSection from './ProfileSection';
import SearchSection from './SearchSection';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

export type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const theme = useTheme();

  ///* Handle left drawer ========================
  const customization = useUiStore(s => s.customization);
  const leftDrawerOpened = useUiStore(s => s.customization.opened);
  const setCustomization = useUiStore(s => s.setCustomization);

  const handleLeftDrawerToggle = () => {
    setCustomization({
      ...customization,
      opened: !leftDrawerOpened,
    });
  };

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto',
          },
        }}
      >
        <Box
          component="span"
          sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}
        >
          <LogoSection />
        </Box>

        <ButtonBase sx={{ borderRadius: '8px', overflow: 'hidden' }}>
          <Avatar
            variant="rounded"
            sx={{
              ...(theme.typography as any)?.commonAvatar,
              ...(theme.typography as any)?.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&:hover': {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light,
              },
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>

      {/* header search */}
      <SearchSection />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* notification & profile */}
      <NotificationSection />
      <ProfileSection />
    </>
  );
};

export default Header;

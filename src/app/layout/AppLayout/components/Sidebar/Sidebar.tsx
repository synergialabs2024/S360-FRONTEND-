import { Chip } from '@/shared/components/template';
import { drawerWidth } from '@/shared/constants';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { Scrollbar } from '@/shared/components/common';
import { useUiStore } from '@/store/ui';
import { LogoSection } from '../Header';
import MenuCard from './MenuCard';
import { MenuList } from './menu-list';

interface SidebarProps {
  window?: Window;
}

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar: React.FC<SidebarProps> = ({ window }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const customization = useUiStore(s => s.customization);
  const setCustomization = useUiStore(s => s.setCustomization);
  const leftDrawerOpened = useUiStore(s => s.customization.opened);

  const handleLeftDrawerToggle = () => {
    setCustomization({
      ...customization,
      opened: !leftDrawerOpened,
    });
  };

  const drawer = (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
          <LogoSection />
        </Box>
      </Box>
      <BrowserView>
        <PerfectScrollbar
          component="div"
          style={{
            height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          <MenuList />
          <MenuCard />
          <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
            <Chip
              label={import.meta.env.VITE_APP_VERSION}
              disabled
              chipcolor="secondary"
              size="small"
              sx={{ cursor: 'pointer' }}
            />
          </Stack>
        </PerfectScrollbar>
      </BrowserView>

      <MobileView>
        <Box sx={{ px: 2 }}>
          <MenuList />
          <MenuCard />
          <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
            <Chip
              label={import.meta.env.VITE_APP_VERSION}
              disabled
              chipcolor="secondary"
              size="small"
              sx={{ cursor: 'pointer' }}
            />
          </Stack>
        </Box>
      </MobileView>
    </>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <>
      <Box
        component="nav"
        sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }}
        aria-label="mailbox folders"
      >
        <Scrollbar
          sx={{
            height: 1,
            '& .simplebar-content': {
              height: 1,
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          <Drawer
            container={container}
            variant={matchUpMd ? 'persistent' : 'temporary'}
            anchor="left"
            open={matchUpMd ? leftDrawerOpened : !leftDrawerOpened}
            onClose={handleLeftDrawerToggle}
            sx={{
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                background: theme.palette.background.default,
                color: theme.palette.text.primary,
                borderRight: 'none',
                [theme.breakpoints.up('md')]: {
                  top: '88px',
                },
              },
            }}
            ModalProps={{ keepMounted: true }}
            color="inherit"
          >
            {drawer}
          </Drawer>
        </Scrollbar>
      </Box>
    </>
  );
};

export default Sidebar;

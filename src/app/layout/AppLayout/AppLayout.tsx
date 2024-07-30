/* eslint-disable indent */
import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Outlet } from 'react-router-dom';

import { drawerWidth } from '@/shared/constants';
import { useUiStore } from '@/store/ui';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';

export interface AppLayoutInterface {}

interface MainProps {
  open: boolean;
  theme: any;
}

// Usar la interfaz MainProps para tipificar las propiedades
const Main = styled('main', {
  shouldForwardProp: prop => prop !== 'open' && prop !== 'theme',
})<MainProps>(({ theme, open }) => {
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  return {
    ...theme.typography.mainContent,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create(
      'margin',
      open
        ? {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }
        : {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }
    ),
    [theme.breakpoints.up('md')]: {
      marginLeft: open ? 0 : -(drawerWidth - 20),
      width: `calc(100% - ${open && matchUpMd ? drawerWidth : 20}px)`,
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '20px',
      width: `calc(100% - ${open && matchUpMd ? drawerWidth : 20}px)`,
      padding: '16px',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px',
      width: `calc(100% - ${open && matchUpMd ? drawerWidth : 20}px)`,
      padding: '16px',
      marginRight: '10px',
    },
  };
});

const AppLayout: React.FC<AppLayoutInterface> = () => {
  const theme = useTheme();

  const leftDrawerOpened = useUiStore(s => s.customization.opened);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftDrawerOpened
            ? theme.transitions.create('width')
            : 'none',
        }}
      >
        <Toolbar>
          <Header />
        </Toolbar>
      </AppBar>

      {/* drawer */}
      <Sidebar />

      {/* main content */}
      <Main theme={theme} open={leftDrawerOpened}>
        <Outlet />
      </Main>
    </Box>
  );
};

export default AppLayout;

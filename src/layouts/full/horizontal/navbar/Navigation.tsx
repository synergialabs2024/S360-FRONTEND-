import { useMediaQuery, Box, Drawer, Container, Theme } from '@mui/material';
import NavListing from './NavListing/NavListing';
import Logo from '../../shared/logo/Logo';
import SidebarItems from '../../vertical/sidebar/SidebarItems';
import { useUiStore } from '@/store/ui/ui.store';

const Navigation = () => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const customizer = useUiStore(state => state.state);
  const customizerFunctions = useUiStore(state => state);

  if (lgUp) {
    return (
      <Box sx={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }} py={2}>
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Container
          sx={{
            maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
          }}
        >
          <NavListing />
        </Container>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={customizer.isMobileSidebar}
      onClose={() => customizerFunctions.toggleMobileSidebar}
      variant="temporary"
      PaperProps={{
        sx: {
          width: customizer.SidebarWidth,
          border: '0 !important',
          boxShadow: theme => theme.shadows[8],
        },
      }}
    >
      {/* ------------------------------------------- */}
      {/* Logo */}
      {/* ------------------------------------------- */}
      <Box px={2}>
        <Logo />
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
      <SidebarItems />
    </Drawer>
  );
};

export default Navigation;

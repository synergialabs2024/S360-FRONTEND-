import { useState } from 'react';
import {
  IconButton,
  Dialog,
  DialogContent,
  Box,
  List,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { IconSearch } from '@tabler/icons-react';
import { useNestedMenu } from '../sidebar/useNestedMenuItems';
import { CustomSearch } from '@/shared/components';
import NavGroup from '../sidebar/components/NavGroup';
import { useUiStore } from '@/store/ui/ui.store';

const normalizeText = (text: string) => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

const Search = () => {
  // drawer top
  const [showDrawer2, setShowDrawer2] = useState(false);

  const { menuItems } = useNestedMenu();
  const customizer = useUiStore(state => state.state);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const hideMenu: any = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : '';

  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = menuItems
    .map(item => {
      if (searchTerm === '') {
        return item;
      }
      if (item.type === 'group' && item.children) {
        const filteredChildren = item.children
          .map(child => {
            if (child.children) {
              const nestedFiltered = child.children.filter(nestedChild =>
                normalizeText(nestedChild.title).includes(
                  normalizeText(searchTerm),
                ),
              );
              if (nestedFiltered.length > 0) {
                return {
                  ...child,
                  children: nestedFiltered,
                };
              }
            }
            return null;
          })
          .filter(child => child !== null);
        if (filteredChildren.length > 0) {
          return {
            ...item,
            children: filteredChildren,
          };
        }
      }
      return null;
    })
    .filter(item => item !== null);

  const navItems = filteredItems.map(item => {
    if (item && item.type === 'group') {
      return <NavGroup key={item.id} item={item as any} hideMenu={hideMenu} />;
    }
    return (
      <Typography key={item?.id} variant="h6" color="error" align="center">
        Menu Items Error
      </Typography>
    );
  });

  return (
    <>
      <IconButton
        aria-label="show 4 new mails"
        color="inherit"
        aria-controls="search-menu"
        aria-haspopup="true"
        onClick={() => setShowDrawer2(true)}
        size="large"
      >
        <IconSearch size="16" />
      </IconButton>
      <Dialog
        open={showDrawer2}
        onClose={() => setShowDrawer2(false)}
        fullWidth
        maxWidth={'sm'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ sx: { position: 'fixed', top: 30, m: 0 } }}
      >
        <DialogContent className="testdialog">
          <Box p={2} sx={{ maxHeight: '60vh', overflow: 'auto' }}>
            <CustomSearch
              onChange={e => setSearchTerm(e)}
              value={searchTerm}
              text="modulos"
              hideMenu={hideMenu}
            />
            <List sx={{ pt: 0 }} className="sidebarNav">
              {navItems.length > 0 ? (
                navItems
              ) : (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="60vh"
                >
                  <Typography variant="h6" color="textSecondary" align="center">
                    <iframe
                      src="https://lottie.host/embed/9d2ca7c4-7c34-48f7-91d2-e16d3416dad4/hY1PUviu39.json"
                      style={{ border: 'none' }}
                    ></iframe>
                    Módulo no encontrado
                  </Typography>
                </Box>
              )}
            </List>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Search;

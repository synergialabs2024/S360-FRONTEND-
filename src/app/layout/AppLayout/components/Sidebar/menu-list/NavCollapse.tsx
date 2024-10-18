import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useUiStore } from '@/store/ui';
import NavItem from './NavItem';
import { MenuItemType } from './menu-item.interface';
import { NestedMenuItem } from './useNestedMenuItems';

interface NavCollapseProps {
  menu: NestedMenuItem;
  level: number;
}

const NavCollapse: React.FC<NavCollapseProps> = ({ menu, level }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const customization = useUiStore(state => state.customization);
  const openMenus = useUiStore(state => state.openMenus);
  const setOpenMenu = useUiStore(state => state.setOpenMenu);

  const isOpen = openMenus[level] === menu.id;

  const handleClick = () => {
    const newOpen = !isOpen;
    setOpenMenu(level, newOpen ? menu.id : null);
    if (!menu.children || menu.children.length === 0) {
      navigate(menu.url || '');
    }
  };

  const checkOpenForParent = (child: NestedMenuItem[], id: string) => {
    child.forEach(item => {
      if (item.url === pathname) {
        setOpenMenu(level, id);
      } else if (item.children) {
        checkOpenForParent(item.children, id);
      }
    });
  };

  useEffect(() => {
    if (menu.children) {
      menu.children.forEach(item => {
        if (item.children) {
          checkOpenForParent(item.children, menu.id);
        }
        if (item.url === pathname) {
          setOpenMenu(level, menu.id);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, menu.children]);

  const menus = menu.children?.map(item => {
    switch (item.type) {
      case MenuItemType.COLLAPSE:
        return <NavCollapse key={item.id} menu={item} level={level + 1} />;
      case MenuItemType.ITEM:
        return <NavItem key={item.id} item={item} level={level + 1} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const Icon = menu.icon;
  const menuIcon = menu.icon ? (
    <Icon
      strokeWidth={1.5}
      size="1.3rem"
      style={{ marginTop: 'auto', marginBottom: 'auto' }}
    />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: isOpen ? 8 : 6,
        height: isOpen ? 8 : 6,
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  return (
    <>
      <ListItemButton
        sx={{
          borderRadius: `${customization.borderRadius}px`,
          mb: 0.5,
          backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
          py: level > 1 ? 1 : 1.25,
          pl: `${level * 24}px`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          // alignItems: 'center'
        }}
        selected={isOpen}
        onClick={handleClick}
      >
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <ListItemIcon sx={{ my: 'auto', minWidth: !menu.icon ? 18 : 36 }}>
            {menuIcon}
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant={isOpen ? 'h5' : 'body1'}
                color="inherit"
                sx={{ my: 'auto' }}
              >
                {menu.title}
              </Typography>
            }
            secondary={
              menu.caption && (
                <Typography
                  variant="caption"
                  sx={{ ...(theme.typography as any).subMenuCaption }}
                  display="block"
                  gutterBottom
                >
                  {menu.caption}
                </Typography>
              )
            }
            sx={{ flex: 1 }}
          />
        </div>
        {isOpen ? (
          <IconChevronUp
            stroke={1.5}
            size="1rem"
            style={{ marginTop: 'auto', marginBottom: 'auto' }}
          />
        ) : (
          <IconChevronDown
            stroke={1.5}
            size="1rem"
            style={{ marginTop: 'auto', marginBottom: 'auto' }}
          />
        )}
      </ListItemButton>

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{
            position: 'relative',
            '&:after': {
              content: "''",
              position: 'absolute',
              left: '32px',
              top: 0,
              height: '100%',
              width: '1px',
              opacity: 1,
              background: theme.palette.primary.light,
            },
          }}
        >
          {menus}
        </List>
      </Collapse>
    </>
  );
};

export default NavCollapse;

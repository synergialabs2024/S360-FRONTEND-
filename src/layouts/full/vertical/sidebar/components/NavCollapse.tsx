import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useUiStore } from '@/store/ui/ui.store';
import { MenuItemType } from './../menu-item.interface';
import { NestedMenuItem } from './../useNestedMenuItems';
import NavItem from './NavItem';
import { useTranslation } from 'react-i18next';

interface NavCollapseProps {
  menu: NestedMenuItem;
  level: number;
  hideMenu?: any;
}

const NavCollapse: React.FC<NavCollapseProps> = ({ menu, level, hideMenu }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const customizer = useUiStore(state => state.state);
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
        return (
          <NavItem
            key={item.id}
            item={item}
            level={level + 1}
            hideMenu={hideMenu}
          />
        );
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

  const ListItemStyled = styled(ListItemButton)(() => ({
    marginBottom: '2px',
    padding: '8px 10px',
    paddingLeft: hideMenu ? '10px' : level > 2 ? `${level * 15}px` : '10px',
    backgroundColor: isOpen && level < 2 ? theme.palette.primary.main : '',
    whiteSpace: 'nowrap',
    '&:hover': {
      backgroundColor:
        pathname.includes(menu.url ?? '') || isOpen
          ? theme.palette.primary.main
          : theme.palette.primary.light,
      color:
        pathname.includes(menu.url ?? '') || isOpen
          ? 'white'
          : theme.palette.primary.main,
    },
    color:
      isOpen && level < 2
        ? 'white'
        : level > 1 && isOpen
          ? theme.palette.primary.main
          : theme.palette.text.secondary,

    borderRadius: `${customizer.borderRadius}px`,
  }));

  return (
    <>
      <ListItemStyled
        onClick={handleClick}
        selected={pathname === menu.url}
        key={menu?.id}
      >
        <ListItemIcon
          sx={{
            minWidth: '36px',
            p: '3px 0',
            color: 'inherit',
          }}
        >
          {menuIcon}
        </ListItemIcon>
        <ListItemText color="inherit">
          {hideMenu ? '' : <>{t(`${menu.title}`)}</>}
        </ListItemText>
        {isOpen ? (
          <IconChevronUp size="1rem" />
        ) : (
          <IconChevronDown size="1rem" />
        )}
      </ListItemStyled>

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        {menus}
      </Collapse>
    </>
  );
};

export default NavCollapse;

import { ListSubheader, styled, Theme } from '@mui/material';
import { List, Typography } from '@mui/material';
import NavCollapse from './NavCollapse';

import { IconDots } from '@tabler/icons-react';
import NavItem from './NavItem';
// project imports

interface MenuItem {
  id: string;
  title?: string;
  caption?: string;
  type: 'collapse' | 'item';
  children?: MenuItem[];
}

interface NavGroupProps {
  item: MenuItem;
  hideMenu?: boolean;
}

const NavGroup: React.FC<NavGroupProps> = ({ item, hideMenu }) => {
  const ListSubheaderStyle = styled((props: Theme | any) => (
    <ListSubheader disableSticky {...props} />
  ))(({ theme }) => ({
    ...theme.typography.overline,
    fontWeight: '700',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(0),
    color: 'text.Primary',
    lineHeight: '26px',
    padding: '3px 12px',
    marginLeft: hideMenu ? '' : '-10px',
  }));

  // menu list collapse & items
  const items = item.children?.map(menu => {
    switch (menu.type) {
      case 'collapse':
        return (
          <NavCollapse
            key={menu.id}
            menu={menu as any}
            level={1}
            hideMenu={hideMenu}
          />
        );
      case 'item':
        return (
          <NavItem
            key={menu.id}
            item={menu as any}
            level={1}
            hideMenu={hideMenu}
          />
        );
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      <List
        subheader={
          item.title && (
            <ListSubheaderStyle>
              {hideMenu ? <IconDots size="14" /> : item?.title}
            </ListSubheaderStyle>
          )
        }
      >
        {items}
      </List>
    </>
  );
};

export default NavGroup;

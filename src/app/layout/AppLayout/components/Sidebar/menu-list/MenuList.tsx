import { Typography } from '@mui/material';

import NavGroup from './NavGroup';
import { useNestedMenu } from './useNestedMenuItems';

export type MenuListProps = {};

const MenuList: React.FC<MenuListProps> = () => {
  const { menuItems } = useNestedMenu();

  const navItems = menuItems.map(item => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item as any} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;

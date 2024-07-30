import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import NavCollapse from './NavCollapse';
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
}

const NavGroup: React.FC<NavGroupProps> = ({ item }) => {
  const theme = useTheme();

  // menu list collapse & items
  const items = item.children?.map(menu => {
    switch (menu.type) {
      case 'collapse':
        return <NavCollapse key={menu.id} menu={menu as any} level={1} />;
      case 'item':
        return <NavItem key={menu.id} item={menu as any} level={1} />;
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
            <Typography
              variant="caption"
              sx={{ ...(theme.typography as any).menuCaption }}
              display="block"
              gutterBottom
            >
              {item.title}
              {item.caption && (
                <Typography
                  variant="caption"
                  sx={{ ...(theme.typography as any).subMenuCaption }}
                  display="block"
                  gutterBottom
                >
                  {item.caption}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {items}
      </List>

      {/* group divider */}
      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </>
  );
};

export default NavGroup;

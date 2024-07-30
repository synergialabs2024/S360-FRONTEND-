import { ReactElement, forwardRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Chip } from '@/shared/components/template';
import { useUiStore } from '@/store/ui';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

interface NavItemProps {
  item: {
    id: string;
    title: string;
    icon?: any;
    url?: string;
    target?: boolean;
    external?: boolean;
    disabled?: boolean;
    caption?: string;
    chip?: {
      color: 'primary' | 'secondary' | 'default';
      variant: 'outlined' | 'filled';
      size: 'small' | 'medium' | 'large';
      label: string;
      avatar?: string;
    };
  };
  level: number;
}

const NavItem = ({ item, level }: NavItemProps): ReactElement => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const customization = useUiStore(s => s.customization);
  const setCustomization = useUiStore(s => s.setCustomization);

  const Icon = item.icon;
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size="1.3rem" />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width:
          customization.isOpen.findIndex((id: string) => id === item?.id) > -1
            ? 8
            : 6,
        height:
          customization.isOpen.findIndex((id: string) => id === item?.id) > -1
            ? 8
            : 6,
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps: any = {
    component: forwardRef<HTMLAnchorElement, any>((props, ref) => (
      <Link ref={ref} {...props} to={item.url!} target={itemTarget} />
    )),
  };
  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  }

  const itemHandler = (id: string) => {
    setCustomization({
      ...customization,
      isOpen: [id],
    });
  };

  // active menu item on page load
  useEffect(() => {
    if (pathname === item.url) {
      setCustomization({
        ...customization,
        isOpen: [item.id],
      });
    }
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: `${customization.borderRadius}px`,
        mb: 0.5,
        alignItems: 'flex-start',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`,
      }}
      selected={
        customization.isOpen.findIndex((id: string) => id === item.id) > -1
      }
      onClick={() => itemHandler(item.id)}
    >
      <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>
        {itemIcon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            variant={
              customization.isOpen.findIndex((id: string) => id === item.id) >
              -1
                ? 'h5'
                : 'body1'
            }
            color="inherit"
          >
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography
              variant="caption"
              sx={{ ...(theme.typography as any).subMenuCaption }}
              display="block"
              gutterBottom
            >
              {item.caption}
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

export default NavItem;

import { ReactElement, forwardRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Chip } from '@/shared/components/template';
import { useUiStore } from '@/store/ui';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import { styled, List } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { IconPoint } from '@tabler/icons-react';

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
  hideMenu?: any;
}

const NavItem = ({ item, level, hideMenu }: NavItemProps): ReactElement => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { pathname } = useLocation();
  const customization = useUiStore(s => s.customization);
  const setCustomization = useUiStore(s => s.setCustomization);

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

  const ListItemStyled = styled(ListItemButton)(() => ({
    whiteSpace: 'nowrap',
    marginBottom: '2px',
    padding: '8px 10px',
    borderRadius: `${customization.borderRadius}px`,
    backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
    color:
      level > 1 && pathname === item?.url
        ? `${theme.palette.primary.main}!important`
        : theme.palette.text.secondary,
    paddingLeft: level > 2 ? `${level * 15}px` : '10px',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.main,
    },
    '&.Mui-selected': {
      color: 'white',
      backgroundColor: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
      },
    },
  }));

  return (
    <List component="li" disablePadding key={item?.id && item.title}>
      <ListItemStyled
        {...listItemProps}
        disabled={item?.disabled}
        selected={pathname === item.url}
        onClick={() => itemHandler(item.id)}
      >
        <ListItemIcon
          sx={{
            minWidth: '36px',
            p: '3px 0',
            color:
              level > 1 && pathname === item.url
                ? `${theme.palette.primary.main}!important`
                : 'inherit',
          }}
        >
          <IconPoint stroke={1.5} size="1rem" />
        </ListItemIcon>
        <ListItemText
          sx={{
            whiteSpace: 'normal',
            wordWrap: 'break-word',
          }}
        >
          {hideMenu ? '' : <>{t(`${item?.title}`)}</>}
        </ListItemText>
        {item.chip && (
          <Chip
            color={item.chip.color}
            variant={item.chip.variant}
            size={item.chip.size}
            label={item.chip.label}
            avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
          />
        )}
      </ListItemStyled>
    </List>
  );
};

export default NavItem;

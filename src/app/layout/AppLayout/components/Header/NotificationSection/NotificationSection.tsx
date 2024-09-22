import { useSocket } from '@/context/SocketContext';
import { getEnvs, UserRolesEnumChoice } from '@/shared';
import { MainCard } from '@/shared/components/template';
import { useAuthStore } from '@/store/auth';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import CircularProgress from '@mui/material/CircularProgress';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grid from '@mui/material/Grid';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IconBell } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NotificacionVentaUsuarioSocket } from './notification-sales.interface';

const { VITE_ERPAPI_URL } = getEnvs();

const notificationSound = 'src/assets/sounds/notification.mp3';

const NotificationSection = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!open) {
      setAnchorEl(null);
    }
  }, [open]);

  // notificaciones ------------------------
  const [notificaciones, setNotificaciones] = useState<any[]>([]);
  const [sinLeer, setSinLeer] = useState(0);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore(s => s.user);
  const token = useAuthStore(s => s.token);

  // socketio
  const socket = useSocket();

  useEffect(() => {
    const fetchNotificaciones = async () => {
      setLoading(true);
      const response = await fetch(
        `${VITE_ERPAPI_URL}/notificacion-usuario/?destinatario=${user?.id!}&page_size=55&leida=false`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      const data = await response.json();
      const items = data.data.items;
      setNotificaciones(items);

      const sinLeerCount = data.data.items.filter(
        (notif: any) => !notif.leida,
      ).length;
      setSinLeer(sinLeerCount);
      setLoading(false);
    };

    fetchNotificaciones();
  }, [token, user]);

  useEffect(() => {
    if (!socket || !user) return;

    socket.on(
      'recibir_notificacion_ventas',
      (data: NotificacionVentaUsuarioSocket) => {
        const sound = new Audio(notificationSound);

        data?.destinatario_data?.role === UserRolesEnumChoice.SUPERVISOR &&
          sound.play();

        setSinLeer(prev => prev + 1);
      },
    );

    return () => {
      socket.off('recibir_notificacion_ventas');
    };
  }, [socket, user]);

  return (
    <>
      <Box
        sx={{
          ml: 2,
          mr: 3,
          [theme.breakpoints.down('md')]: {
            mr: 2,
          },
        }}
      >
        <ButtonBase sx={{ borderRadius: '12px' }}>
          <Badge
            badgeContent={
              loading ? (
                <CircularProgress
                  size={12}
                  sx={{
                    color: 'white',
                  }}
                />
              ) : (
                sinLeer
              )
            }
            color="error"
          >
            <Avatar
              variant="rounded"
              sx={{
                ...(theme.typography as any).commonAvatar,
                ...(theme.typography as any).mediumAvatar,
                transition: 'all .2s ease-in-out',
                background: theme.palette.secondary.light,
                color: theme.palette.secondary.dark,
                '&[aria-controls="menu-list-grow"],&:hover': {
                  background: theme.palette.secondary.dark,
                  color: theme.palette.secondary.light,
                },
              }}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              color="inherit"
            >
              <IconBell stroke={1.5} size="1.3rem" />
            </Avatar>
          </Badge>
        </ButtonBase>
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: matchesXs ? 'center' : 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: matchesXs ? 'center' : 'right',
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <MainCard
            border={false}
            elevation={16}
            content={false}
            boxShadow
            shadow={theme.shadows[16]}
          >
            <Grid container direction="column" spacing={2}>
              <Grid item xs={12}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ pt: 2, px: 2 }}
                >
                  <Grid item>
                    <h1>Sin leer: {sinLeer}</h1>
                  </Grid>
                  <Grid item>
                    <h1>Notificaciones: {notificaciones?.length}</h1>
                  </Grid>
                  <Grid item>
                    <Typography
                      component={Link}
                      to="#"
                      variant="subtitle2"
                      color="primary"
                    >
                      Mark as all read
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </MainCard>
        </ClickAwayListener>
      </Popover>
    </>
  );
};

export default NotificationSection;

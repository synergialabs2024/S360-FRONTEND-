import {
  alpha,
  Grid,
  Menu,
  MenuItem,
  MenuProps,
  styled,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { IoEllipsisVerticalCircleOutline } from 'react-icons/io5';

import {
  gridSizeMdLg1,
  gridSizeMdLg5,
  gridSizeMdLg6,
  LINEA_SERVICIO_ARRAY_CHOICES,
  LineaServicio,
  LineaServicioEnumChoice,
} from '@/shared';
import { ChipModelState, SingleIconButton } from '@/shared/components';
import ConfirmActivacionClienteModal from '../form/ConfirmActivacionClienteModal';

export type LineStateClientProps = {
  serviceLine: LineaServicio;
};

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, ' +
      'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, ' +
      'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, ' +
      'rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const LineStateClient: React.FC<LineStateClientProps> = ({ serviceLine }) => {
  ///* states ---------------------
  const [isOpenRejectModal, setIsOpenRejectModal] = useState(false);

  ///* local state ----------------
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const onClicks = {
    [LineaServicioEnumChoice.ACTIVO]: () => {
      setIsOpenRejectModal(true);
    },
    [LineaServicioEnumChoice.RETIRADO]: () => {
      alert('RETIRADO');
    },
    [LineaServicioEnumChoice.SUSPENDIDO]: () => {
      setIsOpenRejectModal(true);
    },
    [LineaServicioEnumChoice.RETENCION]: () => {
      alert('RETENCION');
    },
    [LineaServicioEnumChoice.NO_INSTALADO]: () => {
      alert('NO_INSTALADO');
    },
  };
  const menuItems = LINEA_SERVICIO_ARRAY_CHOICES.filter(
    item => item === LineaServicioEnumChoice.ACTIVO, // Solo incluir la opción de "ACTIVAR"
  ).map((item: LineaServicioEnumChoice) => {
    return {
      label: 'ACTIVAR',
      onClick: onClicks[item],
    };
  });

  ///* handlers ----------------
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid item container spacing={2} alignItems="center" mb={4}>
      <Grid item {...gridSizeMdLg6}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 500, color: 'text.secondary' }}
        >
          ESTADO DEL SERVICIO:
        </Typography>
      </Grid>
      <Grid item {...gridSizeMdLg5}>
        <ChipModelState
          label={serviceLine.estado_linea}
          color={
            serviceLine.estado_linea === LineaServicioEnumChoice.ACTIVO
              ? 'success'
              : serviceLine.estado_linea === LineaServicioEnumChoice.RETIRADO
                ? 'error'
                : serviceLine.estado_linea ===
                    LineaServicioEnumChoice.SUSPENDIDO
                  ? 'warning'
                  : serviceLine.estado_linea ===
                      LineaServicioEnumChoice.RETENCION
                    ? 'info'
                    : 'primary'
          }
        />
      </Grid>

      <Grid item {...gridSizeMdLg1}>
        <SingleIconButton
          label="Opciones"
          startIcon={<IoEllipsisVerticalCircleOutline />}
          tooltipPlacement="right"
          onClick={handleClick}
        />

        <StyledMenu
          id="linea-servicio-menu"
          MenuListProps={{
            'aria-labelledby': 'linea-servicio-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {menuItems.map(menuItem => (
            <MenuItem
              key={menuItem.label}
              onClick={menuItem.onClick}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
                gap: 2,
              }}
            >
              {menuItem.label}
            </MenuItem>
          ))}
        </StyledMenu>
      </Grid>
      {/* ========================= modals ========================= */}
      <ConfirmActivacionClienteModal
        open={isOpenRejectModal}
        onClose={() => setIsOpenRejectModal(false)}
        serviceLine={serviceLine!}
      />
    </Grid>
  );
};

export default LineStateClient;

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
  LineaServicio,
} from '@/shared';
import { ChipModelState, SingleIconButton } from '@/shared/components';

export type LineStateFibraClientProps = {
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
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
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
        color: theme.palette.text.secondary,
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

const LineStateFibraClient: React.FC<LineStateFibraClientProps> = ({
  serviceLine,
}) => {
  ///* local state ----------------
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const estadoServicio = serviceLine?.estado_linea;
  console.log('estadoServicio:', estadoServicio);

  ///* handlers ----------------
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid item container spacing={2} alignItems="center">
      <Grid item {...gridSizeMdLg6}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 500, color: 'text.secondary' }}
        >
          ESTADO DEL SERVICIO:
        </Typography>
      </Grid>
      <Grid item {...gridSizeMdLg5}>
        <ChipModelState label={serviceLine.estado_linea} />
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
          <MenuItem
            onClick={() => {
              // Acción 1
              handleClose();
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
              gap: 2,
              color: '#1c63ad',
            }}
          >
            Opción 1
          </MenuItem>
          <MenuItem
            onClick={() => {
              // Acción 2
              handleClose();
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
              gap: 2,
              color: '#1c63ad',
            }}
          >
            Opción 2
          </MenuItem>
        </StyledMenu>
      </Grid>
    </Grid>
  );
};

export default LineStateFibraClient;

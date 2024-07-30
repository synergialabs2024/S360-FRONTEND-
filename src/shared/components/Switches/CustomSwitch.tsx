import {
  FormControl,
  Grid,
  Switch,
  SwitchProps,
  Typography,
  styled,
} from '@mui/material';

import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { GridSizeType } from '@/shared/interfaces';

export type CustomSwitchProps = {
  title?: string;
  checked: boolean;
  disabled?: boolean;
  onChangeChecked: (value: boolean) => void;

  size?: GridSizeType;

  isSimpleBoolean?: boolean;
};

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  checked,
  disabled = false,
  onChangeChecked,

  size = gridSizeMdLg6,
  isSimpleBoolean = false,
}) => {
  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.secondary.main
              : theme.palette.secondary.main,
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: theme.palette.secondary.main,
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

  return (
    <Grid item {...size}>
      <>
        <FormControl fullWidth>
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              justifyItems: 'center',
              alignItems: 'center',
            }}
          >
            <IOSSwitch
              sx={{ m: 1 }}
              checked={checked}
              onChange={() => {
                if (disabled) return;
                onChangeChecked(!checked);
              }}
              disabled={disabled}
            />
            <Typography
              style={{ width: '100%' }}
              // variant="subtitle2"
              fontWeight="500"
              fontSize="13px"
            >
              {isSimpleBoolean
                ? checked
                  ? 'SI'
                  : 'NO'
                : checked
                  ? 'ACTIVO'
                  : 'INACTIVO'}
            </Typography>
          </div>
        </FormControl>
      </>
    </Grid>
  );
};

export default CustomSwitch;

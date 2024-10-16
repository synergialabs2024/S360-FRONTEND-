import {
  FormControl,
  Grid,
  ToggleButton,
  Typography,
  Box,
  Tooltip,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
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
  return (
    <Grid item {...size}>
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
          {/* ToggleButton Activo */}
          <Tooltip
            title={
              isSimpleBoolean ? (checked ? '' : 'SI') : checked ? '' : 'ACTIVO'
            }
          >
            <span>
              <ToggleButton
                value="active"
                selected={checked}
                onClick={() => {
                  if (disabled || checked) return;
                  onChangeChecked(true);
                }}
                disabled={disabled}
                color={checked ? 'success' : 'primary'}
                sx={{
                  '&:hover': {
                    color: checked
                      ? theme => theme.palette.success.main
                      : theme => theme.palette.success.main,
                    backgroundColor: checked
                      ? theme => theme.palette.success.light
                      : theme => theme.palette.success.light,
                  },
                }}
                size="small"
              >
                <CheckIcon />
              </ToggleButton>
            </span>
          </Tooltip>
          <Box px={0.4}></Box>
          {/* ToggleButton Inactivo */}
          <Tooltip
            title={
              isSimpleBoolean
                ? checked
                  ? 'NO'
                  : ''
                : checked
                  ? 'INACTIVO'
                  : ''
            }
          >
            <span>
              <ToggleButton
                value="inactive"
                selected={!checked}
                onClick={() => {
                  if (disabled || !checked) return;
                  onChangeChecked(false);
                }}
                disabled={disabled}
                color={checked ? 'primary' : 'error'}
                sx={{
                  '&:hover': {
                    color: !checked
                      ? theme => theme.palette.error.main
                      : theme => theme.palette.error.main,
                    backgroundColor: !checked
                      ? theme => theme.palette.primary.main
                      : theme => theme.palette.error.light,
                  },
                }}
                size="small"
              >
                <CloseIcon />
              </ToggleButton>
            </span>
          </Tooltip>
          <Box px={0.4}></Box>
          {/* Estado seleccionado */}
          <Typography
            style={{ width: '100%', textAlign: 'left' }}
            fontWeight="500"
            fontSize="13px"
            color={checked ? 'green' : 'error'}
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
    </Grid>
  );
};

export default CustomSwitch;

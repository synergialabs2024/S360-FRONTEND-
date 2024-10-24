import { Grid, InputAdornment, TextField } from '@mui/material';

import { gridSizeMdLg6 } from '@/shared/constants';
import {
  GridSizeType,
  SxPropsThemeType,
  TextFieldVariantType,
} from '@/shared/interfaces';
import { CustomFormLabel } from '../../Labels';

export type CustomTextFieldNoFormProps = {
  label: string;
  value?: string | number;
  defaultValue?: string;

  required?: boolean;
  type?: string;
  shrink?: boolean;
  disabled?: boolean;
  size?: GridSizeType;
  variant?: TextFieldVariantType;
  sxTextField?: SxPropsThemeType;

  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
};

const CustomTextFieldNoForm: React.FC<CustomTextFieldNoFormProps> = ({
  label,
  value,
  defaultValue,
  type = 'text',
  shrink = false,
  disabled = false,
  required = true,
  size = gridSizeMdLg6,
  variant = 'outlined',
  sxTextField,
  startAdornment,
  endAdornment,
}) => {
  return (
    <>
      <Grid item {...size}>
        <CustomFormLabel
          sx={{
            mt: 0,
          }}
          htmlFor={label}
          required={required}
        >
          {label}
        </CustomFormLabel>

        <TextField
          fullWidth
          variant={variant}
          value={value || ''}
          defaultValue={defaultValue}
          required={required}
          InputLabelProps={{
            ...(shrink && { shrink: true }),
          }}
          type={type}
          InputProps={{
            ...(startAdornment && {
              startAdornment: (
                <InputAdornment position="start">
                  {startAdornment}
                </InputAdornment>
              ),
            }),

            endAdornment: endAdornment ? (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            ) : null,
          }}
          inputProps={{ readOnly: disabled }}
          sx={{
            ...sxTextField,
            ...(disabled && { background: 'rgba(0, 0, 0, 0.04)' }),
          }}
        />
      </Grid>
    </>
  );
};

export default CustomTextFieldNoForm;

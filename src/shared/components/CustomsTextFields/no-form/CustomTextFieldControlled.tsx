import React from 'react';
import { Grid, InputAdornment, TextField } from '@mui/material';

import { gridSizeMdLg6 } from '@/shared/constants';
import {
  GridSizeType,
  SxPropsThemeType,
  TextFieldVariantType,
} from '@/shared/interfaces';
import { CustomFormLabel } from '../../Labels';

export type CustomTextFieldControlledProps = {
  label: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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

const CustomTextFieldControlled: React.FC<CustomTextFieldControlledProps> = ({
  label,
  value,
  onChange,
  required = true,
  type = 'text',
  shrink = false,
  disabled = false,
  size = gridSizeMdLg6,
  variant = 'outlined',
  sxTextField,
  startAdornment,
  endAdornment,
}) => {
  return (
    <Grid item {...size}>
      <CustomFormLabel sx={{ mt: 0 }} htmlFor={label} required={required}>
        {label}
      </CustomFormLabel>

      <TextField
        fullWidth
        variant={variant}
        value={value}
        onChange={onChange}
        required={required}
        type={type}
        InputLabelProps={{
          ...(shrink && { shrink: true }),
        }}
        InputProps={{
          ...(startAdornment && {
            startAdornment: (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            ),
          }),
          endAdornment: endAdornment ? (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ) : null,
        }}
        disabled={disabled}
        sx={{
          ...sxTextField,
          ...(disabled && { background: 'rgba(0, 0, 0, 0.04)' }),
        }}
      />
    </Grid>
  );
};

export default CustomTextFieldControlled;

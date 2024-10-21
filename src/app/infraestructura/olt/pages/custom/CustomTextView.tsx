import { Theme } from '@emotion/react';
import {
  FormControl,
  Grid,
  InputAdornment,
  SxProps,
  TextField,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { MdEmail } from 'react-icons/md';

import { gridSize } from '@/shared/constants/ui';
import { GridSizeType, SxPropsThemeType } from '@/shared/interfaces';

type CustomTextViewProps = {
  disabled?: boolean;
  shrink?: boolean;
  required?: boolean;

  type?: React.HTMLInputTypeAttribute;

  size?: GridSizeType;

  control: any;
  name: string;
  defaultValue?: string | number; // Acepta string o number

  sizeTextField?: 'medium' | 'small';

  sxTextField?: SxProps<Theme> | undefined;
  placeholder?: string;

  startAdornmentInput?: React.ReactNode;
  endAdornmentInput?: React.ReactNode;

  sxGrid?: SxPropsThemeType;
  InputProps?: any;
};

const CustomTextView: React.FC<CustomTextViewProps> = ({
  required = true,
  disabled = false,
  shrink = false,
  size = gridSize,
  type = 'text',

  control,
  name,
  defaultValue,
  sizeTextField = 'medium',

  sxTextField,
  placeholder,

  startAdornmentInput,
  endAdornmentInput,

  sxGrid,
  InputProps,
}) => {
  return (
    <Grid item {...size} sx={sxGrid}>
      <FormControl fullWidth variant="outlined">
        <Controller
          control={control}
          name={name!}
          defaultValue={defaultValue || ''} // Inicializa con el valor predeterminado
          render={({ field }) => {
            return (
              <TextField
                {...field}
                value={field.value || ''} // Asegura que acepte tanto string como number
                size={sizeTextField}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  ...(shrink && { shrink: true }),
                }}
                InputProps={{
                  ...InputProps,
                  startAdornment:
                    type === 'email' ? (
                      <InputAdornment position="start">
                        <MdEmail />
                      </InputAdornment>
                    ) : (
                      (startAdornmentInput ?? null)
                    ),
                  endAdornment: endAdornmentInput ?? null,
                }}
                type={type}
                required={required}
                inputProps={{ readOnly: disabled }}
                sx={{
                  ...(sxTextField as any),
                  ...(disabled && {
                    background: 'rgba(0, 0, 0, 0.04)',
                    borderRadius: '13px',
                  }),
                }}
                placeholder={placeholder}
              />
            );
          }}
        ></Controller>
      </FormControl>
    </Grid>
  );
};

export default CustomTextView;

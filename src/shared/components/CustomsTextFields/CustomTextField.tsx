import { Theme } from '@emotion/react';
import {
  FormControl,
  Grid,
  InputAdornment,
  SxProps,
  TextField,
} from '@mui/material';
import { Controller, FieldError } from 'react-hook-form';
import { MdEmail } from 'react-icons/md';

import { gridSize } from '@/shared/constants/ui';
import { GridSizeType, SxPropsThemeType } from '@/shared/interfaces';
import { useState } from 'react';

type CustomTextFieldProps = {
  label: string;
  error: FieldError | undefined;
  helperText: React.ReactNode;
  disabled?: boolean;
  shrink?: boolean;
  required?: boolean;

  type?: React.HTMLInputTypeAttribute;

  size?: GridSizeType;

  control: any;
  name: string;
  defaultValue?: string;
  onChangeValue?: (value: any) => void;

  sizeTextField?: 'medium' | 'small';

  sxTextField?: SxProps<Theme> | undefined;
  placeholder?: string;

  startAdornmentInput?: React.ReactNode;
  endAdornmentInput?: React.ReactNode;

  ignoreTransform?: boolean;
  defaultHelperText?: string;

  sxGrid?: SxPropsThemeType;
  InputProps?: any;
};

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  error,
  helperText,
  required = true,
  disabled = false,
  shrink = false,
  size = gridSize,
  type = 'text',
  ignoreTransform = false,

  control,
  name,
  defaultValue,
  onChangeValue,
  sizeTextField = 'medium',

  sxTextField,
  placeholder,

  startAdornmentInput,
  endAdornmentInput,
  defaultHelperText,

  sxGrid,
  InputProps,
}) => {
  const [emailError, setEmailError] = useState<boolean>(false);

  return (
    <Grid item {...size} sx={sxGrid}>
      <FormControl fullWidth variant="outlined">
        <Controller
          control={control}
          name={name!}
          defaultValue={defaultValue || ''}
          render={({ field }) => {
            const onChange = (event: any) => {
              const currentValue = event.target.value;

              if (ignoreTransform) {
                onChangeValue && onChangeValue(currentValue);
                return field.onChange(currentValue);
              }

              if (type === 'email') {
                const emailRegex =
                  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                setEmailError(!emailRegex.test(currentValue));

                onChangeValue && onChangeValue(currentValue);
                return field.onChange(currentValue);
              }

              if (type === 'number' || type === 'password') {
                onChangeValue && onChangeValue(currentValue?.toUpperCase());
                return field.onChange(currentValue);
              }

              field.onChange(currentValue.toUpperCase());

              onChangeValue && onChangeValue(currentValue?.toUpperCase());
            };

            return (
              <TextField
                {...field}
                size={sizeTextField}
                fullWidth
                variant="outlined"
                label={label}
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
                      startAdornmentInput ?? null
                    ),

                  endAdornment: endAdornmentInput ?? null,
                }}
                error={!!error || emailError}
                helperText={
                  emailError
                    ? 'Correo electrónico inválido'
                    : helperText || defaultHelperText
                }
                type={type}
                onChange={onChange}
                required={required}
                inputProps={{
                  readOnly: disabled,
                  style: {
                    ...(sxTextField as any),
                    ...(disabled && { background: 'rgba(0, 0, 0, 0.03)' }),
                  },
                }}
                sx={sxTextField}
                placeholder={placeholder}
              />
            );
          }}
        ></Controller>
      </FormControl>
    </Grid>
  );
};

export default CustomTextField;

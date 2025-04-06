import { FormControl, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { Controller, FieldError } from 'react-hook-form';

import { gridSize } from '@/shared/constants/ui';
import { GridSizeType, SxPropsThemeType } from '@/shared/interfaces';
import debounce from 'lodash/debounce';
import { useEffect, useMemo } from 'react';
import { CustomFormLabel } from '../Labels';

type CustomCoordsTextFieldProps = {
  label: string;
  error: FieldError | undefined;
  helperText: React.ReactNode;
  disabled?: boolean;
  shrink?: boolean;
  required?: boolean;

  size?: GridSizeType;

  control: any;
  name: string;
  defaultValue: string | number;
  onChangeValue?: (value: any, isValidCoords: boolean) => void;

  sizeTextField?: 'medium' | 'small';
  startAdornment?: React.ReactNode;

  sxTextField?: SxPropsThemeType;
  placeholder?: string;

  startAdornmentInput?: React.ReactNode;
  endAdornmentInput?: React.ReactNode;

  overrideAsPassword?: boolean;
  defaultHelperText?: string;

  sxGrid?: SxPropsThemeType;
};

const CustomCoordsTextField: React.FC<CustomCoordsTextFieldProps> = ({
  label,
  error,
  helperText,
  required = true,
  disabled = false,
  shrink = false,
  size = gridSize,

  control,
  name,
  defaultValue,
  onChangeValue,
  sizeTextField = 'medium',

  startAdornment,
  sxTextField,
  placeholder,

  startAdornmentInput,
  endAdornmentInput,
  defaultHelperText,

  sxGrid,
}) => {
  const [isInvalidInputValue, setIsInvalidInputValue] = useState(false);

  const debouncedOnChangeValue = useMemo(() => {
    return debounce((val: string, isValid: boolean) => {
      onChangeValue && onChangeValue(val, isValid);
    }, 600);
  }, [onChangeValue]);

  useEffect(() => {
    return () => {
      debouncedOnChangeValue.cancel();
    };
  }, [debouncedOnChangeValue]);

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

              // Verificar si la coordenada es válida
              const regex: RegExp =
                /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
              const isValid = regex.test(currentValue);
              setIsInvalidInputValue(!isValid);
              debouncedOnChangeValue(currentValue, isValid);
              return field.onChange(currentValue);
            };

            return (
              <>
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
                  {...field}
                  size={sizeTextField}
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    ...(shrink && { shrink: true }),
                    ...(startAdornment && { startAdornment }),
                  }}
                  InputProps={{
                    startAdornment: startAdornmentInput ?? null,
                    endAdornment: endAdornmentInput ?? null,
                  }}
                  error={isInvalidInputValue || !!error}
                  helperText={
                    isInvalidInputValue
                      ? "Ingresar una coordenada válida. Ej: '-0.3142,-78.4702'"
                      : helperText || defaultHelperText
                  }
                  type="text"
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
              </>
            );
          }}
        />
      </FormControl>
    </Grid>
  );
};

export default CustomCoordsTextField;

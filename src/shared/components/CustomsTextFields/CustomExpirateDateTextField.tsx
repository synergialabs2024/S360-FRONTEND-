import { Theme } from '@emotion/react';
import { FormControl, Grid, SxProps, TextField } from '@mui/material';
import { useState } from 'react';
import { Controller, FieldError } from 'react-hook-form';

import { gridSize } from '@/shared/constants/ui';
import { GridSizeType, SxPropsThemeType } from '@/shared/interfaces';
import { CustomFormLabel } from '../Labels';

type CustomExpirateDateTextFieldProps = {
  label: string;
  error: FieldError | undefined;
  helperText: React.ReactNode;
  disabled?: boolean;
  shrink?: boolean;
  required?: boolean;

  size?: GridSizeType;

  control: any;
  name: string;
  defaultValue?: string;
  onChangeValue?: (value: any) => void;

  sizeTextField?: 'medium' | 'small';
  sxTextField?: SxProps<Theme> | undefined;
  placeholder?: string;

  sxGrid?: SxPropsThemeType;
};

const CustomExpirateDateTextField: React.FC<
  CustomExpirateDateTextFieldProps
> = ({
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
  sxTextField,
  placeholder,
  sxGrid,
}) => {
  const [formattedValue, setFormattedValue] = useState<string>(
    defaultValue || '',
  );

  return (
    <Grid item {...size} sx={sxGrid}>
      <FormControl fullWidth variant="outlined">
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue || ''}
          render={({ field }) => {
            const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
              const currentValue = event.target.value;

              // Eliminar caracteres no numéricos y limitar a 4 caracteres
              const onlyNums = currentValue.replace(/[^0-9]/g, '').slice(0, 4);
              let formatted = '';

              // Formatear a 'MM / YY'
              if (onlyNums.length >= 3) {
                formatted = `${onlyNums.slice(0, 2)}/${onlyNums.slice(2, 4)}`;
              } else {
                formatted = onlyNums;
              }

              setFormattedValue(formatted);
              field.onChange(onlyNums); // Aquí guardamos solo los números para el formulario
              onChangeValue && onChangeValue(onlyNums);
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
                  }}
                  error={!!error}
                  helperText={helperText}
                  onChange={onChange}
                  value={formattedValue} // Mostrar el valor formateado
                  inputProps={{
                    readOnly: disabled,
                    pattern: '\\d{2} / \\d{2}',
                  }}
                  sx={{
                    ...(sxTextField as any),
                    ...(disabled && {
                      background: 'rgba(0, 0, 0, 0.04)',
                      borderRadius: '13px',
                    }),
                  }}
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

export default CustomExpirateDateTextField;

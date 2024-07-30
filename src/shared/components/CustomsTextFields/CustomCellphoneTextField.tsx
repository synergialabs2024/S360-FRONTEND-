import { FormControl, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { Controller, FieldError } from 'react-hook-form';
import { MdCall } from 'react-icons/md';

import { gridSize } from '@/shared/constants/ui';
import { GridSizeType } from '@/shared/interfaces';

type CustomTextFieldProps = {
  label: string;
  error: FieldError | undefined;
  helperText: React.ReactNode;
  disabled?: boolean;
  shrink?: boolean;
  required?: boolean;

  size?: GridSizeType;
  control: any;
  name: string;
  defaultValue?: string | number;
  max?: number;
};

const CustomCellphoneTextField: React.FC<CustomTextFieldProps> = ({
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
  max = 10,
}) => {
  const [errorAux, setErrorAux] = useState<boolean>(!!error);

  return (
    <Grid item {...size}>
      <FormControl fullWidth variant="outlined">
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue ?? ''}
          render={({ field }) => {
            const onChange = (event: any) => {
              if (disabled) return;

              let inputValue = event.target.value;

              // allow empty string
              if (inputValue === '') return field.onChange(inputValue);

              const isNumber =
                /^-?(?!e)[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?$/.test(inputValue);
              if (!isNumber) return;

              // validate phone number - EC
              if (/^\d+$/.test(inputValue)) {
                if (inputValue.length >= max) {
                  inputValue = inputValue.slice(0, max);
                  setErrorAux(false);
                } else if (
                  inputValue.length >= 2 &&
                  !inputValue.startsWith('09')
                ) {
                  inputValue = inputValue.slice(0, 2);
                  helperText =
                    'Los dos primeros caracteres deben empezar con "09"';
                  setErrorAux(true);
                } else {
                  setErrorAux(true);
                  helperText = 'El número debe contener 10 caracteres';
                }

                if (
                  (isNumber && inputValue.length <= 21) ||
                  inputValue === ''
                ) {
                  field.onChange(inputValue);
                }
              }
            };

            return (
              <TextField
                fullWidth
                variant="outlined"
                label={label}
                // disabled={disabled}
                InputProps={{
                  startAdornment: (
                    <>
                      <MdCall /> &nbsp;
                    </>
                  ),
                }}
                InputLabelProps={{
                  ...(shrink && { shrink: true }),
                }}
                {...field}
                error={!!error || errorAux}
                helperText={helperText}
                type={'tel'}
                required={required}
                onChange={onChange}
                // disabled style
                inputProps={{ readOnly: disabled }}
                sx={{
                  ...(disabled && { background: 'rgba(0, 0, 0, 0.04)' }),
                }}
              />
            );
          }}
        ></Controller>
      </FormControl>
    </Grid>
  );
};

export default CustomCellphoneTextField;

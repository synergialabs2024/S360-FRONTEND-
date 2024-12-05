import { FormControl, Grid, TextField } from '@mui/material';
import { Controller, FieldError } from 'react-hook-form';

import { gridSize } from '@/shared/constants';
import { GridSizeType } from '@/shared/interfaces';
import { CustomFormLabel } from '../Labels';

type IdentificacionTextFieldProps = {
  label: string;
  error: FieldError | undefined;
  helperText: React.ReactNode;
  disabled?: boolean;
  shrink?: boolean;
  required?: boolean;

  type?: React.HTMLInputTypeAttribute;

  size?: GridSizeType;

  onFetchCedulaRucInfo?: (value: any) => void;
  control: any;
  name: string;
  defaultValue?: string | number;
  selectedDocumentType?: string;

  onChangeValue?: (value: any) => void;
};

const IdentificacionTextField: React.FC<IdentificacionTextFieldProps> = ({
  label,
  error,
  helperText,
  required = true,
  disabled = false,
  shrink = false,
  size = gridSize,
  type = 'text',
  control,
  name,
  defaultValue,
  onFetchCedulaRucInfo,
  onChangeValue,
}) => {
  return (
    <Grid item {...size}>
      <FormControl fullWidth variant="outlined">
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue || ''}
          render={({ field }) => {
            const onChange = (event: any) => {
              const currentValue = event.target.value;
              const isNumber = /^[0-9]*$/.test(currentValue);

              onChangeValue && onChangeValue(currentValue);

              if (isNumber) {
                if (currentValue.length <= 10) {
                  field.onChange(currentValue);

                  // fetch data from consulta-cedula api
                  currentValue.length === 10 &&
                    onFetchCedulaRucInfo &&
                    onFetchCedulaRucInfo(currentValue);
                }

                if (currentValue.length <= 13) {
                  field.onChange(currentValue);

                  // fetch data from consulta-ruc api
                  currentValue.length === 13 &&
                    onFetchCedulaRucInfo &&
                    onFetchCedulaRucInfo(currentValue);
                }
              }
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
                  fullWidth
                  variant="outlined"
                  // label={label}
                  // disabled={disabled}
                  InputLabelProps={{ ...(shrink && { shrink: true }) }}
                  {...field}
                  error={!!error}
                  helperText={helperText}
                  type={type}
                  required={required}
                  onChange={onChange}
                  // disabled style
                  inputProps={{ readOnly: disabled }}
                  sx={{
                    ...(disabled && {
                      background: 'rgba(0, 0, 0, 0.04)',
                      color: 'black',
                    }),
                  }}
                />
              </>
            );
          }}
        ></Controller>
      </FormControl>
    </Grid>
  );
};

export default IdentificacionTextField;

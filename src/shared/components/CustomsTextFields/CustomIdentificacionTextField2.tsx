import { FormControl, Grid, TextField } from '@mui/material';
import { Controller, FieldError } from 'react-hook-form';

import { gridSizeMdLg6 } from '@/shared/constants';
import { GridSizeType } from '@/shared/interfaces';
import { validarCedulaEcuador } from '@/shared/utils';
import { ToastWrapper } from '@/shared/wrappers';
import { CustomFormLabel } from '../Labels';

type CustomIdentificacionTextField2Props = {
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

  onChange?: (value: any) => void;

  autofocus?: boolean;
};

const CustomIdentificacionTextField2: React.FC<
  CustomIdentificacionTextField2Props
> = ({
  label,
  error,
  helperText,
  required = true,
  disabled = false,
  shrink = false,
  size = gridSizeMdLg6,
  type = 'text',
  onFetchCedulaRucInfo,
  control,
  name,
  defaultValue,
  onChange: onChangeCustom,
  autofocus = false,
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

              onChangeCustom && onChangeCustom(currentValue);

              let isValidCedula = false;
              if (isNumber) {
                if (currentValue.length <= 10) {
                  field.onChange(currentValue);

                  // fetch data from consulta-cedula api
                  if (currentValue.length === 10) {
                    isValidCedula = validarCedulaEcuador(currentValue);
                    !isValidCedula &&
                      ToastWrapper.warning(
                        'Ingrese un número de cédula válido',
                      );
                  }

                  currentValue.length === 10 &&
                    isValidCedula &&
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
                  // disabled={disabled}
                  InputLabelProps={{ ...(shrink && { shrink: true }) }}
                  {...field}
                  error={!!error}
                  helperText={helperText}
                  type={type}
                  required={required}
                  onChange={onChange}
                  autoFocus={autofocus}
                  // disabled style
                  inputProps={{ readOnly: disabled }}
                  sx={{
                    ...(disabled && {
                      background: 'rgba(0, 0, 0, 0.04)',
                      borderRadius: '13px',
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

export default CustomIdentificacionTextField2;

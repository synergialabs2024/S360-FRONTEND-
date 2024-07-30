import { FormControl, Grid, TextField } from '@mui/material';
import { Controller, FieldError } from 'react-hook-form';

import { IdentificationTypeEnumChoice } from '@/shared/constants/app';
import { gridSize } from '@/shared/constants/ui';
import { GridSizeType } from '@/shared/interfaces';

type CustomIdentificacionTextFieldProps = {
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
  selectedDocumentType: string;
};

const CustomIdentificacionTextField: React.FC<
  CustomIdentificacionTextFieldProps
> = ({
  label,
  error,
  helperText,
  required = true,
  disabled = false,
  shrink = false,
  size = gridSize,
  type = 'text',
  onFetchCedulaRucInfo,
  control,
  name,
  defaultValue,
  selectedDocumentType,
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

              if (
                isNumber &&
                selectedDocumentType === IdentificationTypeEnumChoice.CEDULA &&
                currentValue.length <= 10
              ) {
                field.onChange(currentValue);

                // fetch data from consulta-cedula api
                currentValue.length === 10 &&
                  onFetchCedulaRucInfo &&
                  onFetchCedulaRucInfo(currentValue);
              } else if (
                isNumber &&
                selectedDocumentType === IdentificationTypeEnumChoice.RUC &&
                currentValue.length <= 13
              ) {
                field.onChange(currentValue);

                // fetch data from consulta-ruc api
                currentValue.length === 13 &&
                  onFetchCedulaRucInfo &&
                  onFetchCedulaRucInfo(currentValue);
              } else if (
                selectedDocumentType ===
                  IdentificationTypeEnumChoice.PASAPORTE &&
                currentValue.length <= 30
              ) {
                field.onChange(currentValue);
              }
            };

            return (
              <TextField
                fullWidth
                variant="outlined"
                label={label}
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
            );
          }}
        ></Controller>
      </FormControl>
    </Grid>
  );
};

export default CustomIdentificacionTextField;

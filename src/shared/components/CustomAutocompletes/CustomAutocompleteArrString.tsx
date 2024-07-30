import { Autocomplete, Grid, TextField } from '@mui/material';
import { Control, Controller, FieldError } from 'react-hook-form';

import { gridSize } from '@/shared/constants/ui';
import { GridSizeType } from '@/shared/interfaces';

export type CustomAutocompleteArrStringProps = {
  name: string;
  loadingText?: string;
  label: string;
  disabled?: boolean;
  options: string[];

  optionLabelForEdit?: string;
  isLoadingData: boolean;
  onChangeValue?: (value: any) => void;

  error: FieldError | undefined;
  helperText: React.ReactNode;
  required?: boolean;

  textFieldKey?: string;
  defaultValue?: string | number;
  control: Control<any, any>;

  size?: GridSizeType;
  disableClearable?: boolean;
};

function CustomAutocompleteArrString({
  name,
  options,
  isLoadingData,
  error,
  textFieldKey,
  defaultValue,
  control,
  loadingText = 'Cargando...',
  helperText,
  required = true,
  label,
  onChangeValue,
  size = gridSize,
  disabled = false,
  disableClearable = false,
}: CustomAutocompleteArrStringProps) {
  return (
    <Grid item {...size}>
      <Controller
        name={name}
        control={control}
        key={textFieldKey || defaultValue}
        defaultValue={defaultValue || ''}
        render={({ field }) => {
          const onChange = (_event: any, data: any) => {
            field.onChange(data || '');
            onChangeValue && onChangeValue(data);
          };

          return (
            <Autocomplete
              freeSolo
              loading={isLoadingData}
              loadingText={loadingText}
              options={options}
              disableClearable={disableClearable}
              getOptionLabel={(option: any) => option}
              {...field}
              disabled={disabled}
              renderInput={params => (
                <TextField
                  {...params}
                  label={label}
                  variant="outlined"
                  error={!!error}
                  helperText={helperText}
                  required={required}
                  disabled={disabled}
                  sx={{
                    ...(disabled && {
                      background: 'rgba(0, 0, 0, 0.04)',
                      color: 'black',
                    }),
                  }}
                  className={disabled ? 'input-text__disabled' : ''}
                />
              )}
              onChange={onChange}
            />
          );
        }}
      />
    </Grid>
  );
}

export default CustomAutocompleteArrString;

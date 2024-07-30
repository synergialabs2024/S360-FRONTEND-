import { Autocomplete, Grid, TextField } from '@mui/material';
import { Control, Controller, FieldError } from 'react-hook-form';

import { gridSize } from '@/shared/constants/ui';
import { GridSizeType } from '@/shared/interfaces';
import { CustomCircularPorgress } from '../Loaders';

export type CustomAutocompleteProps<T> = {
  name: string;
  loadingText?: string;
  label: string;
  disabled?: boolean;

  options: T[];
  valueKey: keyof T;
  actualValueKey?: keyof T;
  optionLabelForEdit?: string;
  isLoadingData: boolean;
  onChangeValue?: (value: any) => void;
  onChangeRawValue?: (value: T) => void;

  error: FieldError | undefined | any;
  helperText: React.ReactNode;
  required?: boolean;

  textFieldKey?: string;
  defaultValue: string | number | null | undefined;
  control: Control<any, any>;

  size?: GridSizeType;
  disableClearable?: boolean;
};

function CustomAutocomplete<T>({
  name,
  options,
  isLoadingData,
  error,
  textFieldKey,
  defaultValue,
  control,
  loadingText = 'Cargando...',
  optionLabelForEdit,
  valueKey,
  helperText,
  required = true,
  label,
  actualValueKey,
  onChangeValue,
  onChangeRawValue,
  size = gridSize,
  disabled = false,
  disableClearable = false,
}: CustomAutocompleteProps<T>) {
  return (
    <Grid item {...size}>
      {!isLoadingData ? (
        <Controller
          name={name}
          control={control}
          key={textFieldKey || defaultValue || ''}
          defaultValue={defaultValue || ''}
          render={({ field }) => {
            const onChange = (_event: any, data: any) => {
              const selectedValue = data?.[actualValueKey || valueKey] ?? '';

              field.onChange(selectedValue);

              // custom handlers
              onChangeValue && onChangeValue(selectedValue); // label
              onChangeRawValue && onChangeRawValue(data); // T
            };

            return (
              <Autocomplete
                freeSolo
                loading={isLoadingData}
                loadingText={loadingText}
                options={options}
                disableClearable={disableClearable}
                getOptionLabel={(option: any) =>
                  option?.[valueKey] ??
                  options.find(
                    opt => opt[actualValueKey || valueKey] === option,
                  )?.[valueKey] ??
                  optionLabelForEdit ??
                  ''
                }
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
                    // // disabled style
                    disabled={disabled}
                    sx={{
                      ...(disabled && { background: 'rgba(0, 0, 0, 0.04)' }),
                    }}
                  />
                )}
                onChange={onChange}
              />
            );
          }}
        />
      ) : (
        <CustomCircularPorgress />
      )}
    </Grid>
  );
}

export default CustomAutocomplete;

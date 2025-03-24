import { Autocomplete, Grid, InputAdornment, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Control, Controller, FieldError } from 'react-hook-form';
import { CiSearch } from 'react-icons/ci';

import { GridSizeType } from '@/shared/interfaces';
import { CustomFormLabel } from '../Labels';

export type CustomAutocompleteSearchProps<T> = {
  name: string;
  label: string;
  control: Control<any>;
  options: T[];
  valueKey: keyof T;
  actualValueKey?: keyof T;
  isLoading: boolean;
  defaultValue?: string | number;
  onChangeValue?: (value: string | number) => void;
  onChangeInputText?: (input: string) => void;
  onChangeRawValue?: (item: T | null) => void;
  error?: FieldError;
  helperText?: string;
  required?: boolean;
  size?: GridSizeType;
  disabled?: boolean;
  optionLabelForEdit?: string;
};

function CustomAutocompleteSearch<T>({
  name,
  label,
  control,
  options,
  valueKey,
  actualValueKey,
  isLoading,
  defaultValue = '',
  onChangeValue,
  onChangeInputText,
  onChangeRawValue,
  error,
  helperText,
  required = true,
  size = { xs: 12, sm: 6, md: 6, lg: 6 },
  disabled = false,
  optionLabelForEdit,
}: CustomAutocompleteSearchProps<T>) {
  // if (isLoading) {
  //   return (
  //     <Grid item {...size}>
  //       <CircularProgress />
  //     </Grid>
  //   );
  // }

  return (
    <Grid item {...size}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => {
          const handleChange = (_: any, data: T | string | null) => {
            const selectedValue =
              data && typeof data === 'object'
                ? data[actualValueKey || valueKey]
                : data;
            field.onChange(selectedValue || '');
            onChangeValue &&
              onChangeValue((selectedValue as string | number) || '');
            onChangeRawValue && onChangeRawValue(data as T);
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

              <Autocomplete
                freeSolo
                options={options}
                getOptionLabel={option => {
                  if (typeof option === 'string') return option;
                  return (
                    (option as any)?.[valueKey] || optionLabelForEdit || ''
                  );
                }}
                value={
                  options.find(
                    item => item[actualValueKey || valueKey] === field.value,
                  ) || field.value
                }
                onChange={handleChange}
                onInputChange={(_, inputText, reason) => {
                  if (reason === 'input' && onChangeInputText) {
                    onChangeInputText(inputText);
                  } else if (reason === 'clear' && onChangeInputText) {
                    onChangeInputText('');
                  }
                }}
                disabled={disabled}
                loading={isLoading}
                loadingText="Cargando..."
                renderInput={params => (
                  <TextField
                    {...params}
                    // label={label}
                    variant="outlined"
                    error={!!error}
                    helperText={helperText}
                    required={required}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <CiSearch />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <>
                          {isLoading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : (
                            params.InputProps.endAdornment
                          )}
                        </>
                      ),
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            </>
          );
        }}
      />
    </Grid>
  );
}

export default CustomAutocompleteSearch;

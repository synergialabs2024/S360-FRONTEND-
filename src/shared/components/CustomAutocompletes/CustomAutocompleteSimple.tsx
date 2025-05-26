import { Autocomplete, Grid, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

import { gridSize } from '@/shared/constants/ui';
import { GridSizeType } from '@/shared/interfaces';
import { CustomCircularPorgress } from '../Loaders';
import { CustomFormLabel } from '../Labels';

export type CustomAutocompleteSimpleProps<T> = {
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

  required?: boolean;

  textFieldKey?: string;
  defaultValue: string | number | null | undefined;
  control: Control<any, any>;

  size?: GridSizeType;
  disableClearable?: boolean;
};

function CustomAutocompleteSimple<T>({
  name,
  options,
  isLoadingData,
  textFieldKey,
  defaultValue,
  control,
  loadingText = 'Cargando...',
  optionLabelForEdit,
  valueKey,
  required = true,
  label,
  actualValueKey,
  onChangeValue,
  onChangeRawValue,
  size = gridSize,
  disabled = false,
  disableClearable = false,
}: CustomAutocompleteSimpleProps<T>) {
  return (
    <Grid item {...size}>
      {!isLoadingData ? (
        <Controller
          name={name}
          control={control}
          key={textFieldKey || String(defaultValue) || ''}
          defaultValue={defaultValue ?? ''}
          render={({ field }) => {
            const selectedOption =
              options.find(
                opt => opt[actualValueKey || valueKey] === field.value,
              ) || null;

            const handleChange = (_event: any, newValue: any) => {
              const selectedValue =
                newValue?.[actualValueKey || valueKey] ?? '';
              field.onChange(selectedValue);
              onChangeValue?.(selectedValue);
              onChangeRawValue?.(newValue);
            };

            return (
              <>
                <CustomFormLabel
                  sx={{ mt: 0 }}
                  htmlFor={label}
                  required={required}
                >
                  {label}
                </CustomFormLabel>
                <Autocomplete
                  options={options}
                  loading={isLoadingData}
                  loadingText={loadingText}
                  disableClearable={disableClearable}
                  value={selectedOption}
                  getOptionLabel={(option: any) => {
                    const labelValue =
                      option?.[valueKey] ??
                      options.find(
                        opt => opt[actualValueKey || valueKey] === option,
                      )?.[valueKey] ??
                      optionLabelForEdit ??
                      '';
                    return typeof labelValue === 'string'
                      ? labelValue
                      : String(labelValue);
                  }}
                  onChange={handleChange}
                  disabled={disabled}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="outlined"
                      required={required}
                      disabled={disabled}
                      sx={{
                        '& .MuiInputBase-input.Mui-disabled': {
                          WebkitTextFillColor: 'rgba(0, 0, 0, 0.8)',
                        },
                        ...(disabled && {
                          background: 'rgba(0, 0, 0, 0.04)',
                          borderRadius: '13px',
                        }),
                      }}
                    />
                  )}
                />
              </>
            );
          }}
        />
      ) : (
        <CustomCircularPorgress />
      )}
    </Grid>
  );
}

export default CustomAutocompleteSimple;

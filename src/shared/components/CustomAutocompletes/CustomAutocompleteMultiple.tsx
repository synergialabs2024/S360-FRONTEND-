import {
  Autocomplete,
  Checkbox,
  FormControl,
  Grid,
  TextField,
} from '@mui/material';
import { Control, Controller, FieldError } from 'react-hook-form';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

import { gridSize } from '@/shared/constants/ui';
import { GridSizeType } from '@/shared/interfaces';
import { CustomCircularPorgress } from '../Loaders';

export type CustomAutocompleteMultipleProps<T> = {
  options: T[];

  valueKey: keyof T;
  actualValueKey?: keyof T;

  loadingText?: string;
  isLoadingData: boolean;

  optionLabelForEdit?: string;

  // form
  control: Control<any, any>;
  label: string;
  name: string;
  disabled?: boolean;
  onChangeValue?: (value: string) => void;
  onChangeRawValue?: (value: T[]) => void;
  error: FieldError | undefined;
  helperText: React.ReactNode;
  required?: boolean;
  textFieldKey: string;

  size?: GridSizeType;

  limitTags?: number;
  getOptionDisabled?: boolean;

  onlyActualValueKey?: boolean;
};

const icon = <MdCheckBoxOutlineBlank />;
const checkedIcon = <MdCheckBox />;

export default function CustomAutocompleteMultiple<T>({
  options,
  valueKey,
  actualValueKey,
  onlyActualValueKey = false,

  isLoadingData,
  loadingText = 'Cargando...',

  // form
  label,
  name,
  control,
  error,
  helperText,
  required = true,
  disabled = false,
  onChangeRawValue,
  onChangeValue,
  textFieldKey,

  size = gridSize,

  limitTags = 2,
}: CustomAutocompleteMultipleProps<T>) {
  return (
    <>
      <Grid item {...size}>
        {isLoadingData ? (
          <CustomCircularPorgress />
        ) : (
          <FormControl fullWidth>
            <Controller
              name={name}
              control={control}
              key={textFieldKey}
              render={({ field }) => {
                const handleChange = (_event: any, data: T[]) => {
                  if (onlyActualValueKey && actualValueKey) {
                    const selectedValue: T[keyof T][] = data.map(
                      item => item[actualValueKey],
                    );
                    field.onChange(selectedValue);
                    onChangeValue && onChangeValue(selectedValue as any);
                    return;
                  }

                  field.onChange(data);
                  onChangeValue && onChangeValue(data as any);
                  onChangeRawValue && onChangeRawValue(data);
                };

                // Asegurarse de que field.value sea un array
                const value = field.value || [];

                return (
                  <Autocomplete
                    ////* checkbox
                    multiple
                    id="checkboxes-tags"
                    limitTags={limitTags}
                    // // options
                    options={options}
                    loading={isLoadingData}
                    loadingText={loadingText}
                    disableCloseOnSelect
                    // // optional label
                    getOptionLabel={(option: any) => option[valueKey] as any}
                    // // render option checkbox
                    renderOption={(props, option, { selected }) => {
                      const { key, ...rest } = props as any;
                      return (
                        <li key={key} {...rest}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option[valueKey] as any}
                        </li>
                      );
                    }}
                    onChange={handleChange}
                    disabled={disabled}
                    // // // New implementation to avoid default value in this component
                    // // Pass the value from react-hook-form
                    value={
                      options.filter(option => {
                        if (onlyActualValueKey && actualValueKey) {
                          return (value as any[]).includes(
                            option[actualValueKey],
                          );
                        } else {
                          return (value as any[]).includes(option);
                        }
                      }) as T[]
                    }
                    // // text field
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={label}
                        variant="outlined"
                        error={!!error}
                        helperText={helperText}
                        required={required}
                        disabled={disabled}
                      />
                    )}
                  />
                );
              }}
            />
          </FormControl>
        )}
      </Grid>
    </>
  );
}

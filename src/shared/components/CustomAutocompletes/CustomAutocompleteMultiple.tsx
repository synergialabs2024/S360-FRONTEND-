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

export type CustomAutocompleteMultiplepleProps<T> = {
  options: T[];
  defaultValue?: T[];

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
  // optionLabelForEdit,
  label,
  name,
  control,
  defaultValue,
  error,
  helperText,
  required = true,
  disabled = false,
  onChangeRawValue,
  onChangeValue,
  textFieldKey,

  size = gridSize,

  limitTags = 2,
}: CustomAutocompleteMultiplepleProps<T>) {
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
              defaultValue={defaultValue}
              // render
              render={({ field }) => {
                const onChange = (_event: any, data: T[]) => {
                  if (onlyActualValueKey && actualValueKey) {
                    const selectedValue: T[keyof T][] = data.map(
                      item => item[actualValueKey],
                    );
                    field.onChange(selectedValue);
                    onChangeValue && onChangeValue(selectedValue as any);
                    return;
                  }

                  // data is an valid array - parse to string
                  const isThereAnyValue = !!data?.length;
                  const selectedValue: string = isThereAnyValue
                    ? JSON.stringify(data || '[]')
                    : '[]';

                  field.onChange(selectedValue);

                  onChangeValue && onChangeValue(selectedValue); // string
                  onChangeRawValue && onChangeRawValue(data); // T[]
                };

                return (
                  <Autocomplete
                    ////* checkbox
                    multiple
                    id="checkboxes-tags"
                    limitTags={limitTags}
                    defaultValue={defaultValue}
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
                    onChange={onChange}
                    disabled={disabled}
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

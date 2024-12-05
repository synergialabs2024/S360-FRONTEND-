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
import { CustomCircularPorgress } from '../../Loaders';
import { CustomFormLabel } from '../../Labels';

export type SelectArrayChipProps<T> = {
  options: T[];
  defaultValue?: T[];
  valueKey: keyof T;
  actualValueKey?: keyof T;
  titleArray?: (keyof T)[];
  loadingText?: string;
  isLoadingData: boolean;
  control: Control<any, any>;
  label: string;
  name: string;
  disabled?: boolean;
  onChangeValue?: (value: string | any[]) => void;
  onChangeRawValue?: (value: T[]) => void;
  error: FieldError | undefined;
  helperText?: React.ReactNode;
  required?: boolean;
  size?: GridSizeType;
  limitTags?: number;
  shouldStringify?: boolean;
};

const icon = <MdCheckBoxOutlineBlank />;
const checkedIcon = <MdCheckBox />;

const buildTitle = <T,>(
  item: T,
  titleArray: (keyof T)[] | undefined,
): string => {
  if (!titleArray || titleArray.length === 0) return String(item);
  return titleArray
    .map(key => item[key])
    .filter(Boolean)
    .join(' - ');
};

export default function SelectArrayChip<T>({
  options,
  valueKey,
  actualValueKey,
  titleArray,
  isLoadingData,
  loadingText = 'Cargando...',
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
  size = gridSize,
  limitTags = 2,
  shouldStringify = false,
}: SelectArrayChipProps<T>) {
  return (
    <Grid item {...size}>
      {isLoadingData ? (
        <CustomCircularPorgress />
      ) : (
        <FormControl fullWidth>
          <Controller
            name={name}
            control={control}
            key={name}
            defaultValue={defaultValue}
            render={({ field }) => {
              const onChange = (_event: any, data: T[]) => {
                if (actualValueKey) {
                  const selectedValue: T[keyof T][] = data.map(
                    item => item[actualValueKey],
                  );
                  field.onChange(selectedValue);
                  onChangeValue && onChangeValue(selectedValue as any);
                  return;
                }
                if (shouldStringify) {
                  const isThereAnyValue = !!data?.length;
                  const selectedValue: string = isThereAnyValue
                    ? JSON.stringify(data)
                    : '[]';
                  field.onChange(selectedValue);
                  onChangeValue && onChangeValue(selectedValue);
                } else {
                  field.onChange(data);
                  onChangeRawValue && onChangeRawValue(data);
                }
              };

              return (
                <>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor={name}
                    required={required}
                  >
                    {label}
                  </CustomFormLabel>
                  <Autocomplete
                    // checkbox
                    multiple
                    id="checkboxes-tags"
                    //id={`${name}-autocomplete`}
                    limitTags={limitTags}
                    defaultValue={defaultValue}
                    // options
                    options={options}
                    loading={isLoadingData}
                    loadingText={loadingText}
                    disableCloseOnSelect
                    // optional label
                    getOptionLabel={(option: T) =>
                      buildTitle(option, titleArray) ||
                      (option[valueKey] as any)
                    }
                    // render option checkbox
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
                          {buildTitle(option, titleArray)}
                        </li>
                      );
                    }}
                    onChange={onChange}
                    disabled={disabled}
                    // text field
                    renderInput={params => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label={label}
                        error={!!error}
                        helperText={helperText}
                        required={required}
                        disabled={disabled}
                      />
                    )}
                  />
                  {helperText && (
                    <div style={{ marginTop: '8px' }}>{helperText}</div>
                  )}
                  {error && <div style={{ color: 'red' }}>{error.message}</div>}
                </>
              );
            }}
          />
        </FormControl>
      )}
    </Grid>
  );
}

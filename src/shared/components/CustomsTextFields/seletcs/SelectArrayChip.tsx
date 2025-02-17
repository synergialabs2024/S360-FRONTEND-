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
  maxSelectable?: number; // NUEVO: Límite de selección
};

const icon = <MdCheckBoxOutlineBlank />;
const checkedIcon = <MdCheckBox />;

const buildTitle = <T,>(item: T, titleArray?: (keyof T)[]): string => {
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
  maxSelectable = Infinity, // NUEVO: Por defecto, sin límite
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
                if (data.length > maxSelectable) return; // Evita exceder el límite

                if (actualValueKey) {
                  const selectedValue: T[keyof T][] = data.map(
                    item => item[actualValueKey],
                  );
                  field.onChange(selectedValue);
                  onChangeValue && onChangeValue(selectedValue as any);
                  return;
                }

                if (shouldStringify) {
                  const selectedValue = data.length
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
                    sx={{ mt: 0 }}
                    htmlFor={name}
                    required={required}
                  >
                    {label}
                  </CustomFormLabel>
                  <Autocomplete
                    multiple
                    id="checkboxes-tags"
                    limitTags={limitTags}
                    defaultValue={defaultValue}
                    options={options}
                    loading={isLoadingData}
                    loadingText={loadingText}
                    disableCloseOnSelect
                    getOptionLabel={(option: T) =>
                      buildTitle(option, titleArray) ||
                      (option[valueKey] as any)
                    }
                    renderOption={(props, option, { selected }) => {
                      const { key, ...restProps } = props; // Evitar warning de key
                      const selectedValues = field.value ?? [];
                      const isDisabled =
                        !selected && selectedValues.length >= maxSelectable;

                      return (
                        <li
                          key={key}
                          {...restProps}
                          style={{
                            opacity: isDisabled ? 0.5 : 1,
                            pointerEvents: isDisabled ? 'none' : 'auto',
                          }}
                        >
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                            disabled={isDisabled}
                          />
                          {buildTitle(option, titleArray)}
                        </li>
                      );
                    }}
                    onChange={onChange}
                    disabled={disabled}
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

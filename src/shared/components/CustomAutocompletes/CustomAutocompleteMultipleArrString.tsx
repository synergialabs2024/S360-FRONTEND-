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

export type CustomAutocompleteMultipleArrStringProps = {
  options: string[];
  defaultValue: string[];

  loadingText?: string;
  isLoadingData: boolean;

  // form
  control: Control<any, any>;
  label: string;
  name: string;
  disabled?: boolean;
  onChangeValue?: (value: string[] | string) => void;
  error: FieldError | undefined | boolean;
  helperText: React.ReactNode;
  required?: boolean;
  textFieldKey: string;

  size?: GridSizeType;

  enableStringify?: boolean;
};

const icon = <MdCheckBoxOutlineBlank />;
const checkedIcon = <MdCheckBox />;

export default function CustomAutocompleteMultipleArrString({
  options,
  isLoadingData,
  loadingText = 'Cargando...',

  // form
  label,
  name,
  control,
  defaultValue,
  error,
  helperText,
  required = true,
  disabled = false,
  onChangeValue,
  textFieldKey,

  size = gridSize,
  enableStringify = true,
}: CustomAutocompleteMultipleArrStringProps) {
  return (
    <>
      <Grid item {...size}>
        <FormControl fullWidth>
          <Controller
            name={name}
            control={control}
            key={textFieldKey}
            defaultValue={defaultValue || ''}
            render={({ field }) => {
              const onChange = (_event: any, data: any) => {
                if (!enableStringify) {
                  field.onChange(data);
                  onChangeValue && onChangeValue(data);
                  return;
                }

                const selectedValue: string = JSON.stringify(data || '[]');

                field.onChange(selectedValue);

                onChangeValue && onChangeValue(selectedValue);
              };

              return (
                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  limitTags={2}
                  defaultValue={defaultValue}
                  options={options}
                  loading={isLoadingData}
                  loadingText={loadingText}
                  disableCloseOnSelect
                  getOptionLabel={(option: any) => option}
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
                        {option}
                      </li>
                    );
                  }}
                  onChange={onChange}
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
                    />
                  )}
                />
              );
            }}
          />
        </FormControl>
      </Grid>
    </>
  );
}

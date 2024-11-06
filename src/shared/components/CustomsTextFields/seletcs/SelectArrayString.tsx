import { FormControl, Grid, MenuItem, TextField } from '@mui/material';
import { Controller, FieldError } from 'react-hook-form';

import { gridSizeMdLg6 } from '@/shared/constants';
import { GridSizeType } from '@/shared/interfaces';
import { CustomFormLabel } from '../../Labels';

export interface SelectArrayStringProps {
  label: string;

  textFieldKey?: string;
  defaultValue?: string | number | null;

  options: string[] | number[];
  name: string;
  onChangeValue?: (value: string | number | null) => void;

  gridSize?: GridSizeType;
  disabled?: boolean;
  clearable?: boolean;

  control: any; // Agregar control como prop requerido
  required?: boolean;

  error: FieldError | undefined;
  helperText: React.ReactNode;
}

const SelectArrayString: React.FC<SelectArrayStringProps> = ({
  label,
  defaultValue = '',
  options,
  textFieldKey,
  name,
  onChangeValue,
  gridSize = gridSizeMdLg6,
  disabled = false,
  clearable = false,
  control,
  required = true,

  error,
  helperText,
}) => {
  return (
    <Grid item {...gridSize}>
      <FormControl fullWidth variant="outlined">
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => {
            const onChange = (event: any) => {
              const value =
                event.target.value === '' ? null : event.target.value;
              field.onChange(value);
              onChangeValue && onChangeValue(value);
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
                <TextField
                  key={textFieldKey || ''}
                  select
                  variant="outlined"
                  fullWidth
                  {...field}
                  value={field.value ?? ''}
                  onChange={onChange}
                  inputProps={{ readOnly: disabled }}
                  required={required}
                  error={!!error}
                  helperText={helperText}
                  sx={{
                    ...(disabled && {
                      background: 'rgba(0, 0, 0, 0.04)',
                      borderRadius: '13px',
                    }),
                  }}
                >
                  {clearable && (
                    <MenuItem value="">
                      <em>-- Sin Selección --</em>
                    </MenuItem>
                  )}
                  {options.map(item => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              </>
            );
          }}
        />
      </FormControl>
    </Grid>
  );
};

export default SelectArrayString;

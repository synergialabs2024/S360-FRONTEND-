import { FormControl, Grid, MenuItem, TextField } from '@mui/material';
import { Control, Controller, FieldError } from 'react-hook-form';

import { gridSizeMdLg6 } from '@/shared/constants';
import { GridSizeType } from '@/shared/interfaces';

export interface SelectTextFieldArrayStringProps {
  label: string;
  required?: boolean;
  textFieldKey?: string;
  defaultValue?: string | number;
  options: string[] | number[];

  error: FieldError | undefined;
  helperText: React.ReactNode;

  control: Control<any, any>;
  name: string;

  onChangeValue?: (value: string) => void;

  gridSize?: GridSizeType;
  disabled?: boolean;

  clearable?: boolean;
}

const SelectTextFieldArrayString: React.FC<SelectTextFieldArrayStringProps> = ({
  label,
  required = false,
  defaultValue,
  options,
  textFieldKey,
  error,
  helperText,

  name,
  control,

  onChangeValue,

  gridSize = gridSizeMdLg6,

  disabled = false,

  clearable = false,
}) => {
  return (
    <Grid item {...gridSize}>
      <FormControl fullWidth variant="outlined">
        <Controller
          name={name}
          control={control}
          key={textFieldKey || defaultValue}
          defaultValue={defaultValue}
          render={({ field }) => {
            const onChange = (event: any) => {
              field.onChange(event.target.value);

              onChangeValue && onChangeValue(event.target.value);
            };

            return (
              <TextField
                key={textFieldKey || defaultValue || ''}
                select
                label={label}
                variant="outlined"
                fullWidth
                {...field}
                value={field.value || ''} // Aseguramos que el valor sea una cadena vacía si es null o undefined
                error={!!error}
                helperText={helperText}
                required={required}
                onChange={onChange}
                // Estilo deshabilitado
                inputProps={{ readOnly: disabled }}
                sx={{
                  ...(disabled && {
                    background: 'rgba(0, 0, 0, 0.04)',
                    borderRadius: '13px',
                  }),
                }}
              >
                {clearable && (
                  <MenuItem value={null as any}>
                    <em>-- Sin Selección --</em>
                  </MenuItem>
                )}
                {options.map(item => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            );
          }}
        />
      </FormControl>
    </Grid>
  );
};

export default SelectTextFieldArrayString;

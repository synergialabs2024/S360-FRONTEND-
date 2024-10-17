import { FormControl, Grid, MenuItem, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

import { gridSizeMdLg6 } from '@/shared/constants';
import { GridSizeType } from '@/shared/interfaces';

export interface SelectArrayStringProps {
  label: string;

  textFieldKey?: string;
  defaultValue?: string | number;

  options: string[] | number[];
  name: string;
  onChangeValue?: (value: string) => void;

  gridSize?: GridSizeType;
  disabled?: boolean;
  clearable?: boolean;

  control: any; // Agregar control como prop requerido
}

const SelectArrayString: React.FC<SelectArrayStringProps> = ({
  label,
  defaultValue,
  options,
  textFieldKey,
  name,
  onChangeValue,
  gridSize = gridSizeMdLg6,
  disabled = false,
  clearable = false,
  control,
}) => {
  // Establecer el primer valor de opciones como valor por defecto
  const defaultSelection = defaultValue || options[0];

  return (
    <Grid item {...gridSize}>
      <FormControl fullWidth variant="outlined">
        <Controller
          name={name}
          control={control}
          defaultValue={defaultSelection}
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
                value={field.value || defaultSelection}
                onChange={onChange}
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

export default SelectArrayString;

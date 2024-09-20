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
                defaultValue={defaultValue || ''}
                error={!!error}
                helperText={helperText}
                required={required}
                onChange={onChange}
                // // disabled style
                inputProps={{ readOnly: disabled }}
                sx={{
                  ...(disabled && {
                    background: 'rgba(0, 0, 0, 0.04)',
                    borderRadius: '13px',
                  }),
                }}
              >
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

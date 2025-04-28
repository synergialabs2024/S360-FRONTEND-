import { FormControl, Grid, TextField, Autocomplete } from '@mui/material';
import { Controller, FieldError } from 'react-hook-form';

import { gridSizeMdLg6 } from '@/shared/constants';
import { GridSizeType } from '@/shared/interfaces';
import { CustomFormLabel } from '../../Labels';

export interface SelectArrayWriteProps {
  label: string;
  textFieldKey?: string;
  defaultValue?: string | number | null;
  options: string[] | number[];
  name: string;
  onChangeValue?: (value: string | number | null) => void;
  gridSize?: GridSizeType;
  disabled?: boolean;
  clearable?: boolean;
  control: any; // control de react-hook-form
  required?: boolean;
  error: FieldError | undefined;
  helperText: React.ReactNode;
}

const SelectArrayWrite: React.FC<SelectArrayWriteProps> = ({
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
            const handleChange = (
              _event: any,
              value: string | number | null,
            ) => {
              field.onChange(value);
              onChangeValue && onChangeValue(value);
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
                  key={textFieldKey || ''}
                  options={options}
                  value={field.value ?? ''}
                  onChange={handleChange}
                  disabled={disabled}
                  fullWidth
                  isOptionEqualToValue={(option, value) => option === value}
                  clearOnEscape={clearable}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="outlined"
                      required={required}
                      error={!!error}
                      helperText={helperText}
                      sx={{
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
      </FormControl>
    </Grid>
  );
};

export default SelectArrayWrite;

import { FormControl, Grid, InputAdornment, TextField } from '@mui/material';
import { Controller, FieldError } from 'react-hook-form';
import { MdOutlineSpeed } from 'react-icons/md';

import { gridSize } from '@/shared/constants/ui';
import { GridSizeType, SxPropsThemeType } from '@/shared/interfaces';

export type CustomNumberFieldProps = {
  label: string;
  error: FieldError | undefined;
  helperText: React.ReactNode;
  disabled?: boolean;
  shrink?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;

  size?: GridSizeType;

  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;

  control: any;
  name: string;
  defaultValue?: string | number;
  onChangeValue?: (value: any) => void;
  sxInputText?: SxPropsThemeType;
  customType?: 'percentage' | 'currency' | 'speed';
};

const CustomNumberTextField: React.FC<CustomNumberFieldProps> = ({
  error,
  helperText,
  label,
  disabled = false,
  required = true,
  shrink,
  size = gridSize,
  max,
  min = 1,
  step = 1,

  startAdornment,
  endAdornment,

  control,
  name,
  defaultValue,
  onChangeValue,
  sxInputText,
  customType,
}) => {
  const calcStartAdornment = () => {
    if (customType === 'percentage') {
      return <InputAdornment position="start">%</InputAdornment>;
    }

    if (customType === 'currency') {
      return <InputAdornment position="start">$</InputAdornment>;
    }

    if (customType === 'speed') {
      return (
        <InputAdornment position="start">
          <MdOutlineSpeed />
        </InputAdornment>
      );
    }

    return startAdornment ? (
      <InputAdornment position="start">{startAdornment}</InputAdornment>
    ) : null;
  };

  return (
    <Grid item {...size}>
      <FormControl fullWidth variant="outlined">
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue ?? ''}
          // disabled={disabled}
          render={({ field }) => {
            const onChange = (e: any) => {
              if (disabled) return;

              field.onChange(e);
              if (onChangeValue) onChangeValue(e.target.value);
            };

            return (
              <TextField
                fullWidth
                label={label}
                type={disabled ? 'tel' : 'number'}
                variant="outlined"
                InputProps={{
                  inputProps: {
                    min,
                    ...(max && { max }),
                    step,
                  },

                  startAdornment: calcStartAdornment(),

                  endAdornment: endAdornment ? (
                    <InputAdornment position="end">
                      {endAdornment}
                    </InputAdornment>
                  ) : null,
                }}
                InputLabelProps={{ ...(shrink && { shrink: true }) }}
                {...field}
                error={!!error}
                helperText={helperText}
                required={required}
                onChange={onChange}
                // disabled style
                inputProps={{ readOnly: disabled }}
                sx={{
                  ...sxInputText,
                  ...(disabled && {
                    background: 'rgba(0, 0, 0, 0.04)',
                    color: 'black',
                  }),
                }}
              />
            );
          }}
        ></Controller>
      </FormControl>
    </Grid>
  );
};

export default CustomNumberTextField;

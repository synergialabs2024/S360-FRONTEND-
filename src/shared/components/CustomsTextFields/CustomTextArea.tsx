import { FormControl, Grid, TextField } from '@mui/material';
import { Controller, FieldError } from 'react-hook-form';

import { gridSize } from '@/shared/constants/ui';
import { GridSizeType, SxPropsThemeType } from '@/shared/interfaces';

type CustomTextAreaProps = {
  label: string;
  error: FieldError | undefined;
  helperText: React.ReactNode;
  disabled?: boolean;
  shrink?: boolean;
  required?: boolean;

  type?: React.HTMLInputTypeAttribute;

  size?: GridSizeType;

  control?: any;
  name?: string;
  defaultValue?: string | number;
  onChangeValue?: (value: any) => void;

  sizeTextField?: 'medium' | 'small';
  startAdornment?: React.ReactNode;

  sxTextField?: SxPropsThemeType;

  // text area
  rows?: number;
  minRows?: number;
  maxRows?: number;

  //
  preventUpper?: boolean;
};

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  label,
  error,
  helperText,
  required = true,
  disabled = false,
  shrink = false,
  size = gridSize,
  type = 'text',

  control,
  name,
  defaultValue,
  onChangeValue,
  sizeTextField = 'medium',

  startAdornment,
  sxTextField,

  rows = 2,
  minRows = 2,
  maxRows = 4,

  preventUpper = false,
}) => {
  return (
    <Grid item {...size}>
      <FormControl fullWidth variant="outlined">
        <Controller
          control={control}
          name={name!}
          defaultValue={defaultValue || ''}
          render={({ field }) => {
            const onChange = (event: any) => {
              const currentValue = event.target.value;

              if (preventUpper) {
                onChangeValue && onChangeValue(currentValue);
                return field.onChange(currentValue);
              }

              field.onChange(currentValue.toUpperCase());

              onChangeValue && onChangeValue(currentValue?.toUpperCase());
            };

            return (
              <TextField
                {...field}
                size={sizeTextField}
                fullWidth
                variant="outlined"
                label={label}
                InputLabelProps={{
                  ...(shrink && { shrink: true }),
                  ...(startAdornment && { startAdornment }),
                }}
                error={!!error}
                helperText={helperText}
                type={type}
                onChange={onChange}
                required={required}
                inputProps={{ readOnly: disabled }}
                sx={{
                  ...sxTextField,
                  ...(disabled && { background: 'rgba(0, 0, 0, 0.04)' }),
                }}
                // text area
                multiline
                rows={rows}
                minRows={!rows && minRows ? minRows : (null as any)}
                maxRows={!rows && maxRows ? maxRows : (null as any)}
              />
            );
          }}
        ></Controller>
      </FormControl>
    </Grid>
  );
};

export default CustomTextArea;

import { FormControl, Grid } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Control, Controller, FieldError } from 'react-hook-form';

import { esES } from '@mui/x-date-pickers/locales';
import 'dayjs/locale/es';

import { gridSizeMdLg6 } from '@/shared/constants';
import { GridSizeType } from '@/shared/interfaces';
import { CustomFormLabel } from '../Labels';

export interface CustomTimePickerProps {
  label: string;
  onChangeValue?: (e?: any) => void;

  size?: GridSizeType;

  control: Control<any, any>;
  name: string;
  defaultValue: string | null | Dayjs;
  error: FieldError | undefined;
  helperText: React.ReactNode;

  textFieldKey?: string;
  minTime?: Date | string | null | Dayjs;
  maxTime?: Date | string | null | Dayjs;

  display?: string;

  required?: boolean;
  disabled?: boolean;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  label,
  name,
  onChangeValue,
  control,
  defaultValue,
  size = gridSizeMdLg6,
  textFieldKey,
  minTime,
  maxTime,
  error,
  helperText,
  display = 'flex',
  required = true,
  disabled = false,
}) => {
  return (
    <Grid
      item
      {...size}
      sx={{
        display: display,
      }}
    >
      <FormControl fullWidth>
        <Controller
          control={control}
          {...(textFieldKey && { key: textFieldKey })}
          name={name}
          defaultValue={defaultValue || ''}
          render={({ field }) => {
            const onChange = (time: any) => {
              field.onChange(dayjs(time).format('HH:mm:ss'));
              onChangeValue && onChangeValue(dayjs(time).format('HH:mm:ss'));
            };

            return (
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="es"
                localeText={
                  esES.components.MuiLocalizationProvider.defaultProps
                    .localeText
                }
              >
                <CustomFormLabel
                  sx={{
                    mt: 0,
                  }}
                  htmlFor={label}
                  required={required}
                >
                  {label}
                </CustomFormLabel>

                <TimePicker
                  {...field}
                  format="HH:mm:ss"
                  slotProps={{
                    textField: {
                      helperText: helperText,
                      error: !!error,
                      required: required,
                      sx: {
                        ...(disabled && {
                          background: 'rgba(0, 0, 0, 0.04)',
                          color: 'black',
                        }),
                      },
                      className: disabled ? 'input-text__disabled' : '',
                    },
                  }}
                  value={field.value ? dayjs(field.value, 'HH:mm:ss') : null}
                  onChange={onChange}
                  minTime={minTime ? dayjs(minTime, 'HH:mm:ss') : null}
                  maxTime={maxTime ? dayjs(maxTime, 'HH:mm:ss') : null}
                  disabled={disabled}
                />
              </LocalizationProvider>
            );
          }}
        />
      </FormControl>
    </Grid>
  );
};

export default CustomTimePicker;

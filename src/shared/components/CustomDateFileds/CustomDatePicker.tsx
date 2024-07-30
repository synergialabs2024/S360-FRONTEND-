import { FormControl, Grid } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Control, Controller, FieldError } from 'react-hook-form';

// internationalization -------
import { esES } from '@mui/x-date-pickers/locales';
import 'dayjs/locale/es';

// import utc from 'dayjs/plugin/utc';
// dayjs.extend(utc);

import { gridSize } from '@/shared/constants/ui';
import { GridSizeType } from '@/shared/interfaces';

export interface CustomDatePickerProps {
  label: string;
  onChangeValue?: (e?: any) => void;

  size?: GridSizeType;

  control: Control<any, any>;
  name: string;
  defaultValue: string | null | Dayjs;
  error: FieldError | undefined;
  helperText: React.ReactNode;

  textFieldKey?: string;
  minDate?: Date | string | null | Dayjs;
  maxDate?: Date | string | null | Dayjs;

  display?: string;

  required?: boolean;
  disabled?: boolean;

  shouldDisableDate?:
    | ((day: string | dayjs.Dayjs | null) => boolean)
    | undefined;

  viewsDatePicker?: ('year' | 'month' | 'day')[];
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  name,
  onChangeValue,
  control,
  defaultValue,
  size = gridSize,
  textFieldKey,
  minDate,
  maxDate,
  error,
  helperText,
  display = 'flex',
  required = true,
  disabled = false,
  shouldDisableDate,
  viewsDatePicker = ['month', 'day'],
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
            const onChange = (date: any) => {
              field.onChange(dayjs(date).format('YYYY-MM-DD'));
              onChangeValue && onChangeValue(dayjs(date).format('YYYY-MM-DD'));
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
                <DatePicker
                  {...field}
                  label={label}
                  format="YYYY-MM-DD"
                  views={viewsDatePicker}
                  slotProps={{
                    textField: {
                      // size: 'small',
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
                  value={field.value ? dayjs(field.value) : null}
                  onChange={onChange}
                  minDate={minDate ? dayjs(minDate) : undefined}
                  maxDate={maxDate ? dayjs(maxDate) : undefined}
                  disabled={disabled}
                  shouldDisableDate={shouldDisableDate}
                />
              </LocalizationProvider>
            );
          }}
        />
      </FormControl>
    </Grid>
  );
};

export default CustomDatePicker;

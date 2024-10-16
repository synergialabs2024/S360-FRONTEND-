import { FormControl, Grid } from '@mui/material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

// internationalization -------
import { esES } from '@mui/x-date-pickers/locales';
import 'dayjs/locale/es';

import { gridSize } from '@/shared/constants/ui';
import { GridSizeType } from '@/shared/interfaces';

export interface CustomDateCalendarProps {
  onChangeValue?: (e?: any) => void;

  size?: GridSizeType;

  control: Control<any, any>;
  name: string;
  defaultValue: string | null | Dayjs;
  error: FieldError | undefined;
  helperText?: React.ReactNode;

  textFieldKey?: string;
  minDate?: Date | string | null | Dayjs;
  maxDate?: Date | string | null | Dayjs;

  display?: string;

  disabled?: boolean;

  shouldDisableDate?:
    | ((day: string | dayjs.Dayjs | null) => boolean)
    | undefined;
}

const CustomDateCalendar: React.FC<CustomDateCalendarProps> = ({
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
  disabled = false,
  shouldDisableDate,
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
                <DateCalendar
                  {...field}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={onChange}
                  minDate={minDate ? dayjs(minDate) : undefined}
                  maxDate={maxDate ? dayjs(maxDate) : undefined}
                  disabled={disabled}
                  shouldDisableDate={shouldDisableDate}
                  sx={{
                    ...(disabled && {
                      background: 'rgba(0, 0, 0, 0.04)',
                      color: 'black',
                    }),
                  }}
                />
                {!!helperText && (
                  <p style={{ color: error ? 'red' : 'inherit' }}>
                    {helperText}
                  </p>
                )}
              </LocalizationProvider>
            );
          }}
        />
      </FormControl>
    </Grid>
  );
};

export default CustomDateCalendar;

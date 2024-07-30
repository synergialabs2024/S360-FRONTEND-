import { FormControl, Grid } from '@mui/material';
import {
  LocalizationProvider,
  TimePicker,
  renderTimeViewClock,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Control, Controller, FieldError } from 'react-hook-form';

import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { GridSizeType } from '@/shared/interfaces';

interface CustomTimeClockPickerProps {
  control: Control<any, any>;
  name: string;
  error: FieldError | undefined;
  helperText?: string;
  label: string;
  size?: GridSizeType;
  defaultValue?: string | Dayjs;
  onChangeValue?: (e?: any) => void;
  display?: string;
  required?: boolean;
  disabled?: boolean;
  textFieldKey?: string;
  shouldDisableTime?: (time: string | dayjs.Dayjs | null) => boolean;
}

export default function CustomTimeClockPicker({
  control,
  name,
  error,
  label,
  helperText,
  size = gridSizeMdLg6,
  defaultValue,
  onChangeValue,
  display = 'flex',
  required = true,
  disabled = false,
  textFieldKey,
  shouldDisableTime,
}: CustomTimeClockPickerProps) {
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
              const formattedTime = dayjs(time).format('HH:mm:ss');
              field.onChange(formattedTime);
              onChangeValue && onChangeValue(formattedTime);
            };

            return (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  {...field}
                  value={field.value ? dayjs(field.value) : null}
                  label={label}
                  slotProps={{
                    textField: {
                      error: !!error,
                      required: required,
                      helperText: helperText,
                      sx: {
                        ...(disabled && {
                          background: 'rgba(0, 0, 0, 0.04)',
                          color: 'black',
                        }),
                      },
                      className: disabled ? 'input-text__disabled' : '',
                    },
                  }}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                  onChange={onChange}
                  disabled={disabled}
                  shouldDisableTime={shouldDisableTime}
                />
              </LocalizationProvider>
            );
          }}
        />
      </FormControl>
    </Grid>
  );
}

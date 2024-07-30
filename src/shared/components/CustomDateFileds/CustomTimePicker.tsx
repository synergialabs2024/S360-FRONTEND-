import { FormControl, Grid } from '@mui/material';
import {
  LocalizationProvider,
  TimePicker,
  renderTimeViewClock,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Control, Controller, FieldError } from 'react-hook-form';

import { gridSize } from '@/shared/constants/ui';
import { GridSizeType } from '@/shared/interfaces';

interface CustomTimePickerProps {
  control: Control<any, any>;
  name: string;
  error: FieldError | undefined;
  helperText?: string;
  label: string;
  size?: GridSizeType;
  defaultValue?: string;
}

export default function CustomTimePicker({
  control,
  name,
  error,
  label,
  helperText,
  size = gridSize,
  defaultValue,
}: CustomTimePickerProps) {
  return (
    <Grid item {...size}>
      <FormControl fullWidth>
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue || ''}
          render={({ field }) => {
            const onChange = (time: any) => {
              field.onChange(time);
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
                      required: true,
                      helperText: helperText,
                    },
                  }}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                  onChange={onChange}
                />
              </LocalizationProvider>
            );
          }}
        />
      </FormControl>
    </Grid>
  );
}

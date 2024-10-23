import { Theme } from '@emotion/react';
import React, { useState, useRef } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import { FormControl, TextField, Grid, SxProps } from '@mui/material';
import { Controller } from 'react-hook-form';
import { GridSizeType, SxPropsThemeType } from '@/shared/interfaces';
import { gridSize } from '@/shared/constants';
import { CustomFormLabel } from '../Labels';

interface DateRangePickerProps {
  label: string;
  name: string;
  defaultValue?: string[];

  size?: GridSizeType;
  sizeTextField?: 'medium' | 'small';
  sxGrid?: SxPropsThemeType;
  sxTextField?: SxProps<Theme> | undefined;
  placeholder?: string;

  required?: boolean;
  shrink?: boolean;
  disabled?: boolean;
  formLabel?: boolean;

  InputProps?: any;

  startAdornmentInput?: React.ReactNode;
  endAdornmentInput?: React.ReactNode;
  type?: React.HTMLInputTypeAttribute;

  control: any;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  label,
  name,
  defaultValue,

  size = gridSize,
  sizeTextField = 'medium',
  disabled = false,
  sxGrid,
  sxTextField,
  placeholder,

  required = true,
  shrink = false,
  InputProps,
  formLabel = false,

  startAdornmentInput,
  endAdornmentInput,
  type = 'text',

  control,
}) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  // Referencia al input de Flatpickr
  const flatpickrRef = useRef<any>(null);

  return (
    <Grid item {...size} sx={sxGrid}>
      <FormControl fullWidth variant="outlined">
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue || ''}
          render={({ field }) => {
            const options = {
              mode: 'range' as const, // Aseguramos que el valor es uno de los esperados
              dateFormat: 'Y-m-d',
              locale: Spanish,
              onChange: (dates: Date[]) => {
                const formattedDates = dates.map(date =>
                  date.toISOString().slice(0, 10),
                );
                // Solo actualiza el valor en react-hook-form si hay dos fechas seleccionadas
                if (formattedDates.length === 2) {
                  field.onChange({
                    // Usa field aquí directamente
                    date_1: formattedDates[0],
                    date_2: formattedDates[1],
                  });
                  setSelectedDates(dates as Date[]);
                }
              },
            };

            // Función para abrir el Flatpickr al hacer clic en el TextField
            const handleTextFieldClick = () => {
              if (flatpickrRef.current) {
                flatpickrRef.current.flatpickr.open();
              }
            };

            return (
              <>
                {formLabel ? (
                  <CustomFormLabel
                    sx={{ mt: 0 }}
                    htmlFor={label}
                    required={required}
                  >
                    {label}
                  </CustomFormLabel>
                ) : null}

                <TextField
                  size={sizeTextField}
                  label={label}
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    ...(shrink && { shrink: true }),
                  }}
                  InputProps={{
                    ...InputProps,
                    startAdornment: startAdornmentInput ?? null,
                    endAdornment: endAdornmentInput ?? null,
                  }}
                  type={type}
                  required={required}
                  inputProps={{
                    readOnly: disabled,
                    onClick: handleTextFieldClick, // Abre el calendario al hacer clic
                  }}
                  sx={{
                    ...(sxTextField as any),
                    ...(disabled && {
                      background: 'rgba(0, 0, 0, 0.04)',
                      borderRadius: '13px',
                    }),
                  }}
                  placeholder={placeholder}
                  value={
                    selectedDates.length
                      ? selectedDates
                        .map(date => date.toLocaleDateString())
                        .join(' - ')
                      : ''
                  }
                />
                <Flatpickr
                  ref={flatpickrRef} // Referencia al Flatpickr
                  options={options}
                  value={selectedDates}
                  style={{ width: '0', height: '0', opacity: '0' }} // Hacer el input nativo transparente
                />
              </>
            );
          }}
        />
      </FormControl>
    </Grid>
  );
};

export default DateRangePicker;

import { FormControl, Grid, MenuItem, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

import { gridSizeMdLg6 } from '@/shared/constants';
import { GridSizeType } from '@/shared/interfaces';

export interface SelectOLTItemsNMSProps {
  label?: string;
  textFieldKey?: string;
  defaultValue?: string | number;
  name: string;
  data: any[]; // Asegúrate de declarar data como un array de objetos
  gridSize?: GridSizeType;
  disabled?: boolean;
  clearable?: boolean;
  control?: any; // Control de react-hook-form
  onChange?: (value: any) => void; // Agregamos un callback para manejar el cambio
}

const SelectOLTItemsNMS: React.FC<SelectOLTItemsNMSProps> = ({
  label,
  defaultValue,
  textFieldKey,
  name,
  data,
  gridSize = gridSizeMdLg6,
  disabled = false,
  clearable = false,
  control,
  onChange, // Recibimos el callback onChange
}) => {
  const items = data ?? [];

  const handleChange = (value: any) => {
    if (onChange) {
      onChange(value); // Ejecutamos el callback para pasar el valor seleccionado
    }
  };

  return (
    <Grid item {...gridSize}>
      <FormControl fullWidth variant="outlined">
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <TextField
                key={textFieldKey || defaultValue || ''}
                select
                label={label}
                variant="outlined"
                fullWidth
                {...field}
                value={field.value} // Utiliza el valor formateado
                onChange={e => {
                  field.onChange(e); // Manejamos el cambio para react-hook-form
                  handleChange(e.target.value); // Ejecutamos nuestro propio onChange
                }}
                inputProps={{ readOnly: disabled }}
                sx={{
                  ...(disabled && {
                    background: 'rgba(0, 0, 0, 0.04)',
                    borderRadius: '13px',
                  }),
                }}
              >
                {clearable && (
                  <MenuItem value="">
                    <em>-- Sin Selección --</em>
                  </MenuItem>
                )}
                {items?.map(i => (
                  <MenuItem key={i.uuid} value={i.uuid}>
                    {i.hostname} - {i.name}
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

export default SelectOLTItemsNMS;

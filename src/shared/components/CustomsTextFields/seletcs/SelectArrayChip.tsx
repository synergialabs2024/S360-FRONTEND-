import { FormControl, Grid, MenuItem, Select, Chip, Box } from '@mui/material';
import { Controller } from 'react-hook-form';
import { gridSizeMdLg6 } from '@/shared/constants';
import { GridSizeType } from '@/shared/interfaces';

export interface SelectArrayChipProps {
  label?: string;
  textFieldKey?: string;
  defaultValue?: string | number | string[];
  name: string;
  data: any[]; // Asegúrate de que contiene uuid e id
  gridSize?: GridSizeType;
  disabled?: boolean;
  clearable?: boolean;
  control?: any; // Control de react-hook-form
  onChange?: (value: any) => void; // Callback para manejar el cambio
}

const SelectArrayChip: React.FC<SelectArrayChipProps> = ({
  label,
  defaultValue = [],
  textFieldKey,
  name,
  data,
  gridSize = gridSizeMdLg6,
  disabled = false,
  clearable = false,
  control,
  onChange,
}) => {
  const items = data ?? [];

  const handleChange = (selectedUuids: string[]) => {
    const selectedIds = selectedUuids
      .map(uuid => {
        const item = items.find(i => i.uuid === uuid);
        return item?.id ?? null; // Convertimos uuid a id
      })
      .filter(id => id !== null); // Eliminamos valores nulos

    if (onChange) {
      onChange(selectedIds); // Enviamos los ids en lugar de uuid
    }
  };

  return (
    <Grid item {...gridSize}>
      <FormControl fullWidth variant="outlined">
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <Select
              key={String(textFieldKey || defaultValue)}
              label={label}
              multiple
              fullWidth
              value={field.value || []}
              onChange={e => {
                field.onChange(e.target.value);
                handleChange(e.target.value); // Ejecutamos la transformación aquí
              }}
              renderValue={selected => (
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                  {(selected as string[]).map(uuid => {
                    const item = items.find(i => i.uuid === uuid);
                    return (
                      <Chip
                        key={uuid}
                        label={`${item?.hostname || ''} - ${item?.name || ''}`}
                      />
                    );
                  })}
                </Box>
              )}
              sx={{
                ...(disabled && {
                  background: 'rgba(0, 0, 0, 0.04)',
                  borderRadius: '13px',
                }),
              }}
              inputProps={{ readOnly: disabled }}
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
            </Select>
          )}
        />
      </FormControl>
    </Grid>
  );
};

export default SelectArrayChip;

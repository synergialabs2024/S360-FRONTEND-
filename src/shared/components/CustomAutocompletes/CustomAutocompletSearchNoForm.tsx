import { Clear as ClearIcon } from '@mui/icons-material';
import { Autocomplete, Grid, TextField } from '@mui/material';
import { useState } from 'react';

import { gridSize } from '@/shared/constants';

export type CustomAutocompletSearchNoFormProps<T> = {
  loadingText?: string;
  label: string;
  disabled?: boolean;

  options: T[];
  valueKey: keyof T;
  actualValueKey?: keyof T;
  optionLabelForEdit?: string;
  isLoadingData: boolean;
  onChangeValue?: (value: any) => void;
  onChangeInputText?: (value: any) => void;
  onChangeRawValue?: (value: T | null) => void;

  helperText?: React.ReactNode;
  required?: boolean;

  textFieldKey?: string;
  defaultValue?: string | number;
  size?: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
  };
};

function CustomAutocompletSearchNoForm<T>({
  options,
  isLoadingData,
  defaultValue,
  loadingText = 'Cargando...',
  optionLabelForEdit,
  valueKey,
  helperText,
  required = true,
  label,
  actualValueKey,
  size = gridSize,
  disabled = false,
  onChangeValue,
  onChangeInputText,
  onChangeRawValue,
}: CustomAutocompletSearchNoFormProps<T>) {
  // Estado local para el valor seleccionado y el input
  const [value, setValue] = useState<string | number | null>(
    defaultValue || '',
  );
  const [inputValue, setInputValue] = useState('');

  // Manejador para el cambio de selección
  const handleChange = (_event: any, data: any) => {
    const selectedValue = data?.[actualValueKey || valueKey] ?? '';
    setValue(selectedValue);

    onChangeValue && onChangeValue(selectedValue); // label
    onChangeRawValue && onChangeRawValue(data); // T
  };

  // Manejador para el cambio de texto de entrada (input)
  const handleInputChange = (
    _event: any,
    newInputValue: string,
    reason: 'input' | 'reset' | 'clear',
  ) => {
    setInputValue(newInputValue); // Siempre actualizamos inputValue

    if (reason === 'input' || reason === 'clear') {
      // Solo llamamos a onChangeInputText cuando el usuario escribe o borra
      onChangeInputText && onChangeInputText(newInputValue);
    }
    // No llamamos a onChangeInputText cuando reason es 'reset' (selección de opción)
  };

  // Manejador para limpiar el campo
  const handleClear = () => {
    setValue('');
    setInputValue('');
    onChangeValue && onChangeValue('');
    onChangeInputText && onChangeInputText('');
  };

  return (
    <Grid item {...size}>
      <Autocomplete
        freeSolo
        loading={isLoadingData}
        loadingText={loadingText}
        options={options}
        getOptionLabel={(option: any) =>
          option?.[valueKey] ??
          options.find(opt => opt[actualValueKey || valueKey] === option)?.[
            valueKey
          ] ??
          optionLabelForEdit ??
          ''
        }
        value={
          options.find(opt => opt[actualValueKey || valueKey] === value) ?? null
        }
        inputValue={inputValue}
        // Ícono para limpiar el campo
        clearIcon={<ClearIcon fontSize="small" onClick={handleClear} />}
        clearText="Limpiar"
        disabled={disabled}
        renderInput={params => (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            helperText={helperText}
            required={required}
            disabled={disabled}
          />
        )}
        onChange={handleChange}
        onInputChange={handleInputChange}
      />
    </Grid>
  );
}

export default CustomAutocompletSearchNoForm;

import { GridSizeType, SxPropsThemeType } from '@/shared/interfaces';
import {
  Autocomplete,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from '@mui/material';
import { CustomFormLabel } from '../../Labels';

export type CustomAutocompleteNoFormProps<T> = {
  label: string;
  value: string | number | null;
  onChange: (value: string | number | null, rawValue?: T | null) => void;
  options: T[];
  getOptionLabel: (option: T) => string;
  loading?: boolean;
  disabled?: boolean;
  required?: boolean;
  helperText?: React.ReactNode;
  error?: boolean;
  size?: GridSizeType;
  disableClearable?: boolean;
  sxGrid?: SxPropsThemeType;
  sxAutocomplete?: SxPropsThemeType;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  inLineLabel?: boolean;
  actualValueKey: keyof T;
  showLabel?: boolean;
};

function CustomAutocompleteNoForm<T>({
  label,
  value,
  onChange,
  options,
  getOptionLabel,
  loading = false,
  disabled = false,
  required = false,
  helperText,
  error = false,
  size,
  disableClearable = false,
  sxGrid,
  sxAutocomplete,
  startAdornment,
  endAdornment,
  inLineLabel = false,
  actualValueKey,
  showLabel = true,
}: CustomAutocompleteNoFormProps<T>) {
  const selectedOption =
    options.find(option => option[actualValueKey] === value) || null;

  if (loading) return <CircularProgress />;

  return (
    <Grid item {...size} sx={sxGrid}>
      {!inLineLabel && showLabel && (
        <CustomFormLabel htmlFor={label} required={required}>
          {label}
        </CustomFormLabel>
      )}

      <Autocomplete
        value={selectedOption}
        onChange={(_event, newValue) => {
          const newActualValue =
            newValue && actualValueKey ? newValue[actualValueKey] : null;
          onChange(newActualValue as any, newValue);
        }}
        options={options}
        getOptionLabel={getOptionLabel}
        loading={loading}
        disabled={disabled}
        disableClearable={disableClearable}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            error={error}
            helperText={helperText}
            required={required}
            label={inLineLabel ? label : ''}
            InputProps={{
              ...params.InputProps,
              startAdornment: startAdornment ? (
                <InputAdornment position="start">
                  {startAdornment}
                </InputAdornment>
              ) : null,
              endAdornment: (
                <>
                  {endAdornment ? (
                    <InputAdornment position="end">
                      {endAdornment}
                    </InputAdornment>
                  ) : (
                    params.InputProps.endAdornment
                  )}
                </>
              ),
            }}
            sx={{
              ...sxAutocomplete,
              ...(disabled && {
                background: 'rgba(0, 0, 0, 0.04)',
                borderRadius: '13px',
              }),
            }}
          />
        )}
      />
    </Grid>
  );
}

export default CustomAutocompleteNoForm;

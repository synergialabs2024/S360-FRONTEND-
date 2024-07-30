import { Grid, TextField } from '@mui/material';

import { gridSize } from '@/shared/constants/ui';
import {
  GridSizeType,
  SxPropsThemeType,
  TextFieldSizeType,
} from '@/shared/interfaces';

type CustomTextAreaNoFormProps = {
  label: string;
  helperText?: React.ReactNode;
  disabled?: boolean;
  shrink?: boolean;
  required?: boolean;

  type?: React.HTMLInputTypeAttribute;

  size?: GridSizeType;

  onChangeValue?: (value: any) => void;

  sizeTextField?: TextFieldSizeType;
  startAdornment?: React.ReactNode;

  sxTextField?: SxPropsThemeType;

  // text area
  rows?: number;
  minRows?: number;
  maxRows?: number;

  value?: string | number;
};

const CustomTextAreaNoForm: React.FC<CustomTextAreaNoFormProps> = ({
  label,
  helperText,
  required = true,
  disabled = false,
  shrink = false,
  size = gridSize,
  type = 'text',

  onChangeValue,
  sizeTextField = 'medium',

  startAdornment,
  sxTextField,

  rows = 2,
  minRows = 2,
  maxRows = 4,
  value,
}) => {
  const handleChange = (event: any) => {
    const currentValue = event.target.value;

    onChangeValue && onChangeValue(currentValue?.toUpperCase());
  };

  return (
    <Grid item {...size}>
      <TextField
        size={sizeTextField}
        fullWidth
        variant="outlined"
        label={label}
        InputLabelProps={{
          ...(shrink && { shrink: true }),
          ...(startAdornment && { startAdornment }),
        }}
        helperText={helperText}
        type={type}
        value={value || ''}
        onChange={handleChange}
        required={required}
        inputProps={{ readOnly: disabled }}
        sx={{
          ...sxTextField,
          ...(disabled && { background: 'rgba(0, 0, 0, 0.04)' }),
        }}
        // text area

        multiline
        rows={rows}
        minRows={!rows && minRows ? minRows : (null as any)}
        maxRows={!rows && maxRows ? maxRows : (null as any)}
      />
    </Grid>
  );
};

export default CustomTextAreaNoForm;

import {
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
} from '@mui/material';
import React from 'react';

import { gridSize } from '@/shared/constants/ui';
import { JustifyContentType } from '@/shared/interfaces';

export interface SampleCheckboxNoFormProps {
  label: string;
  value: boolean;
  onChange: (newValue: boolean) => void;
  size?: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
  };
  textFieldKey?: string;
  justifyContent?: JustifyContentType;
  alignItems?: JustifyContentType;
  disabled?: boolean;
  onClickDisabled?: () => void;
  flexDirection?: 'row' | 'column';
  customHelperText?: string;
  isState?: boolean;
}

const SampleCheckboxNoForm: React.FC<SampleCheckboxNoFormProps> = ({
  label,
  value,
  onChange,
  size = gridSize,
  textFieldKey,
  justifyContent = 'flex-start',
  alignItems = 'center',
  disabled = false,
  onClickDisabled,
  flexDirection = 'row',
  customHelperText,
  isState = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      onClickDisabled && onClickDisabled();
      return;
    }
    onChange(e.target.checked);
  };

  return (
    <Grid
      item
      {...size}
      container
      justifyContent={justifyContent}
      alignItems={alignItems}
      flexDirection={flexDirection}
    >
      <FormControlLabel
        key={textFieldKey || String(value)}
        label={isState ? (value ? 'Activo' : 'Inactivo') : label}
        control={
          <Checkbox
            size="small"
            checked={value}
            onChange={handleChange}
            disabled={disabled}
            sx={{
              color: disabled && !value ? undefined : 'primary.main',
            }}
          />
        }
      />
      {customHelperText && <FormHelperText>{customHelperText}</FormHelperText>}
    </Grid>
  );
};

export default SampleCheckboxNoForm;

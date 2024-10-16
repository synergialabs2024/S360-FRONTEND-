import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

import { gridSize } from '@/shared/constants/ui';
import { JustifyContentType } from '@/shared/interfaces';

export interface SampleCheckboxProps {
  label: string;
  isState?: boolean;

  onChangeValue?: (e?: boolean) => void;

  size?: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
  };

  control: Control<any, any>;
  name: string;
  defaultValue: boolean;

  textFieldKey?: string;
  justifyContent?: JustifyContentType;
  alignItems?: JustifyContentType;

  disabled?: boolean;
  onClickDisabled?: () => void;
}

const SampleCheckbox: React.FC<SampleCheckboxProps> = ({
  label,
  name,
  onChangeValue,
  control,
  defaultValue,
  size = gridSize,
  textFieldKey,
  justifyContent = 'flex-start',
  alignItems = 'center',
  isState = false,
  disabled = false,
  onClickDisabled,
}) => {
  return (
    <Grid
      item
      {...size}
      container
      justifyContent={justifyContent}
      alignItems={alignItems}
    >
      <Controller
        name={name}
        control={control}
        key={textFieldKey || defaultValue + ''}
        render={({ field }) => {
          const onChange = (e: any) => {
            if (disabled) {
              onClickDisabled && onClickDisabled();
              return;
            }
            onChangeValue && onChangeValue(e.target.checked);
            field.onChange(e.target.checked);
          };

          return (
            <FormControlLabel
              label={isState ? (field.value ? 'Activo' : 'Inactivo') : label}
              control={
                <Checkbox
                  {...field}
                  size="small"
                  checked={field.value || false}
                  onChange={onChange}
                  // disabled={disabled}
                  sx={{
                    color: disabled && !field.value ? '' : 'primary.main',
                  }}
                />
              }
            />
          );
        }}
      />
    </Grid>
  );
};

export default SampleCheckbox;

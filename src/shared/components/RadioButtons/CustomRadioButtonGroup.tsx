import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Control, Controller } from 'react-hook-form';

import { gridSize } from '@/shared/constants/ui';
import { GridSizeType } from '@/shared/interfaces';

export interface SampleRadioButtonsGroupProps {
  label: string;
  name: string;
  control: Control<any, any>;
  defaultValue: string;
  size?: GridSizeType;
  optionsNode?: React.ReactNode;
  showOptionsNode?: boolean;
  options?: { value: string; label: string; checked?: boolean }[];
  onChangeValue?: (e?: string) => void;
  value?: string;
}

const CustomRadioButtonGroup: React.FC<SampleRadioButtonsGroupProps> = ({
  label,
  name,
  control,
  defaultValue,
  size = gridSize,
  options,
  optionsNode,
  showOptionsNode = false,
  onChangeValue,
}) => {
  return (
    <Grid item {...size}>
      <FormControl fullWidth>
        <FormLabel id={`${name}-label`}>{label}</FormLabel>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <RadioGroup
              row
              aria-labelledby={`${name}-label`}
              name={name}
              value={field.value}
              onChange={e => {
                onChangeValue && onChangeValue(e.target.value);
                field.onChange(e.target.value);
              }}
            >
              {/* {options} */}
              {showOptionsNode
                ? optionsNode
                : options &&
                  options.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                      checked={option.checked}
                    />
                  ))}
            </RadioGroup>
          )}
        />
      </FormControl>
    </Grid>
  );
};

export default CustomRadioButtonGroup;

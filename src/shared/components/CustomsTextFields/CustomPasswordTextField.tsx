import { IconButton, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

import { gridSize } from '@/shared/constants/ui';
import { GridSizeType } from '@/shared/interfaces';
import CustomTextField from './CustomTextField';

export type CustomPasswordTextFieldProps = {
  label: string;
  name: string;
  control: any;
  errors: any;
  size?: GridSizeType;

  disabled?: boolean;

  defaultValue?: string;
  helperText?: string;
};

const CustomPasswordTextField: React.FC<CustomPasswordTextFieldProps> = ({
  label,
  errors,
  name,
  control,
  size = gridSize,

  disabled,

  defaultValue,
  helperText,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <CustomTextField
        label={label}
        name={name}
        ignoreTransform // avoid uppercase in text mode
        control={control}
        defaultValue={defaultValue || ''}
        error={errors}
        helperText={helperText || ''}
        type={showPassword ? 'text' : 'password'}
        endAdornmentInput={
          <>
            {!disabled && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </IconButton>
              </InputAdornment>
            )}
          </>
        }
        size={size}
        disabled={disabled}
      />
    </>
  );
};

export default CustomPasswordTextField;

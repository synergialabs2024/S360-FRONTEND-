import { Theme } from '@emotion/react';
import {
  FormControl,
  Grid,
  InputAdornment,
  SxProps,
  TextField,
} from '@mui/material';
import { Controller, FieldError } from 'react-hook-form';
import { MdEmail } from 'react-icons/md';

import { gridSize } from '@/shared/constants/ui';
import { GridSizeType, SxPropsThemeType } from '@/shared/interfaces';
import { useState } from 'react';
import { CustomFormLabel } from '../Labels';

type CustomTextFieldProps = {
  label: string;
  error: FieldError | undefined;
  helperText: React.ReactNode;
  disabled?: boolean;
  shrink?: boolean;
  required?: boolean;

  type?: React.HTMLInputTypeAttribute;

  size?: GridSizeType;

  control: any;
  name: string;
  defaultValue?: string;
  onChangeValue?: (value: any) => void;

  sizeTextField?: 'medium' | 'small';

  sxTextField?: SxProps<Theme> | undefined;
  placeholder?: string;

  startAdornmentInput?: React.ReactNode;
  endAdornmentInput?: React.ReactNode;

  ignoreTransform?: boolean;
  defaultHelperText?: string;

  sxGrid?: SxPropsThemeType;
  InputProps?: any;

  onlyNumbers?: boolean;
  maxLength?: number;
  limitDecimals?: number;
};

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  error,
  helperText,
  required = true,
  disabled = false,
  shrink = false,
  size = gridSize,
  type = 'text',
  ignoreTransform = false,

  control,
  name,
  defaultValue,
  onChangeValue,
  sizeTextField = 'medium',

  sxTextField,
  placeholder,

  startAdornmentInput,
  endAdornmentInput,
  defaultHelperText,

  sxGrid,
  InputProps,

  onlyNumbers,
  maxLength,
  limitDecimals = 2,
}) => {
  const [emailError, setEmailError] = useState<boolean>(false);

  return (
    <Grid item {...size} sx={sxGrid}>
      <FormControl fullWidth variant="outlined">
        <Controller
          control={control}
          name={name!}
          defaultValue={defaultValue || ''}
          render={({ field }) => {
            const onChange = (event: any) => {
              const currentValue = event.target.value;

              // no format type number (no steps)
              if (onlyNumbers) {
                const onlyNums = currentValue.replace(/[^0-9]/g, '');
                if (maxLength && onlyNums.length > maxLength) return;

                field.onChange(onlyNums);
                onChangeValue && onChangeValue(onlyNums);
                return;
              }

              if (ignoreTransform) {
                onChangeValue && onChangeValue(currentValue);
                return field.onChange(currentValue);
              }

              if (type === 'email') {
                const emailRegex =
                  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                setEmailError(!emailRegex.test(currentValue));

                onChangeValue && onChangeValue(currentValue);
                return field.onChange(currentValue);
              }

              if (type === 'number') {
                const onlyNums = currentValue.replace(/[^0-9.]/g, '');
                const onlyNumsArray = onlyNums.split('.');

                if (onlyNumsArray.length > 2) return;

                if (onlyNumsArray.length === 2) {
                  if (onlyNumsArray[1].length > limitDecimals) return;
                }

                field.onChange(onlyNums);
                onChangeValue && onChangeValue(onlyNums);
                return;
              }

              if (type === 'password') {
                onChangeValue && onChangeValue(currentValue);
                return field.onChange(currentValue);
              }

              field.onChange(currentValue.toUpperCase());

              onChangeValue && onChangeValue(currentValue?.toUpperCase());
            };

            return (
              <>
                <CustomFormLabel
                  sx={{
                    mt: 0,
                  }}
                  htmlFor={label}
                  required={required}
                >
                  {label}
                </CustomFormLabel>
                <TextField
                  {...field}
                  size={sizeTextField}
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    ...(shrink && { shrink: true }),
                  }}
                  InputProps={{
                    ...InputProps,
                    startAdornment:
                      type === 'email' ? (
                        <InputAdornment position="start">
                          <MdEmail />
                        </InputAdornment>
                      ) : (
                        (startAdornmentInput ?? null)
                      ),

                    endAdornment: endAdornmentInput ?? null,
                  }}
                  error={!!error || emailError}
                  helperText={
                    emailError
                      ? 'Correo electrónico inválido'
                      : helperText || defaultHelperText
                  }
                  type={type}
                  onChange={onChange}
                  required={required}
                  inputProps={{ readOnly: disabled }}
                  sx={{
                    ...(sxTextField as any),
                    ...(disabled && {
                      background: 'rgba(0, 0, 0, 0.04)',
                      borderRadius: '13px',
                    }),
                  }}
                  placeholder={placeholder}
                />
              </>
            );
          }}
        ></Controller>
      </FormControl>
    </Grid>
  );
};

export default CustomTextField;

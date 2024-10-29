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
import creditCardType from 'credit-card-type';

type CustomCreditCardTextFieldProps = {
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

  onChangeCardType: (value: any) => void;
};

const CustomCreditCardTextField: React.FC<CustomCreditCardTextFieldProps> = ({
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

  onChangeCardType,
}) => {
  const [emailError, setEmailError] = useState<boolean>(false);
  const [cardType, setCardType] = useState<string | null>(null);
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

              if (currentValue === '') {
                setCardType(null);
                onChangeCardType('');
                field.onChange('');
                onChangeValue && onChangeValue('');
                return;
              }

              if (onlyNumbers) {
                const onlyNums = currentValue.replace(/[^0-9]/g, '');
                if (maxLength && onlyNums.length > maxLength) return;

                // Detectar tipo de tarjeta
                const detectedCardType = creditCardType(onlyNums);
                const detectedTypeName = detectedCardType.length
                  ? detectedCardType[0].type
                  : null;
                setCardType(detectedTypeName);

                // Llamar al callback `onChangeCardType` con el tipo de tarjeta detectado
                onChangeCardType(detectedTypeName);

                field.onChange(onlyNums);
                onChangeValue && onChangeValue(onlyNums);
                return;
              }

              if (ignoreTransform) {
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
                  {label} {cardType && `(${cardType})`}
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
                  inputProps={{ readOnly: disabled, pattern: '[d| ]{16,22}' }}
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

export default CustomCreditCardTextField;

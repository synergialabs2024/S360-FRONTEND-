import React, { useState, useMemo, useEffect, useRef } from 'react';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { Control, Controller } from 'react-hook-form';
import {
  Autocomplete,
  Checkbox,
  FormControl,
  Grid,
  TextField,
} from '@mui/material';

import { gridSize } from '@/shared/constants/ui';
import { GridSizeType } from '@/shared/interfaces';
import { CustomCircularPorgress, CustomFormLabel } from '@/shared/components';

const icon = <MdCheckBoxOutlineBlank />;
const checkedIcon = <MdCheckBox />;

export type CustomCuentaContableProps<
  T extends { id: string | number; nombre: string },
> = {
  options: T[];
  defaultValue?: (string | number)[];
  loadingText?: string;
  isLoadingData: boolean;
  control: Control<any, any>;
  label: string;
  name: string;
  disabled?: boolean;
  helperText?: React.ReactNode;
  required?: boolean;
  size?: GridSizeType;
  limitTags?: number;
};

export default function CustomCuentaContable<
  T extends {
    cuenta_padre_data: null;
    id: string | number;
    nombre: string;
  },
>({
  options,
  isLoadingData,
  loadingText = 'Cargando...',
  label,
  name,
  control,
  defaultValue,
  helperText,
  required = true,
  disabled = false,
  size = gridSize,
  limitTags = 2,
}: CustomCuentaContableProps<T>) {
  const [selectedValue, setSelectedValue] = useState<T[]>([]);
  const hasLoggedRef = useRef(false);

  const formatCuentaData = (
    cuenta: any,
    parentId: string = '',
    parentNombre: string = '',
  ): any[] => {
    const idModificada = parentId ? `${parentId}.${cuenta.id}` : `${cuenta.id}`;
    const label = parentNombre
      ? `${parentNombre} - ${idModificada}`
      : `${cuenta.nombre} - ${idModificada}`;

    let formattedData = [
      {
        id: idModificada,
        label: label,
      },
    ];

    if (cuenta.cuentas_hijas_data && cuenta.cuentas_hijas_data.length > 0) {
      cuenta.cuentas_hijas_data.forEach((hija: any) => {
        formattedData = [
          ...formattedData,
          ...formatCuentaData(
            hija,
            idModificada,
            parentNombre || cuenta.nombre,
          ),
        ];
      });
    }

    return formattedData;
  };

  const filteredOptions = options.filter(
    option => option.cuenta_padre_data === null,
  );

  const formattedOptions = useMemo(() => {
    return filteredOptions.flatMap(option => formatCuentaData(option));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  useEffect(() => {
    if (defaultValue) {
      const selectedOptions = formattedOptions.filter(option =>
        defaultValue.includes(option.id),
      );
      setSelectedValue(selectedOptions);
    }
  }, [defaultValue, formattedOptions]);

  useEffect(() => {
    if (!hasLoggedRef.current) {
      hasLoggedRef.current = true;
    }
  }, []);

  const onChange = (_event: React.ChangeEvent<{}>, newValue: T[]) => {
    setSelectedValue(newValue);
  };

  return (
    <Grid item {...size}>
      {isLoadingData ? (
        <CustomCircularPorgress />
      ) : (
        <FormControl fullWidth>
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
              <>
                <CustomFormLabel
                  sx={{ mt: 0 }}
                  htmlFor={name}
                  required={required}
                >
                  {label}
                </CustomFormLabel>
                <Autocomplete
                  multiple
                  id="checkboxes-tags"
                  limitTags={limitTags}
                  value={selectedValue}
                  options={formattedOptions}
                  loading={isLoadingData}
                  loadingText={loadingText}
                  disableCloseOnSelect
                  getOptionLabel={(option: any) => option.label}
                  renderOption={(props, option, { selected }) => {
                    const { key, ...restProps } = props;
                    return (
                      <li key={key} {...restProps}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.label}
                      </li>
                    );
                  }}
                  onChange={(event, newValue) => {
                    field.onChange(newValue);
                    onChange(event, newValue);
                  }}
                  disabled={disabled}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label={label}
                      helperText={helperText}
                      required={required}
                      disabled={disabled}
                    />
                  )}
                />
                {helperText && (
                  <div style={{ marginTop: '8px' }}>{helperText}</div>
                )}
              </>
            )}
          />
        </FormControl>
      )}
    </Grid>
  );
}

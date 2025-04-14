import React, { useState, useMemo, useEffect } from 'react';
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

type FormattedOption = {
  id: number;
  label: string;
};

export type CustomCuentaContableProps<T> = {
  options: T[];
  defaultValue?: any[];
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
  T extends { id: number; nombre: string; codigo: string },
>({
  options,
  defaultValue = [],
  isLoadingData,
  loadingText = 'Cargando...',
  label,
  name,
  control,
  helperText,
  required = true,
  disabled = false,
  size = gridSize,
  limitTags = 2,
}: CustomCuentaContableProps<T>) {
  const formattedOptions = useMemo<FormattedOption[]>(() => {
    return options.map(option => ({
      id: option.id,
      label: `${option.nombre} - ${option.codigo}`,
    }));
  }, [options]);

  const [selectedValue, setSelectedValue] = useState<FormattedOption[]>([]);

  useEffect(() => {
    if (defaultValue?.length) {
      const selected = formattedOptions.filter(opt =>
        defaultValue.includes(opt.id),
      );
      setSelectedValue(selected);
    }
  }, [defaultValue, formattedOptions]);

  const onChange = (
    _event: React.ChangeEvent<{}>,
    newValue: FormattedOption[],
  ) => {
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
            defaultValue={defaultValue ?? []}
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
                  getOptionLabel={option => option.label}
                  renderOption={(props, option, { selected }) => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { key, ...rest } = props;
                    return (
                      <li key={option.id} {...rest}>
                        {' '}
                        {/* Usamos el `key` directamente */}
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
                    field.onChange(newValue.map(opt => opt.id)); // solo enviamos los IDs al form
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
              </>
            )}
          />
        </FormControl>
      )}
    </Grid>
  );
}

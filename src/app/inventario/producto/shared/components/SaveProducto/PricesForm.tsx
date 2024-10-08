import { Checkbox, Grid, IconButton, TextField } from '@mui/material';
import { useEffect } from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import { MdDelete } from 'react-icons/md';

import { CustomSingleButton, CustomTypoLabel } from '@/shared/components';

type PricesFormProps = {
  control: any;
  watch: any;
  setValue: any;
  formState: any;
};

export const PricesForm: React.FC<PricesFormProps> = ({
  control,
  watch,
  formState: { errors },
}) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'precios',
  });

  const precios = watch('precios');

  useEffect(() => {
    if (precios) {
      const defaultCount = precios.filter(
        (precio: any) => precio.default,
      ).length;
      if (defaultCount > 1) {
        // validate that only one default is selected
        const firstDefaultIndex = precios.findIndex(
          (precio: any) => precio.default,
        );
        precios.forEach((precio: any, index: number) => {
          if (precio.default && index !== firstDefaultIndex) {
            update(index, { ...precio, default: false });
          }
        });
      }
    }
  }, [precios, update]);

  const handleDefaultChange = (index: number) => {
    precios.forEach((precio: any, i: number) => {
      update(i, { ...precio, default: i === index });
    });
  };

  return (
    <Grid item container spacing={2}>
      <CustomTypoLabel text="Precios" />

      <Grid item xs={12} container spacing={2}>
        {fields.map((field, index) => (
          <Grid
            item
            xs={12}
            key={field.id}
            container
            spacing={1}
            sx={{ pt: index !== 0 ? '12px' : 0 }}
          >
            {/* Campo Nombre con transformación a mayúsculas */}
            <Grid item xs={3}>
              <Controller
                control={control}
                name={`precios.${index}.nombre`}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <TextField
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    value={value || ''}
                    onChange={e => {
                      const upperValue = e.target.value.toUpperCase();
                      onChange(upperValue);
                    }}
                    inputRef={ref}
                    onBlur={onBlur}
                    error={!!errors?.precios?.[index]?.nombre}
                    helperText={errors?.precios?.[index]?.nombre?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                label="Valor"
                variant="outlined"
                fullWidth
                type="number"
                inputProps={{
                  min: 0,
                  step: 1,
                }}
                {...control.register(`precios.${index}.valor`, {
                  valueAsNumber: true,
                })}
                error={!!errors?.precios?.[index]?.valor}
                helperText={errors?.precios?.[index]?.valor?.message}
              />
            </Grid>

            {/* Campo Descripción con transformación a mayúsculas */}
            <Grid item xs={4}>
              <Controller
                control={control}
                name={`precios.${index}.descripcion`}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <TextField
                    label="Descripción"
                    variant="outlined"
                    fullWidth
                    value={value || ''}
                    onChange={e => {
                      const upperValue = e.target.value.toUpperCase();
                      onChange(upperValue);
                    }}
                    inputRef={ref}
                    onBlur={onBlur}
                    error={!!errors?.precios?.[index]?.descripcion}
                    helperText={errors?.precios?.[index]?.descripcion?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={2}>
              <Checkbox
                checked={precios[index]?.default || false}
                onChange={() => handleDefaultChange(index)}
              />
              Default
            </Grid>

            <Grid item xs={1}>
              <IconButton color="error" onClick={() => remove(index)}>
                <MdDelete />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </Grid>

      <CustomSingleButton
        label="Agregar Precio"
        variant="outlined"
        onClick={() =>
          append({ nombre: '', valor: 0, default: false, descripcion: '' })
        }
      />
    </Grid>
  );
};

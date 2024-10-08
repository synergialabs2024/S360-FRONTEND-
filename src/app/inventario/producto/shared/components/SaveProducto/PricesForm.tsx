import { Checkbox, Grid, IconButton } from '@mui/material';
import { useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import { MdDelete } from 'react-icons/md';

import { gridSizeMdLg2, gridSizeMdLg3, gridSizeMdLg4 } from '@/shared';
import {
  CustomSingleButton,
  CustomTextField,
  CustomTypoLabel,
} from '@/shared/components';

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
        // Validar que solo un precio esté seleccionado como default
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
            <CustomTextField
              label="Nombre"
              control={control}
              name={`precios.${index}.nombre`}
              error={errors?.precios?.[index]?.nombre}
              helperText={errors?.precios?.[index]?.nombre?.message}
              size={gridSizeMdLg4}
            />

            <CustomTextField
              label="Valor"
              control={control}
              name={`precios.${index}.valor`}
              error={errors?.precios?.[index]?.valor}
              helperText={errors?.precios?.[index]?.valor?.message}
              type="number"
              onlyNumbers={true}
              InputProps={{
                inputProps: {
                  min: 0,
                  step: 1,
                },
              }}
              size={gridSizeMdLg2}
            />
            <CustomTextField
              label="Descripción"
              control={control}
              name={`precios.${index}.descripcion`}
              error={errors?.precios?.[index]?.descripcion}
              helperText={errors?.precios?.[index]?.descripcion?.message}
              required={false}
              size={gridSizeMdLg3}
            />

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

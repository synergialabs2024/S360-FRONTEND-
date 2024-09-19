import { UseFormReturn } from 'react-hook-form';

import { gridSizeMdLg6, Preventa } from '@/shared';
import {
  CustomDatePicker,
  CustomTextField,
  CustomTextFieldNoForm,
} from '@/shared/components';
import { FormHelperText, Grid } from '@mui/material';
import type { SaveFormDataAgendaVentas } from '../SaveAgendamiento';

export type AgendamientoSaveAgendaStepProps = {
  form: UseFormReturn<SaveFormDataAgendaVentas>;
  preventa: Preventa;
};

const AgendamientoSaveAgendaStep: React.FC<AgendamientoSaveAgendaStepProps> = ({
  form,
  preventa,
}) => {
  const { errors } = form.formState;

  return (
    <>
      <CustomDatePicker
        label="Fecha instalacion"
        name="fecha_instalacion"
        control={form.control}
        defaultValue={form.getValues().fecha_instalacion}
        error={errors.fecha_instalacion}
        helperText={errors.fecha_instalacion?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Hora instalacion"
        name="hora_instalacion"
        control={form.control}
        defaultValue={form.getValues().hora_instalacion}
        error={errors.hora_instalacion}
        helperText={errors.hora_instalacion?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextFieldNoForm
        label="NAP"
        value={preventa?.nap_data?.name || 'N/A'}
        disabled
      />
      <CustomTextFieldNoForm
        label="Distancia"
        value={preventa?.distancia_nap || 'N/A'}
        disabled
        endAdornment="m"
      />

      <Grid item xs={12} m={0} p={0}>
        <FormHelperText
          sx={{
            textAlign: 'left',
          }}
        >
          *La distancia es un valor aproximado en metros, calculado entre las
          coordenadas del usuario y la NAP asignada.
        </FormHelperText>
      </Grid>
    </>
  );
};

export default AgendamientoSaveAgendaStep;

import { UseFormReturn } from 'react-hook-form';

import { gridSizeMdLg6 } from '@/shared';
import {
  CustomCardAlert,
  CustomNumberTextField,
  CustomTextField,
  CustomTypoLabel,
} from '@/shared/components';
import { SaveFormDataPreventa } from '../SavePreventa';

export type DatosGeneralesPreventaP1Props = {
  form: UseFormReturn<Partial<SaveFormDataPreventa>>;
  canEditEmail?: boolean;
};

const DatosGeneralesPreventaP1: React.FC<DatosGeneralesPreventaP1Props> = ({
  form,
  canEditEmail = false,
}) => {
  const { errors } = form.formState;

  const watchedEsTerceraEdad = form.watch('es_tercera_edad');
  const watchedEsDiscapacitado = form.watch('es_discapacitado');

  return (
    <>
      <CustomTypoLabel text="Datos Cliente" />

      <CustomTextField
        label="Tipo identificación"
        name="tipo_identificacion"
        control={form.control}
        defaultValue={form.getValues().tipo_identificacion}
        error={errors.tipo_identificacion}
        helperText={errors.tipo_identificacion?.message}
        disabled
        size={gridSizeMdLg6}
      />
      <CustomTextField
        label="Identificación"
        name="identificacion"
        control={form.control}
        defaultValue={form.getValues().identificacion}
        error={errors.identificacion}
        helperText={errors.identificacion?.message}
        disabled
        size={gridSizeMdLg6}
      />
      <CustomTextField
        label="Nombre"
        name="razon_social"
        control={form.control}
        defaultValue={form.getValues().razon_social}
        error={errors.razon_social}
        helperText={errors.razon_social?.message}
        disabled
      />

      <CustomTextField
        label="Fecha nacimiento"
        name="fecha_nacimiento"
        control={form.control}
        defaultValue={form.getValues().fecha_nacimiento}
        error={errors.fecha_nacimiento}
        helperText={errors.fecha_nacimiento?.message}
        disabled
        size={gridSizeMdLg6}
      />
      <CustomNumberTextField
        label="Edad"
        name="edad"
        control={form.control}
        defaultValue={form.getValues().edad}
        error={errors.edad}
        helperText={errors.edad?.message}
        disabled
        size={gridSizeMdLg6}
      />
      <CustomTextField
        label="Email"
        name="email"
        type="email"
        control={form.control}
        defaultValue={form.getValues().email}
        error={errors.email}
        helperText={errors.email?.message}
        disabled={!canEditEmail}
      />

      <>
        {watchedEsTerceraEdad && (
          <CustomCardAlert
            sizeType="small"
            alertMessage={'El cliente es de tercera edad'}
            alertSeverity="info"
          />
        )}
        {watchedEsDiscapacitado && (
          <CustomCardAlert
            sizeType="small"
            alertMessage={'El cliente es discapacitado'}
            alertSeverity="info"
          />
        )}
      </>
    </>
  );
};

export default DatosGeneralesPreventaP1;

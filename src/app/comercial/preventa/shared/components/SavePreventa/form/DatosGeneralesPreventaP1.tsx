import { UseFormReturn } from 'react-hook-form';

import { gridSizeMdLg6 } from '@/shared';
import {
  CustomNumberTextField,
  CustomTextField,
  CustomTypoLabel,
} from '@/shared/components';
import { SaveFormDataPreventa } from '../SavePreventa';

export type DatosGeneralesPreventaP1Props = {
  form: UseFormReturn<Partial<SaveFormDataPreventa>>;
};

const DatosGeneralesPreventaP1: React.FC<DatosGeneralesPreventaP1Props> = ({
  form,
}) => {
  const { errors } = form.formState;

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
        label="Razon social"
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
        disabled
      />
    </>
  );
};

export default DatosGeneralesPreventaP1;

import { UseFormReturn } from 'react-hook-form';

import {
  DIAS_RECORDATORIO_PAGO_ARRAY_OBJ,
  DiasRecordatorioPagoType,
  gridSizeMdLg6,
  RECORDATORIO_PAGO_TIPOS_ARRAY_CHOICES,
} from '@/shared';
import { CustomAutocomplete, SelectArrayString } from '@/shared/components';
import { SaveFormDataConfigPlantilla } from './SaveConfiguracionPlantilla';

export type ConfiguracionPlantillaNotificacionPartProps = {
  form: UseFormReturn<SaveFormDataConfigPlantilla>;
};

const ConfiguracionPlantillaNotificacionPart: React.FC<
  ConfiguracionPlantillaNotificacionPartProps
> = ({ form }) => {
  ///* form ---------------------
  const { errors } = form?.formState || {};

  return (
    <>
      <SelectArrayString
        label="Recordatorio de pago (medio)"
        name="recordatorio_pago"
        control={form.control}
        error={errors.recordatorio_pago}
        helperText={errors.recordatorio_pago?.message}
        defaultValue={form.getValues('recordatorio_pago')}
        options={RECORDATORIO_PAGO_TIPOS_ARRAY_CHOICES}
      />

      <CustomAutocomplete<DiasRecordatorioPagoType>
        label="Recordatorio 1"
        name="recordatorio_1"
        // options
        options={DIAS_RECORDATORIO_PAGO_ARRAY_OBJ}
        valueKey="label"
        actualValueKey="value"
        defaultValue={form.getValues().recordatorio_1}
        isLoadingData={false}
        // vaidation
        control={form.control}
        error={errors.recordatorio_1}
        helperText={errors.recordatorio_1?.message}
        size={gridSizeMdLg6}
      />

      <CustomAutocomplete<DiasRecordatorioPagoType>
        label="Recordatorio 2"
        name="recordatorio_2"
        // options
        options={DIAS_RECORDATORIO_PAGO_ARRAY_OBJ}
        valueKey="label"
        actualValueKey="value"
        defaultValue={form.getValues().recordatorio_2}
        isLoadingData={false}
        // vaidation
        control={form.control}
        error={errors.recordatorio_2}
        helperText={errors.recordatorio_2?.message}
        size={gridSizeMdLg6}
      />
      <CustomAutocomplete<DiasRecordatorioPagoType>
        label="Recordatorio 3"
        name="recordatorio_3"
        // options
        options={DIAS_RECORDATORIO_PAGO_ARRAY_OBJ}
        valueKey="label"
        actualValueKey="value"
        defaultValue={form.getValues().recordatorio_3}
        isLoadingData={false}
        // vaidation
        control={form.control}
        error={errors.recordatorio_3}
        helperText={errors.recordatorio_3?.message}
        size={gridSizeMdLg6}
      />
    </>
  );
};

export default ConfiguracionPlantillaNotificacionPart;

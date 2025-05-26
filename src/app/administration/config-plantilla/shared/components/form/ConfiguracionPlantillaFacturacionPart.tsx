import { UseFormReturn } from 'react-hook-form';
import { useEffect } from 'react';

import {
  CustomAutocomplete,
  CustomTextFieldNoForm,
  CustomAutocompleteSimple,
} from '@/shared/components';
import {
  useLoaders,
  ToastWrapper,
  gridSizeMdLg4,
  CalendarioFacturacion,
  DiasAntesCreacionFacturaType,
  CREAR_FACTURA_DIAS_ANTES_ARRAY_OBJ,
} from '@/shared';
import { useRubroStore } from '@/store/app/rubros';
import { useFetchCalendarioFacturaciones } from '@/actions/app';
import { SaveFormDataConfigPlantilla } from './SaveConfiguracionPlantilla';

export type ConfiguracionPlantillaFacturacionPartProps = {
  form: UseFormReturn<SaveFormDataConfigPlantilla>;
};

const ConfiguracionPlantillaFacturacionPart: React.FC<
  ConfiguracionPlantillaFacturacionPartProps
> = ({ form }) => {
  ///* global state --------------------------
  const setCalendariosFacturacion = useRubroStore(
    s => s.setCalendariosFacturacion,
  );

  ///* form ---------------------
  const { errors } = form?.formState || {};

  ///* fetch data ----------------
  const {
    data: calendarioFacturacionesPagingRes,
    isLoading: isCalendarioFacturacionesLoading,
    isRefetching: isCalendarioFacturacionesRefetching,
  } = useFetchCalendarioFacturaciones({
    //enabled: !!serviceLine?.id,
    params: {
      page_size: 1002,
      aplica_nuevo: true,
    },
  });

  const isCustomLoading =
    isCalendarioFacturacionesLoading || isCalendarioFacturacionesRefetching;
  useLoaders(isCustomLoading);

  ///* effects ----------------
  useEffect(() => {
    if (isCustomLoading) return;

    // alert no calendarios
    if (calendarioFacturacionesPagingRes?.data?.meta.count === 0) {
      ToastWrapper.error('No se encontraron calendarios de facturación.');
    }
    // set calendarios
    setCalendariosFacturacion(
      calendarioFacturacionesPagingRes?.data?.items || [],
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCustomLoading, calendarioFacturacionesPagingRes]);

  if (isCustomLoading) return null;

  return (
    <>
      {/* ---------- CalendarioFacturacion ---------- */}
      <CustomAutocompleteSimple<CalendarioFacturacion>
        label="Dia de pago"
        name="dia_pago"
        // options
        options={calendarioFacturacionesPagingRes?.data?.items || []}
        valueKey="dia_pago"
        actualValueKey="dia_pago"
        defaultValue={form.getValues().dia_pago}
        isLoadingData={false}
        // vaidation
        control={form.control}
        size={gridSizeMdLg4}
        onChangeRawValue={row => {
          form.setValue('dia_facturacion', row.dia_facturacion);
          form.setValue('dia_suspension', row.dia_suspension);
          form.setValue('dia_pago_limite', row.dia_maximo_pago);
          form.setValue('dias_gracia', row.dias_gracia);
        }}
      />
      {/*
      <CustomTextFieldNoForm
        label="Día de facturación"
        size={gridSizeMdLg4}
        value={form.getValues().dia_facturacion}
        required={false}
        disabled
      />
      */}
      <CustomTextFieldNoForm
        label="Día de gracia"
        size={gridSizeMdLg4}
        value={form.getValues().dias_gracia}
        required={false}
        disabled
      />
      <CustomTextFieldNoForm
        label="Día maximo de pago"
        size={gridSizeMdLg4}
        value={form.getValues().dia_pago_limite}
        required={false}
        disabled
      />
      <CustomTextFieldNoForm
        label="Día de suspensión"
        size={gridSizeMdLg4}
        value={form.getValues().dia_suspension}
        required={false}
        disabled
      />

      <CustomAutocomplete<DiasAntesCreacionFacturaType>
        label="Crea factura días antes"
        name="crea_factura"
        // options
        options={CREAR_FACTURA_DIAS_ANTES_ARRAY_OBJ}
        valueKey="label"
        actualValueKey="value"
        defaultValue={form.getValues().crea_factura}
        isLoadingData={false}
        // vaidation
        control={form.control}
        error={errors.crea_factura}
        helperText={errors.crea_factura?.message}
        size={gridSizeMdLg4}
        disabled
      />
      {/*
      <SampleCheckbox
        label="Bajar velocidad"
        name="bajar_velocidad"
        control={form.control}
        defaultValue={form.getValues().bajar_velocidad}
        size={gridSizeMdLg6}
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
        customHelperText="No suspende en el día de suspensión, sino que baja velocidad"
      />
      <SampleCheckbox
        label="Aplica mora"
        name="aplica_mora"
        control={form.control}
        defaultValue={form.getValues().aplica_mora}
        size={gridSizeMdLg3}
      />
      <SampleCheckbox
        label="Aplica reconexion"
        name="aplica_reconexion"
        control={form.control}
        defaultValue={form.getValues().aplica_reconexion}
        size={gridSizeMdLg3}
      />
      */}
    </>
  );
};

export default ConfiguracionPlantillaFacturacionPart;

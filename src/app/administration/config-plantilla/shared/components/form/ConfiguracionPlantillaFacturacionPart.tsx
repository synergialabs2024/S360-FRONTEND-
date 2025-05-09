import { UseFormReturn } from 'react-hook-form';
import { useEffect } from 'react';

import {
  useLoaders,
  ToastWrapper,
  gridSizeMdLg4,
  CalendarioFacturacion,
  DiasAntesCreacionFacturaType,
  CREAR_FACTURA_DIAS_ANTES_ARRAY_OBJ,
} from '@/shared';
import { useFetchIVAs } from '@/actions/app';
import { useRubroStore } from '@/store/app/rubros';
import { SaveFormDataConfigPlantilla } from './SaveConfiguracionPlantilla';
import { CustomAutocomplete, CustomTextFieldNoForm } from '@/shared/components';

export type ConfiguracionPlantillaFacturacionPartProps = {
  form: UseFormReturn<SaveFormDataConfigPlantilla>;
};

const ConfiguracionPlantillaFacturacionPart: React.FC<
  ConfiguracionPlantillaFacturacionPartProps
> = ({ form }) => {
  ///* global state --------------------------
  const calendariosFacturacion = useRubroStore(s => s.calendariosFacturacion);

  ///* form ---------------------
  const { errors } = form?.formState || {};

  console.log(form.getValues('dia_pago'));

  ///* fetch data ---------------------
  const {
    data: ivasPagingRes,
    isLoading: isLoadingIvas,
    isRefetching: isRefetchingIvas,
  } = useFetchIVAs({
    params: {
      page_size: 1100,
    },
  });

  ///* effects ---------------------
  useEffect(() => {
    if (isLoadingIvas || isRefetchingIvas) return;

    if (!ivasPagingRes?.data?.items?.length) {
      ToastWrapper.error(
        'No se encontraron impuestos registrados en el sistema',
      );
    }
  }, [isLoadingIvas, isRefetchingIvas, ivasPagingRes?.data?.items?.length]);
  const isCustomLoader = isLoadingIvas || isRefetchingIvas;
  useLoaders(isCustomLoader);

  return (
    <>
      {/* ---------- CalendarioFacturacion ---------- */}
      <CustomAutocomplete<CalendarioFacturacion>
        label="Dia de pago"
        name="dia_pago"
        // options
        options={
          calendariosFacturacion.filter(i => i.aplica_nuevo == true) || []
        }
        valueKey="dia_pago"
        defaultValue={form.getValues().dia_pago}
        isLoadingData={false}
        // vaidation
        control={form.control}
        error={errors.dia_pago}
        helperText={errors.dia_pago?.message}
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
      {/*
        <>
          <CustomAutocomplete<IVA>
            label="Impuesto 1"
            name="impuesto_1"
            // options
            options={ivasPagingRes?.data?.items || []}
            valueKey="name"
            actualValueKey="id"
            defaultValue={form.getValues().impuesto_1}
            isLoadingData={isLoadingIvas || isRefetchingIvas}
            // vaidation
            control={form.control}
            error={errors.impuesto_1}
            helperText={errors.impuesto_1?.message}
            size={gridSizeMdLg4}
            required={false}
          />
          <CustomAutocomplete<IVA>
            label="Impuesto 2"
            name="impuesto_2"
            // options
            options={ivasPagingRes?.data?.items || []}
            valueKey="name"
            actualValueKey="id"
            defaultValue={form.getValues().impuesto_2}
            isLoadingData={isLoadingIvas || isRefetchingIvas}
            // vaidation
            control={form.control}
            error={errors.impuesto_2}
            helperText={errors.impuesto_2?.message}
            size={gridSizeMdLg4}
            required={false}
          />
          <CustomAutocomplete<IVA>
            label="Impuesto 3"
            name="impuesto_3"
            // options
            options={ivasPagingRes?.data?.items || []}
            valueKey="name"
            actualValueKey="id"
            defaultValue={form.getValues().impuesto_3}
            isLoadingData={isLoadingIvas || isRefetchingIvas}
            // vaidation
            control={form.control}
            error={errors.impuesto_3}
            helperText={errors.impuesto_3?.message}
            size={gridSizeMdLg4}
            required={false}
          />
        </>
      */}
    </>
  );
};

export default ConfiguracionPlantillaFacturacionPart;

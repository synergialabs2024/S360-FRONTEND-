import { UseFormReturn } from 'react-hook-form';
import { useEffect } from 'react';

import { useFetchIVAs } from '@/actions/app';
import {
  CREAR_FACTURA_DIAS_ANTES_ARRAY_OBJ,
  DIAS_GRACIA_ARRAY_OBJ_NUM_VALUE,
  DIAS_PAGO_OBJ_01_TO_28,
  DiasAntesCreacionFacturaType,
  DiasGraciaType,
  gridSizeMdLg3,
  gridSizeMdLg4,
  gridSizeMdLg6,
  ToastWrapper,
  useLoaders,
} from '@/shared';
import {
  CustomAutocomplete,
  SampleCheckbox,
  SelectTextFieldArrayString,
} from '@/shared/components';
import { SaveFormDataConfigPlantilla } from './SaveConfiguracionPlantilla';

export type ConfiguracionPlantillaFacturacionPartProps = {
  form: UseFormReturn<SaveFormDataConfigPlantilla>;
};

const ConfiguracionPlantillaFacturacionPart: React.FC<
  ConfiguracionPlantillaFacturacionPartProps
> = ({ form }) => {
  ///* form ---------------------
  const { errors } = form?.formState || {};

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
      <SelectTextFieldArrayString
        label="Día de pago"
        name="dia_pago"
        textFieldKey="dia_pago"
        // options
        options={DIAS_PAGO_OBJ_01_TO_28.map(i => i.value)}
        defaultValue={form.getValues()?.dia_pago || ''}
        // errors
        control={form.control}
        error={form.formState.errors.dia_pago}
        helperText={form.formState.errors.dia_pago?.message}
        gridSize={gridSizeMdLg4}
      />
      <SelectTextFieldArrayString
        label="Día de facturación"
        name="dia_facturacion"
        textFieldKey="dia_facturacion"
        // options
        options={DIAS_PAGO_OBJ_01_TO_28.map(i => i.value)}
        defaultValue={form.getValues()?.dia_facturacion || ''}
        // errors
        control={form.control}
        error={form.formState.errors.dia_facturacion}
        helperText={form.formState.errors.dia_facturacion?.message}
        gridSize={gridSizeMdLg4}
        disabled
      />
      <SelectTextFieldArrayString
        label="Día de suspensión"
        name="dia_suspension"
        textFieldKey="dia_suspension"
        // options
        options={DIAS_PAGO_OBJ_01_TO_28.map(i => i.value)}
        defaultValue={form.getValues()?.dia_suspension || ''}
        // errors
        control={form.control}
        error={form.formState.errors.dia_suspension}
        helperText={form.formState.errors.dia_suspension?.message}
        gridSize={gridSizeMdLg4}
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
        size={gridSizeMdLg6}
        disabled
      />

      <CustomAutocomplete<DiasGraciaType>
        label="Días de gracia"
        name="dias_gracia"
        // options
        options={DIAS_GRACIA_ARRAY_OBJ_NUM_VALUE}
        valueKey="label"
        actualValueKey="value"
        defaultValue={form.getValues().dias_gracia}
        isLoadingData={false}
        // vaidation
        control={form.control}
        error={errors.dias_gracia}
        helperText={errors.dias_gracia?.message}
        size={gridSizeMdLg6}
        disabled
      />

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

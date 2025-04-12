import { Grid } from '@mui/material';
import { useEffect } from 'react';
import Cards from 'react-credit-cards-2';
import { UseFormReturn } from 'react-hook-form';

import {
  useFetchEntidadFinancieras,
  useFetchMetodoPagos,
  useFetchTarjetas,
} from '@/actions/app';
import {
  EntidadFinanciera,
  gridSizeMdLg6,
  MetodoPago,
  MetodoPagoEnumUUID,
  Tarjeta,
  TIPO_CUENTA_BANCARIA_ARRAY_CHOICES,
  ToastWrapper,
} from '@/shared';
import {
  CustomAutocomplete,
  CustomCreditCardTextField,
  CustomExpirateDateTextField,
  CustomTextField,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  SelectTextFieldArrayString,
} from '@/shared/components';
import type { SaveFormDataPreventa } from '../../SavePreventa';

export type PaymentMethodPreventaFormPartProps = {
  form: UseFormReturn<SaveFormDataPreventa>;
};

const PaymentMethodPreventaFormPart: React.FC<
  PaymentMethodPreventaFormPartProps
> = ({ form }) => {
  ///* form ----------------
  const { errors } = form.formState;

  const watcherNumberCreditCard = form.watch('numero_tarjeta_credito');
  const watcherExpirateCreditCard = form.watch('fecha_vencimiento_tarjeta');
  const watcherOwnerCreditCard = form.watch('titular_tarjeta');
  const watchedRawPaymentMethod = form.watch('rawPaymentMethod');

  ///* fetch data -------------
  // payment methods ---
  const {
    data: metodoPagosPaging,
    isLoading: isLoadingMetodoPagos,
    isRefetching: isRefetchingMetodoPagos,
  } = useFetchMetodoPagos({
    params: {
      page_size: 900,
    },
  });
  const {
    data: entidadFinancierasPaging,
    isLoading: isLoadingEntidadFinancieras,
    isRefetching: isRefetchingEntidadFinancieras,
  } = useFetchEntidadFinancieras({
    params: {
      page_size: 900,
    },
  });
  const {
    data: tarjetasPaging,
    isLoading: isLoadingTarjetas,
    isRefetching: isRefetchingTarjetas,
  } = useFetchTarjetas({
    params: {
      page_size: 900,
    },
  });

  ///* effects -------------
  useEffect(() => {
    if (
      isLoadingMetodoPagos ||
      isRefetchingMetodoPagos ||
      isLoadingEntidadFinancieras ||
      isRefetchingEntidadFinancieras ||
      isLoadingTarjetas ||
      isRefetchingTarjetas
    )
      return;
    if (!watchedRawPaymentMethod) return;

    // entidad financiera
    if (!entidadFinancierasPaging?.data?.items?.length)
      ToastWrapper.error(
        'No se encontraron entidades financieras para el método de pago seleccionado',
      );
    // tarjetas
    if (!tarjetasPaging?.data?.items?.length)
      ToastWrapper.error(
        'No se encontraron tarjetas para el método de pago seleccionado',
      );
  }, [
    entidadFinancierasPaging,
    isLoadingEntidadFinancieras,
    isLoadingMetodoPagos,
    isLoadingTarjetas,
    isRefetchingEntidadFinancieras,
    isRefetchingMetodoPagos,
    isRefetchingTarjetas,
    tarjetasPaging?.data?.items?.length,
    watchedRawPaymentMethod,
  ]);

  return (
    <>
      <CustomTypoLabel
        text="Método de pago"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />

      <CustomAutocomplete<MetodoPago>
        label="Método de pago"
        name="metodo_pago"
        // options
        options={metodoPagosPaging?.data?.items || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().metodo_pago}
        isLoadingData={isLoadingMetodoPagos || isRefetchingMetodoPagos}
        // vaidation
        control={form.control}
        error={errors.metodo_pago}
        helperText={errors.metodo_pago?.message}
        size={gridSizeMdLg6}
        onChangeValue={() => {
          // reset related fields
          form.setValue('entidad_financiera', '' as any);
          form.setValue('tipo_cuenta_bancaria', '' as any);
          form.setValue('numero_cuenta_bancaria', '');
          form.setValue('tarjeta', '' as any);
          form.setValue('numero_tarjeta_credito', '');
          form.setValue('fecha_vencimiento_tarjeta', '');
          form.setValue('titular_tarjeta', '');
        }}
        onChangeRawValue={rawValue => {
          form.setValue('rawPaymentMethod', rawValue);
          form.setValue('selectedPromoOptions', []);
        }}
      />
      {watchedRawPaymentMethod?.uuid === MetodoPagoEnumUUID.DEBITO ? (
        <>
          <CustomAutocomplete<EntidadFinanciera>
            label="Entidad financiera"
            name="entidad_financiera"
            // options
            options={entidadFinancierasPaging?.data?.items || []}
            valueKey="name"
            actualValueKey="id"
            defaultValue={form.getValues().entidad_financiera}
            isLoadingData={
              isLoadingEntidadFinancieras || isRefetchingEntidadFinancieras
            }
            // vaidation
            control={form.control}
            error={errors.entidad_financiera}
            helperText={errors.entidad_financiera?.message}
            size={gridSizeMdLg6}
          />
          <SelectTextFieldArrayString
            label="Tipo cuenta bancaria"
            name="tipo_cuenta_bancaria"
            textFieldKey="tipo_cuenta_bancaria"
            // options
            options={TIPO_CUENTA_BANCARIA_ARRAY_CHOICES}
            defaultValue={form.getValues()?.tipo_cuenta_bancaria || ''}
            // errors
            control={form.control}
            error={form.formState.errors.tipo_cuenta_bancaria}
            helperText={form.formState.errors.tipo_cuenta_bancaria?.message}
            gridSize={gridSizeMdLg6}
          />
          <CustomTextField
            label="Número cuenta bancaria"
            name="numero_cuenta_bancaria"
            control={form.control}
            defaultValue={form.getValues().numero_cuenta_bancaria}
            error={errors.numero_cuenta_bancaria}
            helperText={errors.numero_cuenta_bancaria?.message}
            onlyNumbers
            maxLength={25}
            size={gridSizeMdLg6}
          />
        </>
      ) : watchedRawPaymentMethod?.uuid === MetodoPagoEnumUUID.RECAUDACIONES ? (
        <>
          <CustomAutocomplete<EntidadFinanciera>
            label="Entidad financiera"
            name="entidad_financiera"
            // options
            options={entidadFinancierasPaging?.data?.items || []}
            valueKey="name"
            actualValueKey="id"
            defaultValue={form.getValues().entidad_financiera}
            isLoadingData={
              isLoadingEntidadFinancieras || isRefetchingEntidadFinancieras
            }
            // vaidation
            control={form.control}
            error={errors.entidad_financiera}
            helperText={errors.entidad_financiera?.message}
            size={gridSizeMdLg6}
          />
        </>
      ) : watchedRawPaymentMethod?.uuid === MetodoPagoEnumUUID.CREDITO ? (
        <>
          <CustomAutocomplete<Tarjeta>
            label="Tarjeta de crédito"
            name="tarjeta"
            // options
            options={tarjetasPaging?.data?.items || []}
            valueKey="name"
            actualValueKey="id"
            defaultValue={form.getValues().tarjeta}
            isLoadingData={
              isLoadingEntidadFinancieras || isRefetchingEntidadFinancieras
            }
            // vaidation
            control={form.control}
            error={errors.tarjeta}
            helperText={errors.tarjeta?.message}
            size={gridSizeMdLg6}
            disabled
          />
          <Grid item xs={12} pt={4}>
            <Cards
              number={watcherNumberCreditCard || ''}
              expiry={watcherExpirateCreditCard || ''}
              cvc=""
              name={watcherOwnerCreditCard || ''}
            />
          </Grid>
          <CustomCreditCardTextField
            label="Número tarjeta crédito"
            name="numero_tarjeta_credito"
            control={form.control}
            defaultValue={form.getValues().numero_tarjeta_credito}
            error={errors.numero_tarjeta_credito}
            helperText={errors.numero_tarjeta_credito?.message}
            onlyNumbers
            maxLength={16}
            onChangeCardType={cardType => {
              const card = tarjetasPaging?.data?.items.find(
                card => card?.code === cardType,
              );
              form.setValue('tarjeta', card?.id);
            }}
            size={gridSizeMdLg6}
          />
          <CustomAutocomplete<EntidadFinanciera>
            label="Entidad financiera"
            name="entidad_financiera"
            // options
            options={entidadFinancierasPaging?.data?.items || []}
            valueKey="name"
            actualValueKey="id"
            defaultValue={form.getValues().entidad_financiera}
            isLoadingData={
              isLoadingEntidadFinancieras || isRefetchingEntidadFinancieras
            }
            // vaidation
            control={form.control}
            error={errors.entidad_financiera}
            helperText={errors.entidad_financiera?.message}
            size={gridSizeMdLg6}
          />
          <CustomTextField
            label="Titular tarjeta"
            name="titular_tarjeta"
            control={form.control}
            defaultValue={form.getValues().titular_tarjeta}
            error={errors.titular_tarjeta}
            helperText={errors.titular_tarjeta?.message}
            size={gridSizeMdLg6}
            maxLength={25}
          />
          <CustomExpirateDateTextField
            label="Fecha vencimiento tarjeta"
            name="fecha_vencimiento_tarjeta"
            control={form.control}
            defaultValue={form.getValues().fecha_vencimiento_tarjeta}
            error={errors.fecha_vencimiento_tarjeta}
            helperText={errors.fecha_vencimiento_tarjeta?.message}
            size={gridSizeMdLg6}
          />
        </>
      ) : null}
    </>
  );
};

export default PaymentMethodPreventaFormPart;

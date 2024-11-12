import Cards from 'react-credit-cards-2';
import { UseFormReturn } from 'react-hook-form';

import { useFetchEntidadFinancieras } from '@/actions/app';
import {
  EntidadFinanciera,
  gridSizeMdLg6,
  MetodoPagoEnumUUID,
  Preventa,
  TIPO_CUENTA_BANCARIA_ARRAY_CHOICES,
} from '@/shared';
import {
  CustomAutocomplete,
  CustomExpirateDateTextField,
  CustomTextField,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  SelectTextFieldArrayString,
} from '@/shared/components';
import { Grid } from '@mui/material';
import { SaveFormDataAgendaVentas } from '../SaveAgendamiento';
import InternetPlanPartSaveAgendaForm from './InternetPlanPartSaveAgendaForm';

export type ServiceSaveAgendaStepProps = {
  form: UseFormReturn<SaveFormDataAgendaVentas>;
  preventa: Preventa;
};

const ServiceSaveAgendaStep: React.FC<ServiceSaveAgendaStepProps> = ({
  form,
  preventa,
}) => {
  ///* form ---------------------
  const { errors } = form.formState;
  const watcherNumberCreditCard = form.watch('numero_tarjeta_credito');
  const watcherExpirateCreditCard = form.watch('fecha_vencimiento_tarjeta');
  const watcherOwnerCreditCard = form.watch('titular_tarjeta');

  const isDebito =
    preventa.metodo_pago_data?.uuid === MetodoPagoEnumUUID.DEBITO;
  const isCredito =
    preventa.metodo_pago_data?.uuid === MetodoPagoEnumUUID.CREDITO;

  ///* fetch data ---------------------
  const {
    data: entidadFinancierasPaging,
    isLoading: isLoadingEntidadFinancieras,
    isRefetching: isRefetchingEntidadFinancieras,
  } = useFetchEntidadFinancieras({
    params: {
      page_size: 900,
    },
  });

  return (
    <>
      {/* ------------------ plan ------------------ */}
      <InternetPlanPartSaveAgendaForm form={form} />

      {/* ------------------ payment method ------------------ */}
      <>
        <CustomTypoLabel
          text="Método de pago"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />

        <CustomTextField
          label="Método de pago"
          name="paymentMethodName"
          control={form.control}
          defaultValue={form.getValues().paymentMethodName}
          error={errors.paymentMethodName}
          helperText={errors.paymentMethodName?.message}
          size={gridSizeMdLg6}
          disabled
        />

        {isDebito && (
          <>
            <CustomTextField
              label="Entidad financiera"
              name="entidadFinancieraName"
              control={form.control}
              defaultValue={form.getValues().entidadFinancieraName}
              error={errors.entidadFinancieraName}
              helperText={errors.entidadFinancieraName?.message}
              size={gridSizeMdLg6}
              disabled
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
              disabled
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
              disabled
            />
          </>
        )}

        {isCredito && (
          <>
            <CustomTextField
              label="Tarjeta"
              name="tarjetaName"
              control={form.control}
              defaultValue={form.getValues().tarjetaName}
              error={errors.tarjetaName}
              helperText={errors.tarjetaName?.message}
              size={gridSizeMdLg6}
              disabled
            />

            <Grid item xs={12} mt={3} mb={2}>
              <Cards
                number={watcherNumberCreditCard || ''}
                expiry={watcherExpirateCreditCard || ''}
                cvc=""
                name={watcherOwnerCreditCard || ''}
              />
            </Grid>

            <CustomTextField
              label="Número tarjeta crédito"
              name="numero_tarjeta_credito"
              control={form.control}
              defaultValue={form.getValues().numero_tarjeta_credito}
              error={errors.numero_tarjeta_credito}
              helperText={errors.numero_tarjeta_credito?.message}
              onlyNumbers
              maxLength={25}
              disabled
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
              disabled
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
              disabled
            />
            <CustomExpirateDateTextField
              label="Fecha vencimiento tarjeta"
              name="fecha_vencimiento_tarjeta"
              control={form.control}
              defaultValue={form.getValues().fecha_vencimiento_tarjeta}
              error={errors.fecha_vencimiento_tarjeta}
              helperText={errors.fecha_vencimiento_tarjeta?.message}
              size={gridSizeMdLg6}
              disabled
            />
          </>
        )}
      </>
    </>
  );
};

export default ServiceSaveAgendaStep;

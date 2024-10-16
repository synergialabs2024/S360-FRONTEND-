import { UseFormReturn } from 'react-hook-form';

import {
  gridSizeMdLg6,
  MetodoPagoEnumUUID,
  Preventa,
  TIPO_CUENTA_BANCARIA_ARRAY_CHOICES,
} from '@/shared';
import {
  CustomTextField,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  SelectTextFieldArrayString,
} from '@/shared/components';
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

  const isDebito =
    preventa.metodo_pago_data?.uuid === MetodoPagoEnumUUID.DEBITO;
  const isCredito =
    preventa.metodo_pago_data?.uuid === MetodoPagoEnumUUID.CREDITO;

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
            <CustomTextField
              label="Número tarjeta crédito"
              name="numero_tarjeta_credito"
              control={form.control}
              defaultValue={form.getValues().numero_tarjeta_credito}
              error={errors.numero_tarjeta_credito}
              helperText={errors.numero_tarjeta_credito?.message}
              onlyNumbers
              maxLength={25}
            />
          </>
        )}
      </>
    </>
  );
};

export default ServiceSaveAgendaStep;

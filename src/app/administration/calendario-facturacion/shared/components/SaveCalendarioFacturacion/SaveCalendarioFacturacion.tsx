import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import {
  CreateCalendarioFacturacionParamsBase,
  useCreateCalendarioFacturacion,
  useUpdateCalendarioFacturacion,
} from '@/actions/app';
import {
  CALENDARIO_FACTURA_TYPE_ARRAY_CHOICES,
  CalendarioFacturacion,
  calendarioFacturacionFormSchema,
  gridSizeMdLg6,
} from '@/shared';
import { yupResolver } from '@hookform/resolvers/yup';
import { returnUrlCalendarioFacturacionesPage } from '../../../pages/tables/CalendarioFacturacionPage';
import {
  CustomAutocompleteArrString,
  CustomNumberTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';

export interface SaveCalendarioFacturacionProps {
  title: string;
  calendarioFacturacion?: CalendarioFacturacion;
}

type SaveFormData = CreateCalendarioFacturacionParamsBase & {};

const SaveCalendarioFacturacion: React.FC<SaveCalendarioFacturacionProps> = ({
  title,
  calendarioFacturacion,
}) => {
  const navigate = useNavigate();

  const form = useForm<SaveFormData>({
    resolver: yupResolver(calendarioFacturacionFormSchema),
    defaultValues: {
      state: true,
      aplica_nuevo: false,
    },
  });

  const parseNumber = (value: any) => {
    const number = Number(value);
    return isNaN(number) || number < 0 ? 0 : number;
  };

  const watchedDayInicio = parseNumber(form.watch('dia_inicio'));
  const watchedDayPago = parseNumber(form.watch('dia_pago'));
  const watchedDaysGracia = parseNumber(form.watch('dias_gracia'));
  const watchedDaysMaxPay = parseNumber(form.watch('dia_maximo_pago'));

  const {
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  useEffect(() => {
    if (watchedDayPago && watchedDaysGracia) {
      const dayMaxPay = Math.max(
        Number(watchedDayPago) + Number(watchedDaysGracia) - 1,
        0,
      );

      setValue('dia_maximo_pago', dayMaxPay);
    } else {
      setValue('dia_maximo_pago', Number(watchedDayPago) || 0);
    }
  }, [watchedDayPago, watchedDaysGracia, setValue]);

  const createCalendarioFacturacionMutation = useCreateCalendarioFacturacion({
    navigate,
    returnUrl: returnUrlCalendarioFacturacionesPage,
    enableErrorNavigate: false,
  });

  const updateCalendarioFacturacionMutation =
    useUpdateCalendarioFacturacion<CreateCalendarioFacturacionParamsBase>({
      navigate,
      returnUrl: returnUrlCalendarioFacturacionesPage,
    });

  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    if (calendarioFacturacion?.id) {
      updateCalendarioFacturacionMutation.mutate({
        id: calendarioFacturacion.id!,
        data,
      });
      return;
    }

    createCalendarioFacturacionMutation.mutate(data);
  };

  useEffect(() => {
    if (!calendarioFacturacion?.id) return;
    reset(calendarioFacturacion);
  }, [calendarioFacturacion, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlCalendarioFacturacionesPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <Controller
        name="dia_pago"
        control={form.control}
        defaultValue={form.getValues('dia_pago')}
        render={({ field: { onChange, value, ...field } }) => (
          <CustomAutocompleteArrString
            {...field}
            label="DÍA PAGO"
            options={CALENDARIO_FACTURA_TYPE_ARRAY_CHOICES}
            defaultValue={value}
            isLoadingData={false}
            onChangeValue={e => {
              onChange(e);
              form.setValue('dia_facturacion', e);
            }}
            control={form.control}
            error={errors.dia_pago}
            helperText={errors.dia_pago?.message}
            size={gridSizeMdLg6}
            disableClearable
          />
        )}
      />
      <CustomNumberTextField
        label="DÍAS GRACIA"
        name="dias_gracia"
        control={form.control}
        defaultValue={form.getValues().dias_gracia}
        error={errors.dias_gracia}
        helperText={errors.dias_gracia?.message}
        size={gridSizeMdLg6}
      />
      <CustomNumberTextField
        label="DÍA INICIO"
        name="dia_inicio"
        control={form.control}
        defaultValue={form.getValues().dia_inicio}
        error={errors.dia_inicio}
        helperText={errors.dia_inicio?.message}
        size={gridSizeMdLg6}
      />
      <CustomNumberTextField
        label="DÍA FIN"
        name="dia_fin"
        control={form.control}
        defaultValue={form.getValues().dia_fin}
        error={errors.dia_fin}
        helperText={errors.dia_fin?.message}
        size={gridSizeMdLg6}
        min={Number(watchedDayInicio)}
      />
      <CustomNumberTextField
        label="DÍA FACTURACIÓN"
        name="dia_facturacion"
        control={form.control}
        defaultValue={form.getValues().dia_facturacion}
        error={errors.dia_facturacion}
        helperText={errors.dia_facturacion?.message}
      />
      <CustomNumberTextField
        label="DÍA MÁXIMO PAGO"
        name="dia_maximo_pago"
        control={form.control}
        error={errors.dia_maximo_pago}
        helperText={errors.dia_maximo_pago?.message}
        size={gridSizeMdLg6}
        disabled
      />
      <CustomNumberTextField
        label="DÍA SUSPENSIÓN"
        name="dia_suspension"
        control={form.control}
        defaultValue={form.getValues().dia_suspension}
        error={errors.dia_suspension}
        helperText={errors.dia_suspension?.message}
        size={gridSizeMdLg6}
        min={watchedDaysMaxPay}
      />

      <SampleCheckbox
        label="STATE"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        isState
        size={gridSizeMdLg6}
      />
      <SampleCheckbox
        label="APLICA NUEVO"
        name="aplica_nuevo"
        control={form.control}
        defaultValue={form.getValues().aplica_nuevo}
        size={gridSizeMdLg6}
      />
    </SingleFormBoxScene>
  );
};

export default SaveCalendarioFacturacion;

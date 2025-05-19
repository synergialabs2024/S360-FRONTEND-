import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import {
  SingleFormBoxScene,
  CustomAutocompleteArrString,
  CustomNumberTextField,
  CustomDatePicker,
} from '@/shared/components';
import {
  useUpdateDeudaCuotaEquipoVenta,
  CreateDeudaCuotaEquipoVentaParamsBase,
} from '@/actions/app';
import {
  gridSizeMdLg6,
  DeudaCuotaEquipoVenta,
  DEUDA_CUOTA_EQUIPO_VENTA_ESTADO_ARRAY_CHOICES,
} from '@/shared';
import { returnUrlPlanPagoCuotasPage } from '@/app/cobranza/plan-pago-cuota/pages/tables/PlanPagoCuotasPage';
import { deudacuotaequipoventaFormSchema } from '@/shared/utils/validation-schemas/app/cobranza/deuda-cuota-equipo-venta';

export interface SaveDeudaCuotaEquivoVentaProps {
  title: string;
  deudacuotaequipoventa?: DeudaCuotaEquipoVenta;
}

type SaveFormData = CreateDeudaCuotaEquipoVentaParamsBase & {};

const SaveDeudaCuotaEquivoVenta: React.FC<SaveDeudaCuotaEquivoVentaProps> = ({
  title,
  deudacuotaequipoventa,
}) => {
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(deudacuotaequipoventaFormSchema) as any,
    defaultValues: {},
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* mutations
  const updateTarjetaMutation =
    useUpdateDeudaCuotaEquipoVenta<CreateDeudaCuotaEquipoVentaParamsBase>({
      navigate,
      returnUrl: returnUrlPlanPagoCuotasPage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (deudacuotaequipoventa?.id) {
      updateTarjetaMutation.mutate({ id: deudacuotaequipoventa.id!, data });
      return;
    }

    return;
  };

  ///* effects
  useEffect(() => {
    if (!deudacuotaequipoventa?.id) return;
    reset(deudacuotaequipoventa);
    console.log(deudacuotaequipoventa);
  }, [deudacuotaequipoventa, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlPlanPagoCuotasPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomNumberTextField
        label="Cuota Actual"
        name="cuota_actual"
        control={form.control}
        defaultValue={form.getValues().cuota_actual}
        error={errors.cuota_actual}
        helperText={errors.cuota_actual?.message}
        size={gridSizeMdLg6}
        min={0}
        max={2147483647}
      />
      <CustomNumberTextField
        label="Monto Cuota"
        name="monto_cuota"
        control={form.control}
        defaultValue={form.getValues().monto_cuota}
        error={errors.monto_cuota}
        helperText={errors.monto_cuota?.message}
        size={gridSizeMdLg6}
      />
      <CustomNumberTextField
        label="Subtotal Cuota"
        name="subtotal_cuota"
        control={form.control}
        defaultValue={form.getValues().subtotal_cuota}
        error={errors.subtotal_cuota}
        helperText={errors.subtotal_cuota?.message}
        size={gridSizeMdLg6}
      />
      <CustomNumberTextField
        label="Taxes Cuota"
        name="taxes_cuota"
        control={form.control}
        defaultValue={form.getValues().taxes_cuota}
        error={errors.taxes_cuota}
        helperText={errors.taxes_cuota?.message}
        size={gridSizeMdLg6}
      />
      <CustomDatePicker
        label="Fecha Vencimiento"
        required={false}
        name="fecha_vencimiento"
        control={form.control}
        defaultValue={form.getValues().fecha_vencimiento}
        error={errors.fecha_vencimiento}
        helperText={errors.fecha_vencimiento?.message}
        size={gridSizeMdLg6}
      />
      <CustomAutocompleteArrString
        label="Estado de Cuenta"
        name="estado_cuota"
        control={form.control}
        defaultValue={form.getValues('estado_cuota')}
        options={DEUDA_CUOTA_EQUIPO_VENTA_ESTADO_ARRAY_CHOICES}
        isLoadingData={false}
        error={errors.estado_cuota}
        helperText={errors.estado_cuota?.message}
        size={gridSizeMdLg6}
        disableClearable
      />
    </SingleFormBoxScene>
  );
};

export default SaveDeudaCuotaEquivoVenta;

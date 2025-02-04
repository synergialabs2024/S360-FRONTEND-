import {
  CreatePlanPagoCuotaParamsBase,
  useCreatePlanPagoCuota,
  useFetchLineaServicios,
  useUpdatePlanPagoCuota,
} from '@/actions/app';
import {
  ESTADO_DEUDA_TYPE_ARRAY_CHOICES,
  gridSizeMdLg4,
  gridSizeMdLg6,
  LineaServicio,
  PermissionsEnum,
  PlanPagoCuota,
  planPagoCuotaFormSchema,
} from '@/shared';
import { useCheckPermission } from '@/shared/hooks/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { returnUrlPlanPagoCuotasPage } from '../../../pages/tables/PlanPagoCuotasPage';
import { useEffect } from 'react';
import {
  CustomAutocomplete,
  CustomDatePicker,
  CustomNumberTextField,
  CustomTextField,
  SelectArrayString,
  SingleFormBoxScene,
} from '@/shared/components';

export interface SavePlanPagoCuotaProps {
  title: string;
  planpagocuota?: PlanPagoCuota;
}

type SaveFormData = CreatePlanPagoCuotaParamsBase & {};

const SavePlanPagoCuota: React.FC<SavePlanPagoCuotaProps> = ({
  title,
  planpagocuota,
}) => {
  useCheckPermission(PermissionsEnum.cobranza_view_planpagocuota);
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(planPagoCuotaFormSchema) as any,
    defaultValues: {},
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* fetch data
  const {
    data: LineaServicioPagingRes,
    isLoading: isLoadingLineaServicio,
    isRefetching: isRefetchingLineaServicio,
  } = useFetchLineaServicios({
    params: {
      page_size: 200,
    },
  });

  ///* mutations
  const createIVAMutation = useCreatePlanPagoCuota({
    navigate,
    returnUrl: returnUrlPlanPagoCuotasPage,
    enableErrorNavigate: false,
  });
  const updateIVAMutation =
    useUpdatePlanPagoCuota<CreatePlanPagoCuotaParamsBase>({
      navigate,
      returnUrl: returnUrlPlanPagoCuotasPage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (planpagocuota?.id) {
      updateIVAMutation.mutate({ id: planpagocuota.id!, data });
      return;
    }

    ///* create
    createIVAMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!planpagocuota?.id) return;
    reset(planpagocuota);
  }, [planpagocuota, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlPlanPagoCuotasPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomTextField
        label="MONTO TOTAL"
        name="monto_total"
        type="number"
        control={form.control}
        defaultValue={form.getValues().monto_total}
        error={errors.monto_total}
        helperText={errors.monto_total?.message}
        size={gridSizeMdLg6}
      />
      <CustomNumberTextField
        label="Total de Cuotas"
        name="total_cuotas"
        control={form.control}
        defaultValue={form.getValues().total_cuotas}
        error={errors.total_cuotas}
        helperText={errors.total_cuotas?.message}
        size={gridSizeMdLg6}
      />

      <CustomAutocomplete<LineaServicio>
        label="Linea Servicio"
        name="uuid"
        // options
        options={LineaServicioPagingRes?.data?.items || []}
        valueKey="uuid"
        actualValueKey="id"
        defaultValue={form.getValues().uuid}
        isLoadingData={isLoadingLineaServicio || isRefetchingLineaServicio}
        // vaidation
        control={form.control}
        error={errors.uuid}
        helperText={errors.uuid?.message}
        size={gridSizeMdLg4}
      />
      <SelectArrayString
        label="Estado de Deuda"
        name="estado_deuda"
        control={form.control}
        error={errors.estado_deuda}
        helperText={errors.estado_deuda?.message}
        defaultValue={form.getValues('estado_deuda')}
        options={ESTADO_DEUDA_TYPE_ARRAY_CHOICES}
        gridSize={gridSizeMdLg4}
      />
      <CustomDatePicker
        label="Fecha fin"
        name="fecha_fin"
        control={form.control}
        defaultValue={form.getValues().fecha_fin}
        error={errors.fecha_fin}
        helperText={errors.fecha_fin?.message}
        size={gridSizeMdLg4}
        onChangeValue={value => {
          console.log(value);
        }}
      />
    </SingleFormBoxScene>
  );
};

export default SavePlanPagoCuota;

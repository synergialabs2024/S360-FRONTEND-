import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import {
  CanalVenta,
  getKeysFormErrorsMessage,
  gridSizeMdLg6,
  MetodoPago,
  PlanInternet,
  ToastWrapper,
  useLoaders,
  YES_NO_ARRAY_CHOICES,
  Zona,
} from '@/shared';
import { useState } from 'react';
import {
  CustomAutocomplete,
  CustomAutocompleteMultiple,
  CustomTextField,
  SampleCheckbox,
  SelectArrayString,
  SingleFormBoxScene,
} from '@/shared/components';
import { tipoMantenedorBeneficiosFormSchema } from '@/shared/utils/validation-schemas/app/cartera/buzon-tareas/parametros/tipo-mantenedor-beneficios';
import {
  useCreateTipoMantenedorBeneficio,
  useFetchTipoMantenedorBeneficios,
} from '@/actions/app/cartera/buzon-tareas/parametros/tipo-mantenedor-beneficios';
import { returnUrlBeneficioMantenedorBeneficiosPage } from '../../../pages/tables/BeneficioMantenedorBeneficiosPage';
import { SubtipoMantenedorBeneficios } from '@/shared/interfaces/app/cartera/buzon-tareas/parametros/subtipo-mantenedor-beneficios';
import { BeneficioMantenedorBeneficios } from '@/shared/interfaces/app/cartera/buzon-tareas/parametros/beneficio-mantenedor-beneficios';
import { TipoMantenedorBeneficios } from '@/shared/interfaces/app/cartera/buzon-tareas/parametros';
import { useFetchSubtipoMantenedorBeneficios } from '@/actions/app/cartera/buzon-tareas/parametros/subtipo-mantenedor-beneficios';
import { CreateBeneficioMantenedorBeneficioParamsBase } from '@/actions/app/cartera/buzon-tareas/parametros/beneficio-mantenedor-beneficios';
import {
  useFetchCanalVentas,
  useFetchMetodoPagos,
  useFetchPlanInternets,
  useFetchZonas,
} from '@/actions/app';

export type SaveBeneficioMantenedorBeneficiosProps = {
  title: string;
  beneficioMantenedorBeneficios?: BeneficioMantenedorBeneficios;
};

type SaveFormData = CreateBeneficioMantenedorBeneficioParamsBase & {
  planes?: number[] | string[];
  allPlanes?: boolean;
  metodo_pagos?: number[] | string[];
  allMetodosPago?: boolean;
  zonas?: number[] | string[];
  allZones?: boolean;
  canalVentas?: number[] | string[];
  allCanalesVentas?: boolean;
  //

  discapacidad_option: string | number;
  tercera_edad_option: string | number;
  plan_desarrollo_humano_option: string | number;
  plan_retencion_option: string | number;
};

const SaveBeneficioMantenedorBeneficios: React.FC<
  SaveBeneficioMantenedorBeneficiosProps
> = ({ title }) => {
  const navigate = useNavigate();

  const [fieldVisibility, setFieldVisibility] = useState(false);

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(tipoMantenedorBeneficiosFormSchema) as any,
    defaultValues: {
      state: true,
    },
  });

  const watchedTipoTarea = form.watch('tipo_mantenedor_beneficio');
  //
  const watchedAllPlanes = form.watch('allPlanes');
  const watchedAllMetodosPago = form.watch('allMetodosPago');
  const watchedAllZones = form.watch('allZones');
  const watchedAllCanalesVentas = form.watch('allCanalesVentas');

  const {
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  ///* mutations ---------------------
  const createTipoMantenedorBeneficio = useCreateTipoMantenedorBeneficio({
    navigate,
    returnUrl: returnUrlBeneficioMantenedorBeneficiosPage,
    enableErrorNavigate: false,
  });

  const {
    data: tipoMantenedorBeneficiosPaginatedRes,
    isLoading: isLoadingTipoMantenedorBeneficios,
    isRefetching: isRefetchingTipoMantenedorBeneficios,
  } = useFetchTipoMantenedorBeneficios({
    params: {
      page_size: 200,
    },
  });

  const {
    data: subtipoMantenedorBeneficiosPaginatedRes,
    isLoading: isLoadingSubtipoMantenedorBeneficios,
    isRefetching: isRefetchingSubtipoMantenedorBeneficios,
  } = useFetchSubtipoMantenedorBeneficios({
    enabled: fieldVisibility,
    params: {
      tipo_mantenedor_beneficio: Number(watchedTipoTarea),
      page_size: 200,
    },
  });

  // Plan

  const {
    data: planesPaging,
    isLoading: isLoadingPlanes,
    isRefetching: isRefetchingPlanes,
  } = useFetchPlanInternets({
    params: {
      page_size: 600,
    },
  });

  const {
    data: metodoPagosPaging,
    isLoading: isLoadingMetodoPagos,
    isRefetching: isRefetchingMetodoPagos,
  } = useFetchMetodoPagos({
    params: {
      page_size: 1100,
    },
  });

  const {
    data: zonasPaging,
    isLoading: isLoadingZonas,
    isRefetching: isRefetchingZonas,
  } = useFetchZonas({
    params: {
      has_coverage: true,
      page_size: 600,
    },
  });

  const {
    data: canalesVentaPaging,
    isLoading: isLoadingCanalesVenta,
    isRefetching: isRefetchingCanalesVenta,
  } = useFetchCanalVentas({
    params: {
      page_size: 1000,
    },
  });

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* create
    createTipoMantenedorBeneficio.mutate(data);
  };

  const customLoader =
    isLoadingTipoMantenedorBeneficios ||
    isRefetchingTipoMantenedorBeneficios ||
    isLoadingSubtipoMantenedorBeneficios ||
    isRefetchingSubtipoMantenedorBeneficios;
  useLoaders(customLoader);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlBeneficioMantenedorBeneficiosPage)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(
          `Faltan campos requeridos: ${getKeysFormErrorsMessage(errors)}`,
        );
      })}
    >
      <CustomAutocomplete<TipoMantenedorBeneficios>
        label="Tipo de solicitud"
        name="tipo_mantenedor_beneficio"
        valueKey="name"
        control={form.control}
        defaultValue={form.getValues().tipo_mantenedor_beneficio}
        options={tipoMantenedorBeneficiosPaginatedRes?.data.items || []}
        isLoadingData={isLoadingTipoMantenedorBeneficios}
        error={errors.tipo_mantenedor_beneficio}
        helperText={errors.tipo_mantenedor_beneficio?.message}
        size={gridSizeMdLg6}
        onChangeValue={e => {
          if (e) setFieldVisibility(true);
          form.setValue('subtipo_mantenedor_beneficio', '');
        }}
      />
      <CustomAutocomplete<SubtipoMantenedorBeneficios>
        label="Subtipo de solicitud"
        name="subtipo_mantenedor_beneficio"
        valueKey="name"
        actualValueKey="id"
        control={form.control}
        defaultValue={form.getValues().subtipo_mantenedor_beneficio}
        options={subtipoMantenedorBeneficiosPaginatedRes?.data.items || []}
        isLoadingData={isLoadingSubtipoMantenedorBeneficios}
        error={errors.subtipo_mantenedor_beneficio}
        helperText={errors.subtipo_mantenedor_beneficio?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Nombre"
        name="name"
        control={form.control}
        defaultValue={form.getValues().name}
        error={errors.name}
        helperText={errors.name?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Forma de pago"
        name="code"
        control={form.control}
        defaultValue={form.getValues().code}
        error={errors.code}
        helperText={errors.code?.message}
        size={gridSizeMdLg6}
      />

      {/* --------- PLANES --------- */}
      <CustomAutocompleteMultiple<PlanInternet>
        label="Planes"
        name="planes"
        textFieldKey="nombre"
        valueKey="name"
        actualValueKey="id"
        // options
        options={planesPaging?.data?.items || []}
        defaultValue={
          form.getValues().planes?.length
            ? planesPaging?.data?.items?.filter((plan: PlanInternet) =>
              (form.getValues().planes as any[])?.includes(plan?.id!),
            )
            : []
        }
        isLoadingData={isLoadingPlanes || isRefetchingPlanes}
        // errors
        control={form.control}
        error={undefined}
        helperText={errors.planes?.message}
        disabled={watchedAllPlanes}
        onlyActualValueKey
        required={false}
        size={gridSizeMdLg6}
      />

      {/* --------- Payment methods --------- */}
      <CustomAutocompleteMultiple<MetodoPago>
        label="Métodos de pago"
        name="metodo_pagos"
        textFieldKey="nombre"
        valueKey="name"
        actualValueKey="id"
        // options
        options={metodoPagosPaging?.data?.items || []}
        defaultValue={
          form.getValues().metodo_pagos?.length
            ? metodoPagosPaging?.data?.items?.filter((metodoPago: MetodoPago) =>
              (form.getValues().metodo_pagos as any[])?.includes(
                  metodoPago?.id!,
              ),
            )
            : []
        }
        isLoadingData={isLoadingMetodoPagos || isRefetchingMetodoPagos}
        // errors
        control={form.control}
        error={undefined}
        helperText={errors.metodo_pagos?.message}
        onlyActualValueKey
        required={false}
        disabled={watchedAllMetodosPago}
        size={gridSizeMdLg6}
      />

      {/* --------- zones --------- */}
      <CustomAutocompleteMultiple<Zona>
        label="Zonas"
        name="zonas"
        textFieldKey="nombre"
        valueKey="name"
        actualValueKey="id"
        // options
        options={zonasPaging?.data?.items || []}
        defaultValue={
          form.getValues().zonas?.length
            ? zonasPaging?.data?.items?.filter((zona: Zona) =>
              (form.getValues().zonas as any[])?.includes(zona?.id!),
            )
            : []
        }
        isLoadingData={isLoadingZonas || isRefetchingZonas}
        // errors
        control={form.control}
        error={undefined}
        helperText={errors.zonas?.message}
        onlyActualValueKey
        required={false}
        disabled={watchedAllZones}
        size={gridSizeMdLg6}
      />

      {/* --------- canal de ventas --------- */}
      <CustomAutocompleteMultiple<CanalVenta>
        label="Canal de venta"
        name="canalVentas"
        textFieldKey="nombre"
        valueKey="name"
        actualValueKey="id"
        // options
        options={canalesVentaPaging?.data?.items || []}
        defaultValue={
          form.getValues().canalVentas?.length
            ? canalesVentaPaging?.data?.items?.filter(
              (canalVenta: CanalVenta) =>
                (form.getValues().canalVentas as any[])?.includes(
                    canalVenta?.id!,
                ),
            )
            : []
        }
        isLoadingData={isLoadingCanalesVenta || isRefetchingCanalesVenta}
        // errors
        control={form.control}
        error={undefined}
        helperText={errors.canalVentas?.message}
        onlyActualValueKey
        required={false}
        disabled={watchedAllCanalesVentas}
        size={gridSizeMdLg6}
      />

      <SelectArrayString
        label="Discapacidad"
        name="discapacidad_option"
        control={form.control}
        defaultValue={form.getValues().discapacidad_option}
        error={errors.discapacidad_option}
        helperText={errors.discapacidad_option?.message}
        options={YES_NO_ARRAY_CHOICES}
        gridSize={gridSizeMdLg6}
      />

      <SelectArrayString
        label="Tercera edad"
        name="tercera_edad_option"
        control={form.control}
        defaultValue={form.getValues().tercera_edad_option}
        error={errors.tercera_edad_option}
        helperText={errors.tercera_edad_option?.message}
        options={YES_NO_ARRAY_CHOICES}
        gridSize={gridSizeMdLg6}
      />

      <SelectArrayString
        label="Plan desarrollo humano"
        name="plan_desarrollo_humano_option"
        control={form.control}
        defaultValue={form.getValues().plan_desarrollo_humano_option}
        error={errors.plan_desarrollo_humano_option}
        helperText={errors.plan_desarrollo_humano_option?.message}
        options={YES_NO_ARRAY_CHOICES}
        gridSize={gridSizeMdLg6}
      />

      <SelectArrayString
        label="Plan retención"
        name="plan_retencion_option"
        control={form.control}
        defaultValue={form.getValues().plan_retencion_option}
        error={errors.plan_retencion_option}
        helperText={errors.plan_retencion_option?.message}
        options={YES_NO_ARRAY_CHOICES}
        gridSize={gridSizeMdLg6}
      />

      <SampleCheckbox
        label="state"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        isState
      />
    </SingleFormBoxScene>
  );
};

export default SaveBeneficioMantenedorBeneficios;

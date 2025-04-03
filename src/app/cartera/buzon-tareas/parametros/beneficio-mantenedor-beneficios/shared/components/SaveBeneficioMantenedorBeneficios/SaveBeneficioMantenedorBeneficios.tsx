import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import {
  CanalVenta,
  getKeysFormErrorsMessage,
  gridSizeMdLg12,
  gridSizeMdLg6,
  MetodoPago,
  PlanInternet,
  ToastWrapper,
  useLoaders,
  YES_NO_ARRAY_CHOICES,
  Zona,
} from '@/shared';
import { useEffect, useState } from 'react';
import {
  CustomAutocomplete,
  CustomAutocompleteMultiple,
  CustomTextArea,
  CustomTextField,
  SampleCheckbox,
  SelectArrayString,
  SingleFormBoxScene,
} from '@/shared/components';
import { useFetchTipoMantenedorBeneficios } from '@/actions/app/cartera/buzon-tareas/parametros/tipo-mantenedor-beneficios';
import { returnUrlBeneficioMantenedorBeneficiosPage } from '../../../pages/tables/BeneficioMantenedorBeneficiosPage';
import { SubtipoMantenedorBeneficios } from '@/shared/interfaces/app/cartera/buzon-tareas/parametros/subtipo-mantenedor-beneficios';
import { BeneficioMantenedorBeneficios } from '@/shared/interfaces/app/cartera/buzon-tareas/parametros/beneficio-mantenedor-beneficios';
import { TipoMantenedorBeneficios } from '@/shared/interfaces/app/cartera/buzon-tareas/parametros';
import { useFetchSubtipoMantenedorBeneficios } from '@/actions/app/cartera/buzon-tareas/parametros/subtipo-mantenedor-beneficios';
import {
  CreateBeneficioMantenedorBeneficioParamsBase,
  useCreateBeneficioMantenedorBeneficio,
  useUpdateBeneficioMantenedorBeneficio,
} from '@/actions/app/cartera/buzon-tareas/parametros/beneficio-mantenedor-beneficios';
import {
  useFetchCanalVentas,
  useFetchMetodoPagos,
  useFetchPlanInternets,
  useFetchZonas,
} from '@/actions/app';
import EquiposBeneficioMantenedorBeneficios from './form/equipos/EquiposBeneficioMantenedorBeneficios';
import CuotaServiciosBeneficioMantenedorBeneficios from './form/cuota-servicios/CuotaServiciosBeneficioMantenedorBeneficios';
import { beneficioMantenedorBeneficiosFormSchema } from '@/shared/utils/validation-schemas/app/cartera/buzon-tareas/parametros/beneficio-mantenedor-beneficios';
import {
  GenericInventoryStoreKey,
  useTypedGenericInventoryStore,
} from '@/store/app';
import { EquiposSeleccionadosProductoType } from './form/equipos/EquiposSeleccionadosBeneficioMantenedorBeneficios';

export type SaveBeneficioMantenedorBeneficiosProps = {
  title: string;
  beneficioMantenedorBeneficios?: BeneficioMantenedorBeneficios;
};

type SaveFormData = CreateBeneficioMantenedorBeneficioParamsBase & {
  allPlanes?: boolean;
  allMetodosPago?: boolean;
  allZones?: boolean;
  allCanalesVentas?: boolean;
  //
  aplica_descuento_meses_posterior_string: string;
  aplica_descuento_meses_curso_string: string;
  discapacidad_string: string;
  tercera_edad_string: string;
  plan_desarrollo_humano_string: string;
  plan_retencion_string: string;
};

const SaveBeneficioMantenedorBeneficios: React.FC<
  SaveBeneficioMantenedorBeneficiosProps
> = ({ title, beneficioMantenedorBeneficios }) => {
  const navigate = useNavigate();

  const [fieldVisibility, setFieldVisibility] = useState(false);

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(beneficioMantenedorBeneficiosFormSchema) as any,
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
  //
  const watchedProductos = form.watch('productos');
  const watchedPlanesInternet = form.watch('planes_internet');

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  const { setItems } =
    useTypedGenericInventoryStore<EquiposSeleccionadosProductoType>(
      GenericInventoryStoreKey.equiposVentaPreventa,
    );

  ///* mutations ---------------------
  const createTipoMantenedorBeneficio = useCreateBeneficioMantenedorBeneficio({
    navigate,
    returnUrl: returnUrlBeneficioMantenedorBeneficiosPage,
    enableErrorNavigate: false,
    customOnSuccess: () => {
      clearAllStore();
    },
  });

  const updateBeneficioMantenedorBeneficio =
    useUpdateBeneficioMantenedorBeneficio({
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
      page_size: 200,
      tipo_mantenedor_beneficio: watchedTipoTarea,
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

  const {
    items: equiposSeleccionados,
    clearOneRecord: clearAllEquiposSelecStore,
    clearAllStore,
  } = useTypedGenericInventoryStore<EquiposSeleccionadosProductoType>(
    GenericInventoryStoreKey.equiposVentaPreventa,
  );

  const {
    items: serviciosInternet,
    clearOneRecord: clearAllServiciosInternetSelecStore,
  } = useTypedGenericInventoryStore<EquiposSeleccionadosProductoType>(
    GenericInventoryStoreKey.servicioInternet,
  );

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    if (beneficioMantenedorBeneficios?.id) {
      updateBeneficioMantenedorBeneficio.mutate({
        id: beneficioMantenedorBeneficios.id!,
        data,
      });
      return;
    }

    const productos: number[] =
      equiposSeleccionados?.map(equipo => Number(equipo.id)) || [];

    const detalleEquipos = equiposSeleccionados?.map(equipo => ({
      id: equipo.id,
      descuento: equipo?.usedQuantity,
      /* categoria: equipo.categoria,
      codigo_auxiliar: equipo.codigo_auxiliar,
      iva: equipo.iva,
      precio: equipo?.precios,
      producto_data: {
        id: equipo.id,
        uuid: equipo.uuid,
        nombre: equipo.nombre,
      },
      descripcion: equipo.descripcion,
      descuento: equipo?.usedQuantity,
      codigo: equipo?.codigo!,
      cantidad: 1, */
    }));

    const serviciosInternetData = serviciosInternet?.map(equipo => ({
      descuento: equipo?.usedQuantity,
      cuota: equipo?.id!,
      cantidad: 1,
    }));

    ///* create
    createTipoMantenedorBeneficio.mutate({
      name: data.name, //
      code: data.code, //
      state: data.state, //
      description: data.description, //
      aplica_descuento_meses_posterior:
        data.aplica_descuento_meses_posterior === 'SI' ? true : false, //
      aplica_descuento_meses_curso:
        data.aplica_descuento_meses_curso === 'SI' ? true : false, //
      discapacidad: data.discapacidad === 'SI' ? true : false, //
      tercera_edad: data.tercera_edad === 'SI' ? true : false, //
      plan_desarrollo_humano:
        data.plan_desarrollo_humano === 'SI' ? true : false, //
      plan_retencion: data.plan_retencion === 'SI' ? true : false, //
      categorizacion_perfil: data.categorizacion_perfil, //
      categorizacion_pagos: data.categorizacion_pagos, //
      //
      descuentos_cuotas: serviciosInternetData,
      //
      tipo_mantenedor_beneficio: data.tipo_mantenedor_beneficio, //
      subtipo_mantenedor_beneficio: data.subtipo_mantenedor_beneficio, //
      metodos_pago: data.metodos_pago, //
      planes_internet: data.planes_internet, //
      zonas: data.zonas, //
      canales_venta: data.canales_venta, //
      productos_coutas: detalleEquipos,
      productos: productos, //
    });
  };

  const customLoader =
    isLoadingTipoMantenedorBeneficios ||
    isRefetchingTipoMantenedorBeneficios ||
    isLoadingSubtipoMantenedorBeneficios ||
    isRefetchingSubtipoMantenedorBeneficios;
  useLoaders(customLoader);

  useEffect(() => {
    if (!beneficioMantenedorBeneficios?.id) return;
    setFieldVisibility(true);
    const eqP = beneficioMantenedorBeneficios?.productos_data;
    const items: any[] = [];
    items.push(eqP);
    console.log('eqP', eqP);

    setItems((items as any) || []);
    reset({ ...beneficioMantenedorBeneficios });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beneficioMantenedorBeneficios, reset]);

  useEffect(() => {
    beneficioMantenedorBeneficios?.aplica_descuento_meses_posterior
      ? form.setValue('aplica_descuento_meses_posterior_string', 'SI')
      : form.setValue('aplica_descuento_meses_posterior_string', 'NO');

    beneficioMantenedorBeneficios?.aplica_descuento_meses_curso
      ? form.setValue('aplica_descuento_meses_curso_string', 'SI')
      : form.setValue('aplica_descuento_meses_curso_string', 'NO');

    beneficioMantenedorBeneficios?.discapacidad
      ? form.setValue('discapacidad_string', 'SI')
      : form.setValue('discapacidad_string', 'NO');

    beneficioMantenedorBeneficios?.tercera_edad
      ? form.setValue('tercera_edad_string', 'SI')
      : form.setValue('tercera_edad_string', 'NO');

    beneficioMantenedorBeneficios?.plan_desarrollo_humano
      ? form.setValue('plan_desarrollo_humano_string', 'SI')
      : form.setValue('plan_desarrollo_humano_string', 'NO');

    beneficioMantenedorBeneficios?.plan_retencion
      ? form.setValue('plan_retencion_string', 'SI')
      : form.setValue('plan_retencion_string', 'NO');
  }, [beneficioMantenedorBeneficios, form]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => {
        navigate(returnUrlBeneficioMantenedorBeneficiosPage);
        clearAllEquiposSelecStore();
        clearAllServiciosInternetSelecStore();
      }}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(
          `Faltan campos requeridos: ${getKeysFormErrorsMessage(errors)}`,
        );
      })}
    >
      <CustomAutocomplete<TipoMantenedorBeneficios>
        label="Tipo"
        name="tipo_mantenedor_beneficio"
        valueKey="name"
        actualValueKey="id"
        control={form.control}
        defaultValue={form.getValues().tipo_mantenedor_beneficio}
        options={tipoMantenedorBeneficiosPaginatedRes?.data.items || []}
        isLoadingData={isLoadingTipoMantenedorBeneficios}
        error={errors.tipo_mantenedor_beneficio}
        helperText={errors.tipo_mantenedor_beneficio?.message}
        size={gridSizeMdLg6}
        onChangeValue={e => {
          if (e) setFieldVisibility(true);
          form.setValue('subtipo_mantenedor_beneficio', 0);
        }}
      />
      <CustomAutocomplete<SubtipoMantenedorBeneficios>
        label="Subtipo"
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

      <SelectArrayString
        label="Aplica descuento meses posteriores"
        name="aplica_descuento_meses_posterior_string"
        control={form.control}
        error={errors.aplica_descuento_meses_posterior_string}
        helperText={errors.aplica_descuento_meses_posterior_string?.message}
        options={YES_NO_ARRAY_CHOICES}
        gridSize={gridSizeMdLg6}
        onChangeValue={e => {
          console.log('e', e);
          e === 'SI'
            ? form.setValue('aplica_descuento_meses_posterior', true)
            : form.setValue('aplica_descuento_meses_posterior', false);
        }}
      />

      <SelectArrayString
        label="Aplica descuento o N/C a factura de servicio_mes en curso"
        name="aplica_descuento_meses_curso_string"
        control={form.control}
        error={errors.aplica_descuento_meses_curso_string}
        helperText={errors.aplica_descuento_meses_curso_string?.message}
        options={YES_NO_ARRAY_CHOICES}
        gridSize={gridSizeMdLg6}
        onChangeValue={e => {
          e === 'SI'
            ? form.setValue('aplica_descuento_meses_curso', true)
            : form.setValue('aplica_descuento_meses_curso', false);
        }}
      />

      <CustomTextField
        label="Nombre beneficio"
        name="name"
        control={form.control}
        defaultValue={form.getValues().name}
        error={errors.name}
        helperText={errors.name?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Codigo beneficio"
        name="code"
        control={form.control}
        defaultValue={form.getValues().code}
        error={errors.code}
        helperText={errors.code?.message}
        size={gridSizeMdLg6}
      />

      {/* --------- Payment methods --------- */}
      <CustomAutocompleteMultiple<MetodoPago>
        label="Forma de pago"
        name="metodos_pago"
        textFieldKey="nombre"
        valueKey="name"
        actualValueKey="id"
        // options
        options={metodoPagosPaging?.data?.items || []}
        defaultValue={
          form.getValues().metodos_pago?.length
            ? metodoPagosPaging?.data?.items?.filter((metodoPago: MetodoPago) =>
              (form.getValues().metodos_pago as any[])?.includes(
                  metodoPago?.id!,
              ),
            )
            : []
        }
        isLoadingData={isLoadingMetodoPagos || isRefetchingMetodoPagos}
        // errors
        control={form.control}
        error={undefined}
        helperText={errors.metodos_pago?.message}
        onlyActualValueKey
        required={false}
        disabled={watchedAllMetodosPago}
        size={gridSizeMdLg6}
      />

      {/* --------- PLANES --------- */}
      <CustomAutocompleteMultiple<PlanInternet>
        label="Planes"
        name="planes_internet"
        textFieldKey="nombre"
        valueKey="name"
        actualValueKey="id"
        // options
        options={planesPaging?.data?.items || []}
        defaultValue={
          form.getValues().planes_internet?.length
            ? planesPaging?.data?.items?.filter((plan: PlanInternet) =>
              (form.getValues().planes_internet as any[])?.includes(
                  plan?.id!,
              ),
            )
            : []
        }
        isLoadingData={isLoadingPlanes || isRefetchingPlanes}
        // errors
        control={form.control}
        error={undefined}
        helperText={errors.planes_internet?.message}
        disabled={watchedAllPlanes}
        onlyActualValueKey
        required={false}
        size={gridSizeMdLg6}
      />

      <SelectArrayString
        label="Discapacidad"
        name="discapacidad_string"
        control={form.control}
        error={errors.discapacidad_string}
        helperText={errors.discapacidad_string?.message}
        options={YES_NO_ARRAY_CHOICES}
        gridSize={gridSizeMdLg6}
        onChangeValue={e => {
          e === 'SI'
            ? form.setValue('discapacidad', true)
            : form.setValue('discapacidad', false);
        }}
      />

      <SelectArrayString
        label="Tercera edad"
        name="tercera_edad_string"
        control={form.control}
        error={errors.tercera_edad_string}
        helperText={errors.tercera_edad_string?.message}
        options={YES_NO_ARRAY_CHOICES}
        gridSize={gridSizeMdLg6}
        onChangeValue={e => {
          e === 'SI'
            ? form.setValue('tercera_edad', true)
            : form.setValue('tercera_edad', false);
        }}
      />

      <SelectArrayString
        label="Plan desarrollo humano"
        name="plan_desarrollo_humano_string"
        control={form.control}
        error={errors.plan_desarrollo_humano_string}
        helperText={errors.plan_desarrollo_humano_string?.message}
        options={YES_NO_ARRAY_CHOICES}
        gridSize={gridSizeMdLg6}
        onChangeValue={e => {
          e === 'SI'
            ? form.setValue('plan_desarrollo_humano', true)
            : form.setValue('plan_desarrollo_humano', false);
        }}
      />

      <SelectArrayString
        label="Plan retención"
        name="plan_retencion_string"
        control={form.control}
        error={errors.plan_retencion_string}
        helperText={errors.plan_retencion_string?.message}
        options={YES_NO_ARRAY_CHOICES}
        gridSize={gridSizeMdLg6}
        onChangeValue={e => {
          e === 'SI'
            ? form.setValue('plan_retencion', true)
            : form.setValue('plan_retencion', false);
        }}
      />

      <CustomTextField
        label="Perfil / cat"
        name="categorizacion_perfil"
        control={form.control}
        defaultValue={form.getValues().categorizacion_perfil}
        error={errors.categorizacion_perfil}
        helperText={errors.categorizacion_perfil?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Pagos / categ"
        name="categorizacion_pagos"
        control={form.control}
        defaultValue={form.getValues().categorizacion_pagos}
        error={errors.categorizacion_pagos}
        helperText={errors.categorizacion_pagos?.message}
        size={gridSizeMdLg6}
      />

      {/* --------- canal de ventas --------- */}
      <CustomAutocompleteMultiple<CanalVenta>
        label="Canal de venta"
        name="canales_venta"
        textFieldKey="nombre"
        valueKey="name"
        actualValueKey="id"
        // options
        options={canalesVentaPaging?.data?.items || []}
        defaultValue={
          form.getValues().canales_venta?.length
            ? canalesVentaPaging?.data?.items?.filter(
              (canalVenta: CanalVenta) =>
                (form.getValues().canales_venta as any[])?.includes(
                    canalVenta?.id!,
                ),
            )
            : []
        }
        isLoadingData={isLoadingCanalesVenta || isRefetchingCanalesVenta}
        // errors
        control={form.control}
        error={undefined}
        helperText={errors.canales_venta?.message}
        onlyActualValueKey
        required={false}
        disabled={watchedAllCanalesVentas}
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

      <CustomTextArea
        label="Descripcion"
        name="description"
        control={form.control}
        defaultValue={form.getValues().description}
        error={errors.description}
        helperText={errors.description?.message}
        size={gridSizeMdLg12}
      />

      <>
        <EquiposBeneficioMantenedorBeneficios productos={watchedProductos} />
      </>

      <>
        <CuotaServiciosBeneficioMantenedorBeneficios
          planesInternet={watchedPlanesInternet}
        />
      </>

      <SampleCheckbox
        label="state"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state!}
        isState
      />
    </SingleFormBoxScene>
  );
};

export default SaveBeneficioMantenedorBeneficios;

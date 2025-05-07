/* eslint-disable indent */
import { yupResolver } from '@hookform/resolvers/yup';
import { Tab } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreatePlanInternetParamsBase,
  useCreatePlanInternet,
  useFetchCiudades,
  useFetchMetodoPagos,
  useFetchProvincias,
  useFetchSectores,
  useFetchZonas,
  useUpdatePlanInternet,
} from '@/actions/app';
import { planinternetFormSchema, ToastWrapper, useTabsOnly } from '@/shared';
import {
  a11yProps,
  CustomAutocomplete,
  CustomAutocompleteArrString,
  CustomAutocompleteMultiple,
  CustomNumberTextField,
  CustomTabPanel,
  CustomTextArea,
  CustomTextField,
  FormTabsOnly,
  SampleCheckbox,
  TabsFormBoxScene,
} from '@/shared/components';
import {
  CLASIFICACION_PLANES_SCORE_BURO_ARRAY_CHOICES,
  INTERNET_PERMANENCE_ARRAY_CHOICES,
  INTERNET_PLAN_INTERNET_TYPE_ARRAY_CHOICES_ALL,
  INTERNET_SERVICE_TYPE_ARRAY_CHOICES,
  INTERNET_UNIT_VELOCITY_ARRAY_CHOICES,
} from '@/shared/constants/app';
import { gridSize, gridSizeMdLg6 } from '@/shared/constants/ui';
import { useCheckPermission } from '@/shared/hooks/auth';
import {
  Ciudad,
  MetodoPago,
  PermissionsEnum,
  PlanInternet,
  Provincia,
  Sector,
  Zona,
} from '@/shared/interfaces';
import { returnUrlPlanInternetsPage } from '../../../pages/tables/PlanInternetsPage';

export interface SavePlanInternetProps {
  title: string;
  planinternet?: PlanInternet;
}

type SaveFormData = CreatePlanInternetParamsBase & {};

const SavePlanInternet: React.FC<SavePlanInternetProps> = ({
  title,
  planinternet,
}) => {
  useCheckPermission(PermissionsEnum.servicios_view_planinternet);

  const navigate = useNavigate();

  const { tabValue, handleTabChange } = useTabsOnly({
    // initialTabValue: 2,
  });

  ///* form --------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(planinternetFormSchema) as any,
    defaultValues: {
      state: true,
      es_plan_base: false,
      paises: [],
      provincias: [],
      ciudades: [],
      zonas: [],
      sectores: [],
      metodo_pagos: [],
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;
  const watchedSpeedUnit = form.watch('unidad_velocidad');

  const watchedProvincias = form.watch('provincias');
  const watchedCiudades = form.watch('ciudades');
  const watchedZonas = form.watch('zonas');

  const watchedMetodoPagoExclusivo = form.watch('metodo_pago_exclusivo');

  ///* fetch data ----------------
  const {
    data: provinciasPaging,
    isLoading: isLoadingProvincias,
    isRefetching: isRefetchingProvincias,
  } = useFetchProvincias({
    params: {
      has_coverage: true,
      page_size: 1600,
    },
  });
  const {
    data: ciudadesPaging,
    isLoading: isLoadingCiudades,
    isRefetching: isRefetchingCiudades,
  } = useFetchCiudades({
    enabled: !!watchedProvincias,
    params: {
      has_coverage: true,
      page_size: 1600,
      provinces: watchedProvincias?.length
        ? watchedProvincias.join(',')
        : undefined,
    },
  });
  const {
    data: zonasPaging,
    isLoading: isLoadingZonas,
    isRefetching: isRefetchingZonas,
  } = useFetchZonas({
    enabled: !!watchedCiudades,
    params: {
      has_coverage: true,
      page_size: 1600,
      cities: watchedCiudades?.length ? watchedCiudades.join(',') : undefined,
    },
  });
  const {
    data: sectoresPaging,
    isLoading: isLoadingSectores,
    isRefetching: isRefetchingSectores,
  } = useFetchSectores({
    enabled: !!watchedZonas,
    params: {
      has_coverage: true,
      page_size: 1600,

      zones: watchedZonas?.length ? watchedZonas.join(',') : undefined,
    },
  });
  const {
    data: metodoPagosPaging,
    isLoading: isLoadingMetodoPagos,
    isRefetching: isRefetchingMetodoPagos,
  } = useFetchMetodoPagos({
    params: {
      page_size: 1600,
    },
  });

  ///* mutations --------------
  const createPlanInternetMutation = useCreatePlanInternet({
    navigate,
    returnUrl: returnUrlPlanInternetsPage,
    enableErrorNavigate: false,
  });
  const updatePlanInternetMutation =
    useUpdatePlanInternet<CreatePlanInternetParamsBase>({
      navigate,
      returnUrl: returnUrlPlanInternetsPage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (planinternet?.id) {
      updatePlanInternetMutation.mutate({ id: planinternet.id!, data });
      return;
    }

    ///* create
    createPlanInternetMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!planinternet?.id) return;
    reset(planinternet);
  }, [planinternet, reset]);

  return (
    <TabsFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlPlanInternetsPage)}
      onSave={handleSubmit(onSave, () => {
        ToastWrapper.error('Faltan campos requeridos por completar');
      })}
      tabs={
        <FormTabsOnly value={tabValue} onChange={handleTabChange}>
          <Tab label="General" value={1} {...a11yProps(1)} />

          <Tab label="Matriz exclusión" value={2} {...a11yProps(2)} />
        </FormTabsOnly>
      }
      formSize={gridSize}
    >
      {/* ======================== General Info ======================== */}
      <CustomTabPanel index={1} value={tabValue}>
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
          label="Código"
          name="codigo"
          control={form.control}
          defaultValue={form.getValues().codigo}
          error={errors.codigo}
          helperText={errors.codigo?.message || 'Código único'}
          size={gridSizeMdLg6}
          disabled={!!planinternet?.id}
        />

        <CustomNumberTextField
          label="Valor base"
          name="valor"
          control={form.control}
          defaultValue={form.getValues().valor}
          error={errors.valor}
          helperText={errors.valor?.message}
          size={gridSizeMdLg6}
          customType="currency"
          min={0}
        />
        <CustomNumberTextField
          label="Costo instalación"
          name="costo_instalacion"
          control={form.control}
          defaultValue={form.getValues().costo_instalacion}
          error={errors.costo_instalacion}
          helperText={errors.costo_instalacion?.message}
          size={gridSizeMdLg6}
          customType="currency"
          min={0}
        />

        <CustomAutocompleteArrString
          label="Clasificación score buro"
          name="clasificacion_score_buro"
          options={CLASIFICACION_PLANES_SCORE_BURO_ARRAY_CHOICES}
          isLoadingData={false}
          control={form.control}
          defaultValue={form.getValues().clasificacion_score_buro}
          error={errors.clasificacion_score_buro}
          helperText={errors.clasificacion_score_buro?.message}
          size={gridSizeMdLg6}
        />
        <CustomAutocomplete<MetodoPago>
          label="Método de pago"
          name="metodo_pago_exclusivo"
          // options
          options={metodoPagosPaging?.data?.items || []}
          valueKey="name"
          actualValueKey="id"
          defaultValue={form.getValues().metodo_pago_exclusivo}
          isLoadingData={isLoadingMetodoPagos || isRefetchingMetodoPagos}
          // vaidation
          control={form.control}
          error={errors.metodo_pago_exclusivo}
          helperText={errors.metodo_pago_exclusivo?.message}
          size={gridSizeMdLg6}
          required={false}
        />

        <CustomTextArea
          label="Descripción"
          name="description"
          control={form.control}
          defaultValue={form.getValues().description}
          error={errors.description}
          helperText={errors.description?.message}
          required={false}
        />
        <CustomTextField
          label="Compartición"
          name="comparticion"
          control={form.control}
          defaultValue={form.getValues().comparticion}
          error={errors.comparticion}
          helperText={errors.comparticion?.message}
          size={gridSizeMdLg6}
        />

        <CustomAutocompleteArrString
          label="Unidad velocidad"
          name="unidad_velocidad"
          options={INTERNET_UNIT_VELOCITY_ARRAY_CHOICES}
          isLoadingData={false}
          control={form.control}
          defaultValue={form.getValues().unidad_velocidad}
          error={errors.unidad_velocidad}
          helperText={errors.unidad_velocidad?.message}
          size={gridSizeMdLg6}
        />
        <CustomNumberTextField
          label="Velocidad descarga minima"
          name="velocidad_descarga_minima"
          control={form.control}
          defaultValue={form.getValues().velocidad_descarga_minima}
          error={errors.velocidad_descarga_minima}
          helperText={errors.velocidad_descarga_minima?.message}
          size={gridSizeMdLg6}
          customType="speed"
          endAdornment={watchedSpeedUnit}
        />
        <CustomNumberTextField
          label="Velocidad descarga maxima"
          name="velocidad_descarga_maxima"
          control={form.control}
          defaultValue={form.getValues().velocidad_descarga_maxima}
          error={errors.velocidad_descarga_maxima}
          helperText={errors.velocidad_descarga_maxima?.message}
          size={gridSizeMdLg6}
          customType="speed"
          endAdornment={watchedSpeedUnit}
        />
        <CustomNumberTextField
          label="Velocidad subida minima"
          name="velocidad_subida_minima"
          control={form.control}
          defaultValue={form.getValues().velocidad_subida_minima}
          error={errors.velocidad_subida_minima}
          helperText={errors.velocidad_subida_minima?.message}
          size={gridSizeMdLg6}
          customType="speed"
          endAdornment={watchedSpeedUnit}
        />
        <CustomNumberTextField
          label="Velocidad subida maxima"
          name="velocidad_subida_maxima"
          control={form.control}
          defaultValue={form.getValues().velocidad_subida_maxima}
          error={errors.velocidad_subida_maxima}
          helperText={errors.velocidad_subida_maxima?.message}
          size={gridSizeMdLg6}
          customType="speed"
          endAdornment={watchedSpeedUnit}
        />

        <CustomNumberTextField
          label="Prioridad"
          name="prioridad"
          control={form.control}
          defaultValue={form.getValues().prioridad}
          error={errors.prioridad}
          helperText={errors.prioridad?.message}
          size={gridSizeMdLg6}
          min={0}
        />

        <CustomAutocompleteArrString
          label="Permanencia"
          name="permanencia"
          options={INTERNET_PERMANENCE_ARRAY_CHOICES}
          isLoadingData={false}
          control={form.control}
          defaultValue={form.getValues().permanencia}
          error={errors.permanencia}
          helperText={errors.permanencia?.message}
          size={gridSizeMdLg6}
        />

        <CustomAutocompleteArrString
          label="Tipo de servicio"
          name="tipo_servicio"
          options={INTERNET_SERVICE_TYPE_ARRAY_CHOICES}
          isLoadingData={false}
          control={form.control}
          defaultValue={form.getValues().tipo_servicio}
          error={errors.tipo_servicio}
          helperText={errors.tipo_servicio?.message}
          size={gridSizeMdLg6}
        />
        <CustomAutocompleteArrString
          label="Tipo de plan"
          name="tipo_plan"
          options={INTERNET_PLAN_INTERNET_TYPE_ARRAY_CHOICES_ALL}
          isLoadingData={false}
          control={form.control}
          defaultValue={form.getValues().tipo_plan}
          error={errors.tipo_plan}
          helperText={errors.tipo_plan?.message}
          size={gridSizeMdLg6}
        />

        <SampleCheckbox
          label="Estado"
          name="state"
          control={form.control}
          defaultValue={form.getValues().state}
          isState
        />
      </CustomTabPanel>

      {/* ======================== Exclusion Matrix ======================== */}
      <CustomTabPanel index={2} value={tabValue}>
        <>
          {/* --------- provinces --------- */}
          <CustomAutocompleteMultiple<Provincia>
            label="Provincias"
            name="provincias"
            textFieldKey="nombre"
            valueKey="name"
            actualValueKey="id"
            // options
            options={provinciasPaging?.data?.items || []}
            defaultValue={
              form.getValues().provincias?.length
                ? provinciasPaging?.data?.items?.filter(
                    (provincia: Provincia) =>
                      (form.getValues().provincias as any[])?.includes(
                        provincia?.id!,
                      ),
                  )
                : []
            }
            isLoadingData={isLoadingProvincias || isRefetchingProvincias}
            // errors
            control={form.control}
            error={undefined}
            helperText={errors.provincias?.message}
            onlyActualValueKey
            required={false}
            onChangeValue={value => {
              const isEmply = !value?.length;
              if (isEmply) {
                form.setValue('ciudades', []);
                form.setValue('zonas', []);
                form.setValue('sectores', []);
              }
            }}
            size={gridSizeMdLg6}
          />
          {/* --------- cities --------- */}
          <CustomAutocompleteMultiple<Ciudad>
            label="Ciudades"
            name="ciudades"
            textFieldKey="nombre"
            valueKey="name"
            actualValueKey="id"
            // options
            options={ciudadesPaging?.data?.items || []}
            defaultValue={
              form.getValues().ciudades?.length
                ? ciudadesPaging?.data?.items?.filter((ciudad: Ciudad) =>
                    (form.getValues().ciudades as any[])?.includes(ciudad?.id!),
                  )
                : []
            }
            isLoadingData={isLoadingCiudades || isRefetchingCiudades}
            disabled={!watchedProvincias?.length}
            // errors
            control={form.control}
            error={undefined}
            helperText={errors.ciudades?.message}
            onlyActualValueKey
            required={false}
            size={gridSizeMdLg6}
            onChangeValue={value => {
              const isEmply = !value?.length;
              if (isEmply) {
                form.setValue('zonas', []);
                form.setValue('sectores', []);
              }
            }}
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
            disabled={!watchedCiudades?.length || !watchedProvincias?.length}
            onlyActualValueKey
            required={false}
            size={gridSizeMdLg6}
            onChangeValue={value => {
              const isEmply = !value?.length;
              if (isEmply) {
                form.setValue('sectores', []);
              }
            }}
          />
          {/* --------- sectores --------- */}
          <CustomAutocompleteMultiple<Sector>
            label="Sectores"
            name="sectores"
            textFieldKey="nombre"
            valueKey="name"
            actualValueKey="id"
            // options
            options={sectoresPaging?.data?.items || []}
            defaultValue={
              form.getValues().sectores?.length
                ? sectoresPaging?.data?.items?.filter((sector: Sector) =>
                    (form.getValues().sectores as any[])?.includes(sector?.id!),
                  )
                : []
            }
            isLoadingData={isLoadingSectores || isRefetchingSectores}
            // errors
            control={form.control}
            error={undefined}
            helperText={errors.sectores?.message}
            disabled={!watchedZonas?.length || !watchedCiudades?.length}
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
            options={
              watchedMetodoPagoExclusivo
                ? metodoPagosPaging?.data?.items?.filter(
                    (metodoPago: MetodoPago) =>
                      metodoPago?.id !== watchedMetodoPagoExclusivo,
                  ) || []
                : metodoPagosPaging?.data?.items || []
            }
            defaultValue={
              form.getValues().metodo_pagos?.length
                ? metodoPagosPaging?.data?.items?.filter(
                    (metodoPago: MetodoPago) =>
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
          />
        </>
      </CustomTabPanel>
    </TabsFormBoxScene>
  );
};

export default SavePlanInternet;

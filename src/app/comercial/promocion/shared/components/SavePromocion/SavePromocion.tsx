/* eslint-disable indent */
import { yupResolver } from '@hookform/resolvers/yup';
import { Tab } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreatePromocionParamsBase,
  useCreatePromocion,
  useFetchCiudades,
  useFetchPlans,
  useFetchProvincias,
  useFetchSectores,
  useFetchZonas,
  useUpdatePromocion,
} from '@/actions/app';
import {
  a11yProps,
  CustomAutocompleteArrString,
  CustomAutocompleteMultiple,
  CustomAutocompleteMultipleArrString,
  CustomDatePicker,
  CustomNumberTextField,
  CustomRadioButtonGroup,
  CustomTabPanel,
  CustomTextField,
  FormTabsOnly,
  InputAndBtnGridSpace,
  SampleCheckbox,
  TabsFormBoxScene,
} from '@/shared/components';
import {
  ALL_MONTHS_STRING,
  DiscountTypeEnumChoice,
  RECURRENCE_ARRAY_CHOICES,
  SAVE_PROMOCION_PERMISSIONS,
} from '@/shared/constants/app';
import { gridSize, gridSizeMdLg6 } from '@/shared/constants/ui';
import { useLoaders, useTabsOnly } from '@/shared/hooks';
import { useCheckPermissionsArray } from '@/shared/hooks/auth';
import type {
  Ciudad,
  Plan,
  Promocion,
  Provincia,
  Sector,
  Zona,
} from '@/shared/interfaces';
import { promocionFormSchema } from '@/shared/utils';
import { ToastWrapper } from '@/shared/wrappers';
import { returnUrlPromocionsPage } from '../../../pages/tables/PromocionsPage';

export interface SavePromocionProps {
  title: string;
  promocion?: Promocion;
}

type SaveFormData = CreatePromocionParamsBase & {
  // helpers
  allProvincias?: boolean;
  allCities?: boolean;
  allZones?: boolean;
  allSectores?: boolean;
  allPlanes?: boolean;
};

const SavePromocion: React.FC<SavePromocionProps> = ({ title, promocion }) => {
  useCheckPermissionsArray(SAVE_PROMOCION_PERMISSIONS);

  ///* hooks ----------------
  const navigate = useNavigate();
  const { tabValue, handleTabChange } = useTabsOnly({
    initialTabValue: 1,
  });

  ///* form ----------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(promocionFormSchema) as any,
    defaultValues: {
      state: true,
      allCities: false,
      tipo_descuento: DiscountTypeEnumChoice.PORCENTAJE,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const watchedAllProvincias = form.watch('allProvincias');
  const watchedAllCities = form.watch('allCities');
  const watchedAllZones = form.watch('allZones');
  const watchedAllSectores = form.watch('allSectores');
  const watchedTipoDescuento = form.watch('tipo_descuento');
  const watchedAllPlanes = form.watch('allPlanes');
  const watchedFechaInicio = form.watch('fecha_inicio');

  ///* fetch data ----------------
  const {
    data: provinciasPaging,
    isLoading: isLoadingProvincias,
    isRefetching: isRefetchingProvincias,
  } = useFetchProvincias({
    params: {
      has_coverage: true,
      page_size: 600,
    },
  });
  const {
    data: ciudadesPaging,
    isLoading: isLoadingCiudades,
    isRefetching: isRefetchingCiudades,
  } = useFetchCiudades({
    params: {
      has_coverage: true,
      page_size: 600,
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
    data: sectoresPaging,
    isLoading: isLoadingSectores,
    isRefetching: isRefetchingSectores,
  } = useFetchSectores({
    params: {
      has_coverage: true,
      page_size: 600,
    },
  });
  const {
    data: planesPaging,
    isLoading: isLoadingPlanes,
    isRefetching: isRefetchingPlanes,
  } = useFetchPlans({
    params: {
      page_size: 600,
    },
  });

  ///* mutations ----------------
  const createPromocionMutation = useCreatePromocion<CreatePromocionParamsBase>(
    {
      navigate,
      returnUrl: returnUrlPromocionsPage,
      enableErrorNavigate: false,
    },
  );
  const updatePromocionMutation = useUpdatePromocion<CreatePromocionParamsBase>(
    {
      navigate,
      returnUrl: returnUrlPromocionsPage,
    },
  );

  ///* handlers ----------------
  const onSave = async (data: SaveFormData) => {
    const { fecha_fin, ...restData } = data;

    ///* upd
    if (promocion?.id) {
      updatePromocionMutation.mutate({
        id: promocion.id!,
        data: {
          ...restData,
          ...(fecha_fin && { fecha_fin }),
        } as unknown as CreatePromocionParamsBase,
      });
      return;
    }

    ///* create
    createPromocionMutation.mutate({
      ...restData,
      ...(fecha_fin && { fecha_fin }),
    } as unknown as CreatePromocionParamsBase);
  };

  ///* effects
  useEffect(() => {
    if (!promocion?.id) return;

    const allProvincias = (promocion.provincias as any[])?.includes('*');
    const allCities = (promocion.ciudades as any[])?.includes('*');
    const allZones = (promocion.zonas as any[])?.includes('*');
    const allSectores = (promocion.sectores as any[])?.includes('*');
    const allPlanes = (promocion.planes as any[])?.includes('*');

    reset({
      ...promocion,
      allProvincias,
      allCities,
      allZones,
      allSectores,
      allPlanes,
    });
  }, [promocion, reset]);

  const customLoading =
    isLoadingCiudades ||
    isLoadingZonas ||
    isLoadingSectores ||
    isRefetchingCiudades ||
    isRefetchingZonas ||
    isRefetchingSectores ||
    isLoadingProvincias ||
    isRefetchingProvincias ||
    isLoadingPlanes ||
    isRefetchingPlanes;
  useLoaders(customLoading);

  return (
    <TabsFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlPromocionsPage)}
      onSave={handleSubmit(onSave, () => {
        ToastWrapper.error('Faltan campos requeridos por completar');
      })}
      tabs={
        <FormTabsOnly value={tabValue} onChange={handleTabChange}>
          <Tab label="Datos Generales" value={1} {...a11yProps(1)} />

          <Tab label="Matriz" value={2} {...a11yProps(2)} />
        </FormTabsOnly>
      }
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
        />

        {/* ============== tipo descuento ============== */}
        <CustomRadioButtonGroup
          label="Tipo descuento"
          control={form.control}
          name="tipo_descuento"
          defaultValue={form.getValues().tipo_descuento || ''}
          options={[
            {
              value: DiscountTypeEnumChoice.PORCENTAJE,
              label: 'Porcentaje',
            },
            { value: DiscountTypeEnumChoice.VALOR, label: 'Valor' },
          ]}
          onChangeValue={() => {
            form.setValue('valor_descuento', '');
          }}
        />
        {watchedTipoDescuento === DiscountTypeEnumChoice.PORCENTAJE ? (
          <CustomNumberTextField
            label="Porcentaje descuento"
            name="valor_descuento"
            control={form.control}
            defaultValue={form.getValues().valor_descuento}
            error={errors.valor_descuento}
            helperText={errors.valor_descuento?.message}
            customType="percentage"
          />
        ) : (
          <CustomNumberTextField
            label="Valor descuento"
            name="valor_descuento"
            control={form.control}
            defaultValue={form.getValues().valor_descuento}
            error={errors.valor_descuento}
            helperText={errors.valor_descuento?.message}
            customType="currency"
          />
        )}

        <CustomNumberTextField
          label="Prioridad"
          name="prioridad"
          control={form.control}
          defaultValue={form.getValues().prioridad}
          error={errors.prioridad}
          helperText={errors.prioridad?.message}
          size={gridSizeMdLg6}
          min={1}
        />
        <CustomAutocompleteArrString
          label="Recurrencia"
          name="recurrencia"
          control={form.control}
          defaultValue={form.getValues('recurrencia')}
          options={RECURRENCE_ARRAY_CHOICES}
          isLoadingData={false}
          error={errors.recurrencia}
          helperText={errors.recurrencia?.message}
          size={gridSizeMdLg6}
          disableClearable
        />

        <CustomDatePicker
          label="Fecha inicio"
          name="fecha_inicio"
          control={form.control}
          defaultValue={form.getValues().fecha_inicio}
          error={errors.fecha_inicio}
          helperText={errors.fecha_inicio?.message}
          size={gridSizeMdLg6}
        />
        <CustomDatePicker
          label="Fecha fin"
          name="fecha_fin"
          control={form.control}
          defaultValue={form.getValues().fecha_fin}
          error={errors.fecha_fin}
          helperText={errors.fecha_fin?.message}
          size={gridSizeMdLg6}
          required={false}
          minDate={watchedFechaInicio}
        />

        <SampleCheckbox
          label="Estado"
          name="state"
          control={form.control}
          defaultValue={form.getValues().state}
          isState
        />
      </CustomTabPanel>

      {/* ======================== Select ======================== */}
      <CustomTabPanel index={2} value={tabValue}>
        {/* --------- plans --------- */}
        <InputAndBtnGridSpace
          mainGridSize={gridSize}
          inputNode={
            <CustomAutocompleteMultiple<Plan>
              label="Planes"
              name="planes"
              textFieldKey="nombre"
              valueKey="name"
              actualValueKey="id"
              // options
              options={planesPaging?.data?.items || []}
              defaultValue={
                form.getValues().planes?.length
                  ? planesPaging?.data?.items?.filter((plan: Plan) =>
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
            />
          }
          overrideBtnNode
          customBtnNode={
            <SampleCheckbox
              label="TODOS"
              name="allPlanes"
              control={form.control}
              defaultValue={!!form.getValues().allPlanes}
              onChangeValue={value => {
                if (value) return form.setValue('planes', ['*']);
                form.setValue('planes', []);
              }}
              // disabled
              disabled={!planesPaging?.data?.items?.length}
              onClickDisabled={() => {
                ToastWrapper.warning(
                  'No se puede seleccionar todos los planes ya que no se tienen registros disponibles',
                );
              }}
            />
          }
        />

        {/* --------- provinces --------- */}
        <InputAndBtnGridSpace
          mainGridSize={gridSize}
          inputNode={
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
              disabled={watchedAllProvincias}
              onlyActualValueKey
              required={false}
            />
          }
          overrideBtnNode
          customBtnNode={
            <SampleCheckbox
              label="TODOS"
              name="allProvincias"
              control={form.control}
              defaultValue={!!form.getValues().allProvincias}
              onChangeValue={value => {
                if (value) return form.setValue('provincias', ['*']);
                form.setValue('provincias', []);
              }}
              // disabled
              disabled={!provinciasPaging?.data?.items?.length}
              onClickDisabled={() => {
                ToastWrapper.warning(
                  'No se puede seleccionar todas las provincias ya que no se tienen registros disponibles',
                );
              }}
            />
          }
        />

        {/* --------- cities --------- */}
        <InputAndBtnGridSpace
          mainGridSize={gridSize}
          inputNode={
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
                      (form.getValues().ciudades as any[])?.includes(
                        ciudad?.id!,
                      ),
                    )
                  : []
              }
              isLoadingData={isLoadingCiudades || isRefetchingCiudades}
              // errors
              control={form.control}
              error={undefined}
              helperText={errors.ciudades?.message}
              disabled={watchedAllCities}
              onlyActualValueKey
              required={false}
            />
          }
          overrideBtnNode
          customBtnNode={
            <SampleCheckbox
              label="TODOS"
              name="allCities"
              control={form.control}
              defaultValue={!!form.getValues().allCities}
              onChangeValue={value => {
                if (value) return form.setValue('ciudades', ['*']);
                form.setValue('ciudades', []);
              }}
              // disabled
              disabled={!provinciasPaging?.data?.items?.length}
              onClickDisabled={() => {
                ToastWrapper.warning(
                  'No se puede seleccionar todas las ciudades ya que no se tienen registros disponibles',
                );
              }}
            />
          }
        />

        {/* --------- zones --------- */}
        <InputAndBtnGridSpace
          mainGridSize={gridSize}
          inputNode={
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
              disabled={watchedAllZones}
              onlyActualValueKey
              required={false}
            />
          }
          overrideBtnNode
          customBtnNode={
            <SampleCheckbox
              label="TODOS"
              name="allZones"
              control={form.control}
              defaultValue={!!form.getValues().allZones}
              onChangeValue={value => {
                if (value) return form.setValue('zonas', ['*']);
                form.setValue('zonas', []);
              }}
              // disabled
              disabled={!ciudadesPaging?.data?.items?.length}
              onClickDisabled={() => {
                ToastWrapper.warning(
                  'No se puede seleccionar todas las zonas ya que no se tienen registros disponibles',
                );
              }}
            />
          }
        />

        {/* --------- sectores --------- */}
        <InputAndBtnGridSpace
          mainGridSize={gridSize}
          inputNode={
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
                      (form.getValues().sectores as any[])?.includes(
                        sector?.id!,
                      ),
                    )
                  : []
              }
              isLoadingData={isLoadingSectores || isRefetchingSectores}
              // errors
              control={form.control}
              error={undefined}
              helperText={errors.sectores?.message}
              disabled={watchedAllSectores}
              onlyActualValueKey
              required={false}
            />
          }
          overrideBtnNode
          customBtnNode={
            <SampleCheckbox
              label="TODOS"
              name="allSectores"
              control={form.control}
              defaultValue={!!form.getValues().allSectores}
              onChangeValue={value => {
                if (value) return form.setValue('sectores', ['*']);
                form.setValue('sectores', []);
              }}
              // disabled
              disabled={!zonasPaging?.data?.items?.length}
              onClickDisabled={() => {
                ToastWrapper.warning(
                  'No se puede seleccionar todos los sectores ya que no se tienen registros disponibles',
                );
              }}
            />
          }
        />

        {/* ----- Meses Gratuitos ----- */}
        <CustomAutocompleteMultipleArrString
          label="Meses Gratuitos"
          name="meses_gratis"
          textFieldKey="meses_gratis"
          control={form.control}
          defaultValue={
            form.getValues().meses_gratis?.length
              ? ALL_MONTHS_STRING.filter(month =>
                  (form.getValues().meses_gratis as any[])?.includes(month),
                )
              : []
          }
          // options
          options={ALL_MONTHS_STRING}
          isLoadingData={false}
          // errors
          error={!!errors.meses_gratis?.length}
          helperText={errors.meses_gratis?.message}
          size={gridSizeMdLg6}
          enableStringify={false}
          required={false}
        />

        {/* ----- Meses Descuento ----- */}
        <CustomAutocompleteMultipleArrString
          label="Meses Descuento"
          name="meses_descuento"
          textFieldKey="meses_descuento"
          control={form.control}
          defaultValue={
            form.getValues().meses_descuento?.length
              ? ALL_MONTHS_STRING.filter(month =>
                  (form.getValues().meses_descuento as any[])?.includes(month),
                )
              : []
          }
          // options
          options={ALL_MONTHS_STRING}
          isLoadingData={false}
          // errors
          error={!!errors.meses_descuento?.length}
          helperText={errors.meses_descuento?.message}
          size={gridSizeMdLg6}
          enableStringify={false}
          required={false}
        />
      </CustomTabPanel>
    </TabsFormBoxScene>
  );
};

export default SavePromocion;

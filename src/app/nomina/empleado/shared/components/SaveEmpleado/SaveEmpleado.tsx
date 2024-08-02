import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CiSearch } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

import {
  CreateEmpleadoParamsBase,
  useCreateEmpleado,
  useFetchAreas,
  useFetchCanalVentas,
  useFetchCargos,
  useFetchCiudades,
  useFetchDepartamentos,
  useFetchEmpresas,
  useFetchPaises,
  useFetchProvincias,
  useFetchSectores,
  useFetchZonas,
  useUpdateEmpleado,
} from '@/actions/app';
import {
  CustomAutocomplete,
  CustomAutocompleteArrString,
  CustomCellphoneTextField,
  CustomIdentificacionTextField,
  CustomNumberTextField,
  CustomTextArea,
  CustomTextField,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  InputAndBtnGridSpace,
  SingleFormBoxScene,
} from '@/shared/components';
import {
  EMPLOYEE_TYPE_ARRAY_CHOICES,
  IDENTIFICATION_TYPE_ARRAY_CHOICES,
  SAVE_EMPLEADO_PERMISSIONS,
} from '@/shared/constants/app';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { useLoaders } from '@/shared/hooks';
import {
  Area,
  CanalVenta,
  Cargo,
  Ciudad,
  Departamento,
  Empleado,
  Empresa,
  Pais,
  Provincia,
  Sector,
  Zona,
} from '@/shared/interfaces';
import { empleadoFormSchema } from '@/shared/utils';
import { ToastWrapper } from '@/shared/wrappers';
import { returnUrlEmpleadosPage } from '../../../pages/tables/EmpleadosPage';
import { useCheckPermissionsArray } from '@/shared/hooks/auth';

export interface SaveEmpleadoProps {
  title: string;
  empleado?: Empleado;
}

type SaveFormData = CreateEmpleadoParamsBase & {};

const SaveEmpleado: React.FC<SaveEmpleadoProps> = ({ title, empleado }) => {
  useCheckPermissionsArray(SAVE_EMPLEADO_PERMISSIONS);

  ///* hooks
  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(empleadoFormSchema) as any,
    defaultValues: {
      state: true,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* fetch data ---------------------
  const watchedEmpresa = form.watch('empresa');
  const watchedArea = form.watch('area');
  const watchedCountry = form.watch('pais');
  const watchedProvincia = form.watch('provincia');
  const watchedCiudad = form.watch('ciudad');
  const watchedZona = form.watch('zona');
  const watchedIdentificationType = form.watch('tipo_identificacion');
  const {
    data: empresaPagingRes,
    isLoading: isLoadingEmpresas,
    isRefetching: isRefetchingEmpresas,
  } = useFetchEmpresas({
    params: {
      page_size: 100,
    },
  });
  const {
    data: areaPagingRes,
    isLoading: isLoadingAreas,
    isRefetching: isRefetchingAreas,
  } = useFetchAreas({
    enabled: !!watchedEmpresa,
    params: {
      empresa: watchedEmpresa,
      page_size: 726,
    },
  });
  const {
    data: departamentoPagingRes,
    isLoading: isLoadingDepartamentos,
    isRefetching: isRefetchingDepartamentos,
  } = useFetchDepartamentos({
    enabled: !!watchedArea,
    params: {
      area: watchedArea,
      page_size: 1000,
    },
  });
  const {
    data: cargosPagingRes,
    isLoading: isLoadingCargos,
    isRefetching: isRefetchingCargos,
  } = useFetchCargos({
    enabled: !!watchedEmpresa,
    params: {
      empresa: watchedEmpresa,
      page_size: 1000,
    },
  });
  const {
    data: paisesPagingRes,
    isLoading: isLoadingPaises,
    isRefetching: isRefetchingPaises,
  } = useFetchPaises({
    params: {
      page_size: 1000,
    },
  });
  const {
    data: provinciasPagingRes,
    isLoading: isLoadingProvincias,
    isRefetching: isRefetchingProvincias,
  } = useFetchProvincias({
    enabled: !!watchedCountry,
    params: {
      pais: watchedCountry,
      page_size: 1000,
    },
  });
  const {
    data: ciudadesPagingRes,
    isLoading: isLoadingCiudades,
    isRefetching: isRefetchingCiudades,
  } = useFetchCiudades({
    enabled: !!watchedProvincia,
    params: {
      provincia: watchedProvincia,
      page_size: 1000,
    },
  });
  const {
    data: zonasPagingRes,
    isLoading: isLoadingZonas,
    isRefetching: isRefetchingZonas,
  } = useFetchZonas({
    enabled: !!watchedCiudad,
    params: {
      ciudad: watchedCiudad,
      page_size: 1000,
    },
  });
  const {
    data: sectoresPagingRes,
    isLoading: isLoadingSectores,
    isRefetching: isRefetchingSectores,
  } = useFetchSectores({
    enabled: !!watchedZona,
    params: {
      zona: watchedZona,
      page_size: 1000,
    },
  });
  const {
    data: canalesVentaPagingRes,
    isLoading: isLoadingCanalesVenta,
    isRefetching: isRefetchingCanalesVenta,
  } = useFetchCanalVentas({
    enabled: !!watchedEmpresa,
    params: {
      empresa: watchedEmpresa,
      page_size: 1000,
    },
  });

  ///* mutations ---------------------
  const createEmpleadoMutation = useCreateEmpleado({
    navigate,
    returnUrl: returnUrlEmpleadosPage,
    enableErrorNavigate: false,
  });
  const updateEmpleadoMutation = useUpdateEmpleado<CreateEmpleadoParamsBase>({
    navigate,
    returnUrl: returnUrlEmpleadosPage,
  });

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (empleado?.id) {
      updateEmpleadoMutation.mutate({ id: empleado.id!, data });
      return;
    }

    ///* create
    createEmpleadoMutation.mutate(data);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!empleado?.id) return;
    reset(empleado);
  }, [empleado, reset]);

  // alerts no data | empty arr
  useEffect(() => {
    if (!watchedCountry || isLoadingProvincias || isRefetchingProvincias)
      return;

    !provinciasPagingRes?.data?.items?.length &&
      ToastWrapper.warning(
        'No se encontraron provincias para el país seleccionado',
      );

    if (!watchedProvincia || isLoadingCiudades || isRefetchingCiudades) return;
    !ciudadesPagingRes?.data?.items?.length &&
      ToastWrapper.warning(
        'No se encontraron ciudades para la provincia seleccionada',
      );

    if (!watchedCiudad || isLoadingZonas || isRefetchingZonas) return;
    !zonasPagingRes?.data?.items?.length &&
      ToastWrapper.warning(
        'No se encontraron zonas para la ciudad seleccionada',
      );
  }, [
    watchedProvincia,
    watchedCiudad,
    watchedZona,
    watchedCountry,
    isLoadingProvincias,
    isRefetchingProvincias,
    provinciasPagingRes?.data?.items,
    isLoadingCiudades,
    isRefetchingCiudades,
    ciudadesPagingRes?.data?.items,
    isLoadingZonas,
    isRefetchingZonas,
    zonasPagingRes?.data?.items,
  ]);
  // alerts no data | empty arr
  useEffect(() => {
    if (!watchedEmpresa) return;
    if (isLoadingAreas) return;
    !areaPagingRes?.data?.items?.length &&
      ToastWrapper.warning(
        'No se encontraron áreas para la empresa seleccionada',
      );

    if (isLoadingCargos || isRefetchingCargos) return;
    !cargosPagingRes?.data?.items?.length &&
      ToastWrapper.warning(
        'No se encontraron cargos para la empresa seleccionada',
      );

    if (isLoadingCanalesVenta || isRefetchingCanalesVenta) return;
    !canalesVentaPagingRes?.data?.items?.length &&
      ToastWrapper.warning(
        'No se encontraron canales de venta para la empresa seleccionada',
      );
  }, [
    areaPagingRes?.data?.items?.length,
    canalesVentaPagingRes?.data?.items?.length,
    cargosPagingRes?.data?.items?.length,
    isLoadingAreas,
    isLoadingCanalesVenta,
    isLoadingCargos,
    isRefetchingCanalesVenta,
    isRefetchingCargos,
    watchedArea,
    watchedEmpresa,
  ]);

  const isLoadingCustom =
    isLoadingEmpresas ||
    isLoadingAreas ||
    isLoadingDepartamentos ||
    isLoadingPaises ||
    isLoadingProvincias ||
    isLoadingCiudades ||
    isLoadingZonas ||
    isLoadingSectores ||
    isRefetchingEmpresas ||
    isRefetchingAreas ||
    isRefetchingDepartamentos ||
    isRefetchingPaises ||
    isRefetchingProvincias ||
    isRefetchingCiudades ||
    isRefetchingZonas ||
    isRefetchingSectores ||
    isRefetchingCanalesVenta ||
    isLoadingCanalesVenta;
  useLoaders(isLoadingCustom);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlEmpleadosPage)}
      onSave={handleSubmit(onSave, () => {
        ToastWrapper.error('Faltan campos requeridos por completar');
      })}
    >
      {/* -------- User Form -------- */}
      <CustomTypoLabel text="Información Personal" />
      <>
        <CustomAutocompleteArrString
          label="Tipo de identificación"
          name="tipo_identificacion"
          control={form.control}
          defaultValue={form.getValues('tipo_identificacion')}
          options={IDENTIFICATION_TYPE_ARRAY_CHOICES}
          isLoadingData={false}
          error={errors.tipo_identificacion}
          helperText={errors.tipo_identificacion?.message}
          size={gridSizeMdLg6}
          disableClearable
          onChangeValue={() => {
            form.setValue('identificacion', '');
            form.setValue('razon_social', '');
          }}
        />
        <InputAndBtnGridSpace
          inputNode={
            <CustomIdentificacionTextField
              label="Identificación"
              name="identificacion"
              control={form.control}
              selectedDocumentType={watchedIdentificationType}
              defaultValue={form.getValues('identificacion')}
              error={errors.identificacion}
              helperText={errors.identificacion?.message}
              onFetchCedulaRucInfo={value => {
                alert(value);
              }}
              disabled={!watchedIdentificationType}
            />
          }
          btnLabel="Buscar"
          iconBtn={<CiSearch />}
          onClick={() => {
            alert('search');
          }}
        />

        <CustomTextField
          label="Razón social"
          name="razon_social"
          control={form.control}
          defaultValue={form.getValues().razon_social}
          error={errors.razon_social}
          helperText={errors.razon_social?.message}
        />
      </>
      <CustomTextField
        label="Correo Electrónico"
        name="email"
        control={form.control}
        defaultValue={form.getValues().email}
        error={errors.email}
        helperText={errors.email?.message}
        type="email"
      />

      {/* -------- Cargo -------- */}
      <CustomTypoLabel
        text="Cargo en la Empresa"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />
      <CustomAutocomplete<Empresa>
        label="Empresa"
        name="empresa"
        // options
        options={empresaPagingRes?.data?.items || []}
        valueKey="razon_social"
        actualValueKey="id"
        defaultValue={form.getValues().empresa}
        isLoadingData={isLoadingEmpresas}
        // vaidation
        control={form.control}
        error={errors.empresa}
        helperText={errors.empresa?.message}
      />
      <CustomAutocomplete<Area>
        label="Area"
        name="area"
        // options
        options={areaPagingRes?.data?.items || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().area}
        isLoadingData={isLoadingAreas}
        // vaidation
        control={form.control}
        error={errors.area}
        helperText={errors.area?.message}
        size={gridSizeMdLg6}
      />
      <CustomAutocomplete<Departamento>
        label="Departamento"
        name="departamento"
        // options
        options={departamentoPagingRes?.data?.items || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().departamento}
        isLoadingData={isLoadingDepartamentos}
        // vaidation
        control={form.control}
        error={errors.departamento}
        helperText={errors.departamento?.message}
        size={gridSizeMdLg6}
      />
      <CustomAutocomplete<Cargo>
        label="Cargo"
        name="cargo"
        // options
        options={cargosPagingRes?.data?.items || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().cargo}
        isLoadingData={isLoadingCargos || isRefetchingCargos}
        // vaidation
        control={form.control}
        error={errors.cargo}
        helperText={errors.cargo?.message}
        size={gridSizeMdLg6}
      />
      <CustomAutocompleteArrString
        label="Tipo de Empleado"
        name="tipo_empleado"
        control={form.control}
        defaultValue={form.getValues('tipo_empleado')}
        options={EMPLOYEE_TYPE_ARRAY_CHOICES}
        isLoadingData={false}
        error={errors.tipo_empleado}
        helperText={errors.tipo_empleado?.message}
        size={gridSizeMdLg6}
        disableClearable
      />
      {/* ----------- canal ventas ----------- */}
      <>
        <CustomAutocomplete<CanalVenta>
          label="Canal de Venta"
          name="canal_venta"
          // options
          options={canalesVentaPagingRes?.data?.items || []}
          valueKey="name"
          actualValueKey="id"
          defaultValue={form.getValues().canal_venta}
          isLoadingData={isLoadingCanalesVenta || isRefetchingCanalesVenta}
          // vaidation
          control={form.control}
          error={errors.canal_venta}
          helperText={errors.canal_venta?.message}
          required={false}
          size={gridSizeMdLg6}
        />
      </>
      <CustomNumberTextField
        label="Salario"
        name="salary"
        control={form.control}
        defaultValue={form.getValues().salary}
        error={errors.salary}
        helperText={errors.salary?.message}
        customType="currency"
        min={0}
        size={gridSizeMdLg6}
      />

      {/* ----------- contact info ----------- */}
      <>
        <CustomTypoLabel
          text="Información de Contacto"
          pt={CustomTypoLabelEnum.ptMiddlePosition}
        />
        <CustomCellphoneTextField
          label="Teléfono 1"
          name="phone_1"
          control={form.control}
          defaultValue={form.getValues().phone_1}
          error={errors.phone_1}
          helperText={errors.phone_1?.message}
        />
        <CustomCellphoneTextField
          label="Teléfono 2"
          name="phone_2"
          control={form.control}
          defaultValue={form.getValues().phone_2}
          error={errors.phone_2}
          helperText={errors.phone_2?.message}
          size={gridSizeMdLg6}
        />
        <CustomCellphoneTextField
          label="Teléfono 3"
          name="phone_3"
          control={form.control}
          defaultValue={form.getValues().phone_3}
          error={errors.phone_3}
          helperText={errors.phone_3?.message}
          size={gridSizeMdLg6}
          required={false}
        />
      </>

      {/* ----------- Location ----------- */}
      <>
        <CustomAutocomplete<Pais>
          label="País"
          name="pais"
          // options
          options={paisesPagingRes?.data?.items || []}
          valueKey="name"
          actualValueKey="id"
          defaultValue={form.getValues().pais}
          isLoadingData={isLoadingPaises || isRefetchingPaises}
          // vaidation
          control={form.control}
          error={errors.pais}
          helperText={errors.pais?.message}
          onChangeValue={() => {
            form.reset({
              ...form.getValues(),
              provincia: undefined,
              ciudad: undefined,
              zona: undefined,
              sector: undefined,
            });
          }}
        />
        <CustomAutocomplete<Provincia>
          label="Provincia"
          name="provincia"
          // options
          options={provinciasPagingRes?.data?.items || []}
          valueKey="name"
          actualValueKey="id"
          defaultValue={form.getValues().provincia}
          isLoadingData={isLoadingProvincias || isRefetchingProvincias}
          // vaidation
          control={form.control}
          error={errors.provincia}
          helperText={errors.provincia?.message}
          size={gridSizeMdLg6}
          onChangeValue={() => {
            form.reset({
              ...form.getValues(),
              ciudad: undefined,
              zona: undefined,
              sector: undefined,
            });
          }}
        />
        <CustomAutocomplete<Ciudad>
          label="Ciudad"
          name="ciudad"
          // options
          options={ciudadesPagingRes?.data?.items || []}
          valueKey="name"
          actualValueKey="id"
          defaultValue={form.getValues().ciudad}
          isLoadingData={isLoadingCiudades || isRefetchingCiudades}
          // vaidation
          control={form.control}
          error={errors.ciudad}
          helperText={errors.ciudad?.message}
          size={gridSizeMdLg6}
          onChangeValue={() => {
            form.reset({
              ...form.getValues(),
              zona: undefined,
              sector: undefined,
            });
          }}
        />
        <CustomAutocomplete<Zona>
          label="Zona"
          name="zona"
          // options
          options={zonasPagingRes?.data?.items || []}
          valueKey="name"
          actualValueKey="id"
          defaultValue={form.getValues().zona}
          isLoadingData={isLoadingZonas || isRefetchingZonas}
          // vaidation
          control={form.control}
          error={errors.zona}
          helperText={errors.zona?.message}
          size={gridSizeMdLg6}
          onChangeValue={() => {
            form.reset({
              ...form.getValues(),
              sector: undefined,
            });
          }}
          required={false}
        />
        <CustomAutocomplete<Sector>
          label="Sector"
          name="sector"
          // options
          options={sectoresPagingRes?.data?.items || []}
          valueKey="name"
          actualValueKey="id"
          defaultValue={form.getValues().sector}
          isLoadingData={isLoadingSectores || isRefetchingSectores}
          // vaidation
          control={form.control}
          error={errors.sector}
          helperText={errors.sector?.message}
          size={gridSizeMdLg6}
          required={false}
        />
      </>
      <CustomTextArea
        label="Dirección"
        name="address"
        control={form.control}
        defaultValue={form.getValues().address}
        error={errors.address}
        helperText={errors.address?.message}
      />

      {/* <SampleCheckbox
        label="Estado"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        size={gridSizeMdLg6}
        isState
      /> */}
    </SingleFormBoxScene>
  );
};

export default SaveEmpleado;

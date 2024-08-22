import { Tab } from '@mui/material';
import type { MRT_ColumnDef } from 'material-react-table';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import {
  CreateFlotaParamsBase,
  useCreateFlota,
  useFetchAreas,
  useFetchCiudades,
  useFetchDepartamentos,
  useFetchEmpleados,
  useFetchPaises,
  useFetchProvincias,
  useFetchZonas,
  useUpdateFlota,
} from '@/actions/app';
import {
  EmployeeTypeEnumChoice,
  emptyCellNested,
  emptyCellOneLevel,
  gridSizeMdLg11,
  gridSizeMdLg6,
  gridSizeMdLg8,
  TABLE_CONSTANTS,
  ToastWrapper,
  useLoaders,
  useMapPolygonComponent,
  useTabsOnly,
  Zona,
} from '@/shared';
import {
  a11yProps,
  CustomAutocomplete,
  CustomCellphoneTextField,
  CustomMinimalTable,
  CustomNumberTextField,
  CustomTabPanel,
  CustomTextField,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  FlotaZonesMap,
  FormTabsOnly,
  SampleCheckbox,
  SingleIconButton,
  TabsFormBoxScene,
} from '@/shared/components';
import { useLocationCoords } from '@/shared/hooks/ui/useLocationCoords';
import {
  Area,
  Ciudad,
  Departamento,
  Empleado,
  Flota,
  Pais,
  Provincia,
} from '@/shared/interfaces';
import { useFlotasStore } from '@/store/app';
import { returnUrlFlotasPage } from '../../../pages/tables/FlotasPage';

export interface SaveFlotaProps {
  title: string;
  flota?: Flota;
}

type SaveFormData = CreateFlotaParamsBase & {};

const SaveFlota: React.FC<SaveFlotaProps> = ({ title, flota }) => {
  ///* hooks --------------------
  const navigate = useNavigate();
  const { tabValue, handleTabChange } = useTabsOnly({
    initialTabValue: 1,
  });

  ///* global state --------------------
  const zonesObj = useFlotasStore(s => s.zonesObj);

  ///* form --------------------
  const form = useForm<SaveFormData>({
    // resolver: yupResolver(flotaFormSchema) as any,
    defaultValues: {
      state: true,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;
  const watchedIsBodega = form.watch('es_bodega');
  const watchedArea = form.watch('area');

  const { latLng, setLatLng } = useMapPolygonComponent({});
  useLocationCoords({ setLatLng });

  ///* fetch data --------------------
  const {
    data: liderDataPagingRes,
    isLoading: isLoadingLider,
    isRefetching: isRefetchingLider,
  } = useFetchEmpleados({
    params: {
      page_size: 200,
      tipo_empleado: EmployeeTypeEnumChoice.TECNICO,
    },
  });
  const {
    data: auxiliarDataPagingRes,
    isLoading: isLoadingAuxiliar,
    isRefetching: isRefetchingAuxiliar,
  } = useFetchEmpleados({
    params: {
      page_size: 200,
      tipo_empleado: EmployeeTypeEnumChoice.TECNICO,
    },
  });
  const {
    data: areasDataPagingRes,
    isLoading: isLoadingAreas,
    isRefetching: isRefetchingAreas,
  } = useFetchAreas({
    params: {
      page_size: 200,
    },
  });
  const {
    data: departamentosDataPagingRes,
    isLoading: isLoadingDepartamentos,
    isRefetching: isRefetchingDepartamentos,
  } = useFetchDepartamentos({
    enabled: !!watchedArea,
    params: {
      area: watchedArea,
      page_size: 600,
    },
  });
  const watchedCountry = form.watch('pais');
  const watchedProvince = form.watch('provincia');
  const {
    data: paisesPagingRes,
    isLoading: isLoadingPaises,
    isRefetching: isRefetchingPaises,
  } = useFetchPaises({
    params: {
      page_size: 200,
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
      page_size: 600,
    },
  });
  const {
    data: ciudadesPagingRes,
    isLoading: isLoadingCiudades,
    isRefetching: isRefetchingCiudades,
  } = useFetchCiudades({
    enabled: !!watchedProvince,
    params: {
      provincia: watchedProvince,
      page_size: 1200,
    },
  });
  const {
    data: zonasDataPagingRes,
    isLoading: isLoadingZonas,
    isRefetching: isRefetchingZonas,
  } = useFetchZonas({
    params: {
      page_size: 1200,
    },
  });

  ///* mutations --------------------
  const createFlotaMutation = useCreateFlota({
    navigate,
    returnUrl: returnUrlFlotasPage,
    enableErrorNavigate: false,
  });
  const updateFlotaMutation = useUpdateFlota<CreateFlotaParamsBase>({
    navigate,
    returnUrl: returnUrlFlotasPage,
  });

  ///* handlers --------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;
    if (!zonesObj?.length)
      return ToastWrapper.error('Debe agregar al menos una zona');

    ///* upd
    if (flota?.id) {
      updateFlotaMutation.mutate({
        id: flota.id!,
        data: {
          ...data,
          zonas: zonesObj.map(zone => zone.id) as number[],
        },
      });
      return;
    }

    ///* create
    createFlotaMutation.mutate({
      ...data,
      zonas: zonesObj.map(zone => zone.id),
    });
  };

  ///* table --------------------
  const zoneColumns = useMemo<MRT_ColumnDef<Zona>[]>(
    () => [
      {
        accessorKey: 'actions',
        header: 'ACCIONES',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => {
          const zonesObj = useFlotasStore.getState().zonesObj;
          const removeZoneObj = useFlotasStore.getState().removeZoneObj;
          const currentZone = zonesObj.find(
            zone => zone.id === row.original.id,
          );

          return (
            <>
              <SingleIconButton
                startIcon={<MdDelete />}
                label="Remover"
                color="error"
                onClick={() => {
                  removeZoneObj(currentZone?.id!);
                }}
              />
            </>
          );
        },
      },
      {
        accessorKey: 'name',
        header: 'NOMBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'name'),
      },
      {
        accessorKey: 'ciudad__name',
        header: 'CIUDAD',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['ciudad_data', 'name']),
      },
      {
        accessorKey: 'provincia__name',
        header: 'PROVINCIA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['provincia_data', 'name']),
      },
      {
        accessorKey: 'pais__name',
        header: 'PAIS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['pais_data', 'name']),
      },
    ],
    [],
  );

  ///* effects --------------------
  useEffect(() => {
    if (!flota?.id) return;
    reset(flota);
  }, [flota, reset]);
  const customLoader =
    isLoadingLider ||
    isLoadingAuxiliar ||
    isRefetchingLider ||
    isRefetchingAuxiliar ||
    isLoadingAreas ||
    isRefetchingAreas ||
    isLoadingDepartamentos ||
    isRefetchingDepartamentos ||
    isLoadingPaises ||
    isRefetchingPaises ||
    isLoadingProvincias ||
    isRefetchingProvincias ||
    isLoadingCiudades ||
    isRefetchingCiudades ||
    isLoadingZonas ||
    isRefetchingZonas;
  useLoaders(customLoader);

  return (
    <TabsFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlFlotasPage)}
      onSave={handleSubmit(onSave, () => {
        ToastWrapper.error('Faltan campos requeridos por completar');
      })}
      tabs={
        <FormTabsOnly value={tabValue} onChange={handleTabChange}>
          <Tab label="Datos Generales" value={1} {...a11yProps(1)} />

          <Tab label="Área Operaciones " value={2} {...a11yProps(2)} />
        </FormTabsOnly>
      }
      formSize={gridSizeMdLg11}
    >
      {/* ========================= Datos Generales ========================= */}
      <CustomTabPanel index={1} value={tabValue} gridSizeChild={gridSizeMdLg8}>
        <>
          <CustomTypoLabel text="Datos Contacto" />

          <CustomTextField
            label="Nombre flota"
            name="name"
            control={form.control}
            defaultValue={form.getValues().name}
            error={errors.name}
            helperText={errors.name?.message}
          />
          <CustomAutocomplete<Empleado>
            label="Lider"
            name="lider"
            // options
            options={liderDataPagingRes?.data?.items || []}
            valueKey="razon_social"
            actualValueKey="id"
            defaultValue={form.getValues().lider}
            isLoadingData={isLoadingLider || isRefetchingLider}
            // vaidation
            control={form.control}
            error={errors.lider}
            helperText={errors.lider?.message}
          />
          <CustomAutocomplete<Empleado>
            label="Auxiliar"
            name="auxiliar"
            // options
            options={auxiliarDataPagingRes?.data?.items || []}
            valueKey="razon_social"
            actualValueKey="id"
            defaultValue={form.getValues().auxiliar}
            isLoadingData={isLoadingAuxiliar || isRefetchingAuxiliar}
            // vaidation
            control={form.control}
            error={errors.auxiliar}
            helperText={errors.auxiliar?.message}
            size={gridSizeMdLg6}
          />
          <CustomCellphoneTextField
            label="Telefono 1"
            name="telefono_1"
            control={form.control}
            defaultValue={form.getValues().telefono_1}
            error={errors.telefono_1}
            helperText={errors.telefono_1?.message}
            size={gridSizeMdLg6}
          />
          <CustomTextField
            label="Email"
            name="email"
            type="email"
            control={form.control}
            defaultValue={form.getValues().email}
            error={errors.email}
            helperText={errors.email?.message}
          />
          <CustomCellphoneTextField
            label="Telefono 2"
            name="telefono_2"
            control={form.control}
            defaultValue={form.getValues().telefono_2}
            error={errors.telefono_2}
            helperText={errors.telefono_2?.message}
            size={gridSizeMdLg6}
            required={false}
          />
          <CustomCellphoneTextField
            label="Telefono 3"
            name="telefono_3"
            control={form.control}
            defaultValue={form.getValues().telefono_3}
            error={errors.telefono_3}
            helperText={errors.telefono_3?.message}
            size={gridSizeMdLg6}
            required={false}
          />

          <CustomTypoLabel
            text="Datos Vehículo"
            pt={CustomTypoLabelEnum.ptMiddlePosition}
          />
          <CustomTextField
            label="Marca"
            name="marca_vehiculo"
            control={form.control}
            defaultValue={form.getValues().marca_vehiculo}
            error={errors.marca_vehiculo}
            helperText={errors.marca_vehiculo?.message}
            size={gridSizeMdLg6}
          />
          <CustomTextField
            label="Modelo"
            name="modelo_vehiculo"
            control={form.control}
            defaultValue={form.getValues().modelo_vehiculo}
            error={errors.modelo_vehiculo}
            helperText={errors.modelo_vehiculo?.message}
            size={gridSizeMdLg6}
          />
          <CustomTextField
            label="Placa"
            name="placa_vehiculo"
            control={form.control}
            defaultValue={form.getValues().placa_vehiculo}
            error={errors.placa_vehiculo}
            helperText={errors.placa_vehiculo?.message}
            size={gridSizeMdLg6}
          />
          <CustomTextField
            label="Color"
            name="color_vehiculo"
            control={form.control}
            defaultValue={form.getValues().color_vehiculo}
            error={errors.color_vehiculo}
            helperText={errors.color_vehiculo?.message}
            size={gridSizeMdLg6}
          />
          <CustomNumberTextField
            label="Año"
            name="anio_vehiculo"
            control={form.control}
            defaultValue={form.getValues().anio_vehiculo}
            error={errors.anio_vehiculo}
            helperText={errors.anio_vehiculo?.message}
            size={gridSizeMdLg6}
            min={0}
          />
          <SampleCheckbox
            label="state"
            name="state"
            control={form.control}
            defaultValue={form.getValues().state}
            size={gridSizeMdLg6}
            isState
          />

          <>
            <SampleCheckbox
              label="Es bodega externa"
              name="es_bodega"
              control={form.control}
              defaultValue={form.getValues().state}
              // size={gridSizeMdLg6}
            />
            {watchedIsBodega && <>BODEGA AUTOCOMPLETE</>}
          </>
        </>
      </CustomTabPanel>

      {/* ========================= Cobertura ========================= */}
      <CustomTabPanel index={2} value={tabValue}>
        <>
          <CustomTypoLabel text="Organización" />

          <CustomAutocomplete<Area>
            label="Area"
            name="area"
            // options
            options={areasDataPagingRes?.data?.items || []}
            valueKey="name"
            actualValueKey="id"
            defaultValue={form.getValues().area}
            isLoadingData={isLoadingAreas || isRefetchingAreas}
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
            options={departamentosDataPagingRes?.data?.items || []}
            valueKey="name"
            actualValueKey="id"
            defaultValue={form.getValues().departamento}
            isLoadingData={isLoadingDepartamentos || isRefetchingDepartamentos}
            // vaidation
            control={form.control}
            error={errors.departamento}
            helperText={errors.departamento?.message}
            size={gridSizeMdLg6}
          />

          <CustomAutocomplete<Pais>
            label="Pais"
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
            size={gridSizeMdLg6}
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
          />

          <>
            <CustomTypoLabel
              text="Zonas de operación"
              pt={CustomTypoLabelEnum.ptMiddlePosition}
            />

            {/* -------- zones map -------- */}
            <FlotaZonesMap
              coordenadas={latLng}
              flota={flota!}
              zones={zonasDataPagingRes?.data?.items || []}
              zoomMap={12}
            />

            {/* -------- zones table -------- */}
            <CustomMinimalTable<Zona>
              columns={zoneColumns}
              data={zonesObj}
              enablePagination
            />
          </>
        </>
      </CustomTabPanel>
    </TabsFormBoxScene>
  );
};

export default SaveFlota;

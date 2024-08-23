import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateNodoParamsBase,
  useCreateNodo,
  useUpdateNodo,
} from '@/actions/app/infraestructura';
import {
  CustomAutocomplete,
  CustomCoordsTextField,
  CustomTextArea,
  CustomTextField,
  InputAndBtnGridSpace,
  MapModalComponent,
  SampleCheckbox,
  SingleFormBoxScene,
  SingleIconButton,
} from '@/shared/components';
import {
  useFetchCiudades,
  useFetchPaises,
  useFetchProvincias,
  useFetchSectores,
  useFetchZonas,
} from '@/actions/app';
import {
  Ciudad,
  gridSize,
  gridSizeMdLg1,
  gridSizeMdLg11,
  gridSizeMdLg6,
  nodoFormSchema,
  Pais,
  Provincia,
  SAVE_NODO_PERMISSIONS,
  Sector,
  ToastWrapper,
  useLoaders,
  Zona,
} from '@/shared';
import { useCheckPermissionsArray } from '@/shared/hooks/auth';
import { Nodo } from '@/shared/interfaces/app/infraestructura';
import { returnUrlNodosPage } from '../../../pages/tables/NodosPage';

import { MdEditLocationAlt } from 'react-icons/md';
import { Grid, Typography } from '@mui/material';
import { useMapComponent } from '@/shared/hooks/ui/useMapComponent';
import { useLocationCoords } from '@/shared/hooks/ui/useLocationCoords';

export interface SaveNodoProps {
  title: string;
  nodo?: Nodo;
}

type SaveFormData = CreateNodoParamsBase & {};

const SaveNodo: React.FC<SaveNodoProps> = ({ title, nodo }) => {
  useCheckPermissionsArray(SAVE_NODO_PERMISSIONS);

  ///* local state -----------------
  const [openMapModal, setOpenMapModal] = useState(false);

  ///* hooks
  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(nodoFormSchema),
    defaultValues: {
      state: true,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;
  const watchedCountry = form.watch('pais');
  const watchedProvincia = form.watch('provincia');
  const watchedCiudad = form.watch('ciudad');
  const watchedZona = form.watch('zona');
  const watchedCoords = form.watch('coordenadas');

  const { Map, latLng, setLatLng } = useMapComponent({
    form,
    initialCoords: nodo?.id ? nodo.coordenadas : watchedCoords,
  });
  useLocationCoords({
    form,
    setLatLng,
  });

  ///* fetch data
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
  ///* mutations
  const createNodoMutation = useCreateNodo({
    navigate,
    returnUrl: returnUrlNodosPage,
    enableErrorNavigate: false,
  });
  const updateNodosMutation = useUpdateNodo<CreateNodoParamsBase>({
    navigate,
    returnUrl: returnUrlNodosPage,
  });
  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (nodo?.id) {
      updateNodosMutation.mutate({ id: nodo.id!, data });
      return;
    }

    ///* create
    createNodoMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!nodo?.id) return;
    reset(nodo);
  }, [nodo, reset]);

  // alets: not found province by country
  useEffect(() => {
    if (isLoadingProvincias || isRefetchingProvincias || !watchedCountry)
      return;
    !provinciasPagingRes?.data?.items?.length &&
      ToastWrapper.error(
        'No se encontraron provincias para el país seleccionado',
      );

    if (isLoadingCiudades || isRefetchingCiudades || !watchedProvincia) return;
    !ciudadesPagingRes?.data?.items?.length &&
      ToastWrapper.error(
        'No se encontraron ciudades para la provincia seleccionada',
      );

    if (isLoadingZonas || isRefetchingZonas || !watchedCiudad) return;
    !zonasPagingRes?.data?.items?.length &&
      ToastWrapper.error('No se encontraron zonas para la ciudad seleccionada');

    if (isLoadingSectores || isRefetchingSectores || !watchedZona) return;
    !sectoresPagingRes?.data?.items?.length &&
      ToastWrapper.error(
        'No se encontraron sectores para la zona seleccionada',
      );
  }, [
    watchedCountry,
    watchedProvincia,
    watchedCiudad,
    watchedZona,
    provinciasPagingRes,
    ciudadesPagingRes,
    zonasPagingRes,
    sectoresPagingRes,
    isLoadingProvincias,
    isLoadingCiudades,
    isLoadingZonas,
    isLoadingSectores,
    isRefetchingProvincias,
    isRefetchingCiudades,
    isRefetchingZonas,
    isRefetchingSectores,
  ]);

  useLoaders(
    isLoadingPaises ||
      isRefetchingPaises ||
      isLoadingProvincias ||
      isRefetchingProvincias ||
      isLoadingCiudades ||
      isRefetchingCiudades ||
      isLoadingZonas ||
      isRefetchingZonas ||
      isLoadingSectores ||
      isRefetchingSectores,
  );

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlNodosPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomTextField
        label="Nombre"
        name="name"
        control={form.control}
        defaultValue={form.getValues().name}
        error={errors.name}
        helperText={errors.name?.message}
      />
      <InputAndBtnGridSpace
        mainGridSize={gridSize}
        inputGridSize={gridSizeMdLg11}
        inputNode={
          <CustomCoordsTextField
            label="Coordenadas"
            name="coordenadas"
            control={form.control}
            defaultValue={form.getValues().coordenadas}
            error={errors.coordenadas}
            helperText={errors.coordenadas?.message}
            onChangeValue={(value, isValidCoords) => {
              if (isValidCoords) {
                const s = value.split(',');
                setLatLng({ lat: s[0], lng: s[1] });
              }
            }}
          />
        }
        btnLabel="Ver mapa"
        overrideBtnNode
        customBtnNode={
          <>
            <SingleIconButton
              startIcon={<MdEditLocationAlt />}
              label={'Ver mapa'}
              color={'default' as any}
              onClick={() => {
                setOpenMapModal(true);
              }}
            />

            <MapModalComponent
              open={openMapModal}
              onClose={() => {
                setOpenMapModal(false);
              }}
              //
              showCustomTitleNode
              customTitleNode={
                <Grid item container xs={12}>
                  <Typography variant="h4">
                    Ubicación | Coordenadas:{' '}
                    <span
                      style={{
                        fontSize: '0.93rem',
                        fontWeight: 400,
                      }}
                    >
                      {latLng?.lat}, {latLng?.lng}
                    </span>
                  </Typography>
                </Grid>
              }
              minWidthModal="70%"
              contentNodeOverride={
                <Map
                  coordenadas={
                    latLng
                      ? { lat: latLng.lat, lng: latLng.lng }
                      : { lat: 0, lng: 0 }
                  }
                  canDragMarker={true}
                  setLatLng={setLatLng}
                />
              }
            />
          </>
        }
        btnGridSize={gridSizeMdLg1}
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
      />
      <CustomTextField
        label="Direccion"
        name="direccion"
        control={form.control}
        defaultValue={form.getValues().direccion}
        error={errors.direccion}
        helperText={errors.direccion?.message}
        size={gridSizeMdLg6}
      />
      <CustomTextArea
        label="Descripcion"
        name="descripcion"
        control={form.control}
        defaultValue={form.getValues().descripcion}
        error={errors.descripcion}
        helperText={errors.descripcion?.message}
      />
      <SampleCheckbox
        label="Estado"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        isState
      />
    </SingleFormBoxScene>
  );
};

export default SaveNodo;

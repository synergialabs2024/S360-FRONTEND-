/* eslint-disable indent */
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdEditLocationAlt } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import {
  CreateNapParamsBase,
  useCreateNap,
  useFetchCiudades,
  useFetchNodos,
  useFetchOLTs,
  useFetchSectores,
  useUpdateNap,
} from '@/actions/app';
import {
  NAP_STATUS_ARRAY_CHOICES,
  NAPS_PORTS_QUANTITY_ARRAY,
  NapStatusEnumChoice,
  SAVE_NAP_PERMISSIONS,
  ToastWrapper,
  useLoaders,
} from '@/shared';
import {
  CustomAutocomplete,
  CustomCoordsTextField,
  CustomTextArea,
  CustomTextField,
  InputAndBtnGridSpace,
  MapModalComponent,
  SampleCheckbox,
  SelectTextFieldArrayString,
  SingleFormBoxScene,
  SingleIconButton,
} from '@/shared/components';
import {
  gridSize,
  gridSizeMdLg1,
  gridSizeMdLg11,
  gridSizeMdLg6,
} from '@/shared/constants/ui';
import { useCheckPermissionsArray } from '@/shared/hooks/auth';
import { useLocationCoords } from '@/shared/hooks/ui/useLocationCoords';
import { useMapComponent } from '@/shared/hooks/ui/useMapComponent';
import { Ciudad, Nap, Nodo, OLT, Sector } from '@/shared/interfaces';
import { napFormSchema } from '@/shared/utils';
import { returnUrlNapsPage } from '../../../pages/tables/NapsPage';

export interface SaveNapProps {
  title: string;
  nap?: Nap;
}

type SaveFormData = CreateNapParamsBase & {};

const SaveNap: React.FC<SaveNapProps> = ({ title, nap }) => {
  useCheckPermissionsArray(SAVE_NAP_PERMISSIONS);

  ///* hooks -----------------------
  const navigate = useNavigate();

  ///* local state -----------------------
  const [openMapModal, setOpenMapModal] = useState<boolean>(false);

  ///* form -----------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(napFormSchema) as any,
    defaultValues: {
      state: true,
      es_soterrado: false,
      status_nap: NapStatusEnumChoice.OPERATIVO,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;
  const watchedCity = form.watch('ciudad');
  const watchedSector = form.watch('sector');
  const watchedNodo = form.watch('nodo');
  const watchedCoords = form.watch('coordenadas');

  const { Map, latLng, setLatLng } = useMapComponent({
    form,
    initialCoords: nap?.id ? nap?.coordenadas : watchedCoords,
  });
  useLocationCoords({
    isEditting: !!nap?.id,
    form,
    setLatLng,
  });

  ///* fetch data -----------------------
  const {
    data: citiesPagingRes,
    isLoading: isLoadingCities,
    isRefetching: isRefetchingCities,
  } = useFetchCiudades({
    params: {
      page_size: 900,
    },
  });
  const {
    data: sectoresPagingRes,
    isLoading: isLoadingSectores,
    isRefetching: isRefetchingSectores,
  } = useFetchSectores({
    enabled: !!watchedCity,
    params: {
      page_size: 900,
      ciudad: watchedCity,
    },
  });
  const {
    data: nodosPagingRes,
    isLoading: isLoadingNodos,
    isRefetching: isRefetchingNodos,
  } = useFetchNodos({
    enabled: !!watchedCity,
    params: {
      page_size: 900,
      ciudad: watchedCity,
    },
  });
  const {
    data: oltsPagingRes,
    isLoading: isLoadingOlts,
    isRefetching: isRefetchingOlts,
  } = useFetchOLTs({
    enabled: !!watchedNodo,
    params: {
      page_size: 900,
      nodo: watchedNodo,
    },
  });

  ///* mutations -----------------------
  const createNapMutation = useCreateNap({
    navigate,
    returnUrl: returnUrlNapsPage,
    enableErrorNavigate: false,
  });
  const updateNapMutation = useUpdateNap<CreateNapParamsBase>({
    navigate,
    returnUrl: returnUrlNapsPage,
  });

  ///* handlers -----------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (nap?.id) {
      updateNapMutation.mutate({ id: nap.id!, data });
      return;
    }

    ///* create
    createNapMutation.mutate(data);
  };

  ///* effects -----------------------
  useEffect(() => {
    if (!nap?.id) return;
    reset(nap);
  }, [nap, reset]);

  // alets: not found province by country
  useEffect(() => {
    if (isLoadingSectores || isRefetchingSectores || !watchedCity) return;
    !sectoresPagingRes?.data?.items?.length &&
      ToastWrapper.error(
        'No se encontraron sectores para la ciudad seleccionada',
      );
    if (isLoadingNodos || isRefetchingNodos || !watchedSector) return;
    !nodosPagingRes?.data?.items?.length &&
      ToastWrapper.error('No se encontraron nodos para el sector seleccionado');
    if (isLoadingOlts || isRefetchingOlts || !watchedNodo) return;
    !oltsPagingRes?.data?.items?.length &&
      ToastWrapper.error('No se encontraron olt para el nodo seleccionado');
  }, [
    watchedCity,
    watchedSector,
    watchedNodo,
    sectoresPagingRes,
    nodosPagingRes,
    oltsPagingRes,
    isLoadingSectores,
    isLoadingNodos,
    isLoadingOlts,
    isRefetchingSectores,
    isRefetchingNodos,
    isRefetchingOlts,
  ]);

  const customLoader =
    isLoadingCities ||
    isRefetchingCities ||
    isLoadingSectores ||
    isRefetchingSectores ||
    isLoadingNodos ||
    isRefetchingNodos ||
    isLoadingOlts ||
    isRefetchingOlts;
  useLoaders(customLoader);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlNapsPage)}
      onSave={handleSubmit(onSave, () => {
        console.log('error', errors);
        ToastWrapper.error('Faltan campos requeridos');
      })}
    >
      <CustomTextField
        label="Nombre"
        name="name"
        control={form.control}
        defaultValue={form.getValues().name}
        error={errors.name}
        helperText={errors.name?.message}
      />
      <SelectTextFieldArrayString
        label="Nap status"
        name="status_nap"
        textFieldKey="status_nap"
        // options
        options={NAP_STATUS_ARRAY_CHOICES}
        defaultValue={form.getValues()?.status_nap || ''}
        // errors
        control={form.control}
        error={form.formState.errors.status_nap}
        helperText={form.formState.errors.status_nap?.message}
        gridSize={gridSizeMdLg6}
      />
      <SelectTextFieldArrayString
        label="Cantidad de puertos"
        name="puertos"
        textFieldKey="puertos"
        // options
        options={NAPS_PORTS_QUANTITY_ARRAY}
        defaultValue={form.getValues()?.puertos || ''}
        // errors
        control={form.control}
        error={form.formState.errors.puertos}
        helperText={form.formState.errors.puertos?.message}
        disabled={!!nap?.id}
        gridSize={gridSizeMdLg6}
      />

      <CustomTextField
        label="Proyecto cod"
        name="proyecto_cod"
        control={form.control}
        defaultValue={form.getValues().proyecto_cod}
        error={errors.proyecto_cod}
        helperText={errors.proyecto_cod?.message}
        size={gridSizeMdLg6}
      />

      <CustomAutocomplete<Ciudad>
        label="Ciudad"
        name="ciudad"
        // options
        options={citiesPagingRes?.data?.items || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().ciudad}
        isLoadingData={isLoadingCities || isRefetchingCities}
        // vaidation
        control={form.control}
        error={errors.ciudad}
        helperText={errors.ciudad?.message}
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
      />

      <CustomAutocomplete<Nodo>
        label="Nodo"
        name="nodo"
        // options
        options={nodosPagingRes?.data?.items || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().nodo}
        isLoadingData={isLoadingNodos || isRefetchingNodos}
        // vaidation
        control={form.control}
        error={errors.nodo}
        helperText={errors.nodo?.message}
        size={gridSizeMdLg6}
      />
      <CustomAutocomplete<OLT>
        label="OLT"
        name="olt"
        // options
        options={oltsPagingRes?.data?.items || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().olt}
        isLoadingData={isLoadingOlts || isRefetchingOlts}
        // vaidation
        control={form.control}
        error={errors.olt}
        helperText={errors.olt?.message}
        size={gridSizeMdLg6}
      />
      <CustomTextArea
        label="Direccion"
        name="direccion"
        control={form.control}
        defaultValue={form.getValues().direccion}
        error={errors.direccion}
        helperText={errors.direccion?.message}
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
                      ? {
                          lat: latLng.lat,
                          lng: latLng.lng,
                        }
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

      <SampleCheckbox
        label="Estado"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        size={gridSizeMdLg6}
        isState
      />
      <SampleCheckbox
        label="Es soterrado"
        name="es_soterrado"
        control={form.control}
        defaultValue={form.getValues().es_soterrado}
        size={gridSizeMdLg6}
      />
    </SingleFormBoxScene>
  );
};

export default SaveNap;

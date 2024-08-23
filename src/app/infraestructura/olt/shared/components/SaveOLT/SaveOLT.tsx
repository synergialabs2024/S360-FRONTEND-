import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateOLTParamsBase,
  useCreateOLT,
  useFetchCiudades,
  useFetchNodos,
  useFetchPaises,
  useFetchProvincias,
  useFetchSectores,
  useFetchZonas,
  useUpdateOLT,
} from '@/actions/app';
import {
  CustomAutocomplete,
  CustomCoordsTextField,
  CustomPasswordTextField,
  CustomTextArea,
  CustomTextField,
  InputAndBtnGridSpace,
  MapModalComponent,
  SampleCheckbox,
  SingleFormBoxScene,
  SingleIconButton,
} from '@/shared/components';
import {
  gridSize,
  gridSizeMdLg1,
  gridSizeMdLg11,
  gridSizeMdLg6,
} from '@/shared/constants/ui';
import {
  Ciudad,
  Nodo,
  OLT,
  Pais,
  Provincia,
  Sector,
  Zona,
} from '@/shared/interfaces';
import { oLTFormSchema } from '@/shared/utils';
import { returnUrlOLTsPage } from '../../../pages/tables/OLTsPage';
import { MdEdit, MdEditLocationAlt } from 'react-icons/md';
import { Grid, Typography } from '@mui/material';
import { useCheckPermissionsArray } from '@/shared/hooks/auth';
import { SAVE_OLT_PERMISSIONS, ToastWrapper, useLoaders } from '@/shared';
import { useMapComponent } from '@/shared/hooks/ui/useMapComponent';
import { useLocationCoords } from '@/shared/hooks/ui/useLocationCoords';
import { useUiConfirmModalStore } from '@/store/ui';

export interface SaveOLTProps {
  title: string;
  olt?: OLT;
}

type SaveFormData = CreateOLTParamsBase & {
  isEdit: boolean; // yuo validation password
};

const SaveOLT: React.FC<SaveOLTProps> = ({ title, olt }) => {
  useCheckPermissionsArray(SAVE_OLT_PERMISSIONS);

  ///* local state -----------------
  const [openMapModal, setOpenMapModal] = useState(false);
  const [canWritePassword, setCanWritePassword] = useState<boolean>(true);

  ///* hooks
  const navigate = useNavigate();

  ///* global state ----------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(oLTFormSchema) as any,
    defaultValues: {
      isEdit: false,
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
  const watchedIsEdit = form.watch('isEdit');

  const { Map, latLng, setLatLng } = useMapComponent({
    form,
    initialCoords: olt?.id ? olt.coordenadas : watchedCoords,
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
    data: nodosPagingRes,
    isLoading: isLoadingNodos,
    isRefetching: isRefetchingNodos,
  } = useFetchNodos({
    enabled: !!watchedCiudad,
    params: {
      ciudad: watchedCiudad,
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
  const createOLTMutation = useCreateOLT({
    navigate,
    returnUrl: returnUrlOLTsPage,
    enableErrorNavigate: false,
  });
  const updateOLTMutation = useUpdateOLT<CreateOLTParamsBase>({
    navigate,
    returnUrl: returnUrlOLTsPage,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (olt?.id) {
      updateOLTMutation.mutate({ id: olt.id!, data });
      return;
    }

    ///* create
    createOLTMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!olt?.id) return;
    reset(olt);
    setCanWritePassword(false);
  }, [olt, reset]);

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
    if (isLoadingNodos || isRefetchingNodos || !watchedCiudad) return;
    !nodosPagingRes?.data?.items?.length &&
      ToastWrapper.error('No se encontraron nodos para la ciudad seleccionada');

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
    nodosPagingRes,
    zonasPagingRes,
    sectoresPagingRes,
    isLoadingProvincias,
    isLoadingCiudades,
    isLoadingNodos,
    isLoadingZonas,
    isLoadingSectores,
    isRefetchingProvincias,
    isRefetchingCiudades,
    isRefetchingZonas,
    isRefetchingNodos,
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
      onCancel={() => navigate(returnUrlOLTsPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomTextField
        label="Name"
        name="name"
        control={form.control}
        defaultValue={form.getValues().name}
        error={errors.name}
        helperText={errors.name?.message}
      />
      <CustomTextField
        label="Puerto"
        name="puerto"
        control={form.control}
        defaultValue={form.getValues().puerto}
        error={errors.puerto}
        helperText={errors.puerto?.message}
        size={gridSizeMdLg6}
      />
      <CustomTextField
        label="Hostname"
        name="hostname"
        control={form.control}
        defaultValue={form.getValues().hostname}
        error={errors.hostname}
        helperText={errors.hostname?.message}
        size={gridSizeMdLg6}
        ignoreTransform
      />
      <CustomTextField
        label="Pppoe"
        name="pppoe"
        control={form.control}
        defaultValue={form.getValues().pppoe}
        error={errors.pppoe}
        helperText={errors.pppoe?.message}
        size={gridSizeMdLg6}
        ignoreTransform
      />
      <CustomTextField
        label="Ip pppoe"
        name="ip_pppoe"
        control={form.control}
        defaultValue={form.getValues().ip_pppoe}
        error={errors.ip_pppoe}
        helperText={errors.ip_pppoe?.message}
        size={gridSizeMdLg6}
        ignoreTransform
      />
      <CustomTextField
        label="User"
        name="user"
        control={form.control}
        defaultValue={form.getValues().user}
        error={errors.user}
        helperText={errors.user?.message}
        size={gridSizeMdLg6}
        ignoreTransform
      />
      <InputAndBtnGridSpace
        inputNode={
          <CustomPasswordTextField
            label="Password"
            name="password"
            defaultValue={form.getValues().password}
            control={form.control}
            errors={errors?.password}
            helperText={errors?.password?.message}
            disabled={!canWritePassword}
          />
        }
        showIconBtn={watchedIsEdit}
        btnLabel="Cambiar Contraseña"
        iconBtn={<MdEdit />}
        onClick={() => {
          !canWritePassword &&
            setConfirmDialog({
              isOpen: true,
              title: 'Cambiar Contraseña',
              subtitle:
                '¿Está seguro que desea cambiar la contraseña de este usuario?',
              onConfirm: () => {
                setCanWritePassword(true);
                setConfirmDialogIsOpen(false);
              },
            });
        }}
      />

      <CustomTextField
        label="Direccion"
        name="direccion"
        control={form.control}
        defaultValue={form.getValues().direccion}
        error={errors.direccion}
        helperText={errors.direccion?.message}
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
      <CustomTextArea
        label="Descripcion"
        name="descripcion"
        control={form.control}
        defaultValue={form.getValues().descripcion}
        error={errors.descripcion}
        helperText={errors.descripcion?.message}
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

export default SaveOLT;

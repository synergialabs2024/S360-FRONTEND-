import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateRouterParamsBase,
  useCreateRouter,
  useFetchCiudades,
  useFetchNodos,
  useFetchOLTs,
  useFetchPaises,
  useFetchProvincias,
  useFetchSectores,
  useFetchZonas,
  useUpdateRouter,
} from '@/actions/app';
import {
  CustomAutocomplete,
  CustomAutocompleteArrString,
  CustomCoordsTextField,
  CustomNumberTextField,
  CustomPasswordTextField,
  CustomTextField,
  InputAndBtnGridSpace,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import {
  Ciudad,
  Nodo,
  OLT,
  Pais,
  Provincia,
  Router,
  Sector,
  Zona,
} from '@/shared/interfaces';
import { routerFormSchema } from '@/shared/utils';
import { returnUrlRoutersPage } from '../../../pages/tables/RoutersPage';
import { useCheckPermissionsArray } from '@/shared/hooks/auth';
import {
  ROUTER_ARRAY_CHOICES,
  SAVE_ROUTER_PERMISSIONS,
  ToastWrapper,
  useLoaders,
} from '@/shared';
import { useMapComponent } from '@/shared/hooks/ui/useMapComponent';
import { useLocationCoords } from '@/shared/hooks/ui/useLocationCoords';
import { MdEdit } from 'react-icons/md';
import { useUiConfirmModalStore } from '@/store/ui';

export interface SaveRouterProps {
  title: string;
  router?: Router;
}

type SaveFormData = CreateRouterParamsBase & {};

const SaveRouter: React.FC<SaveRouterProps> = ({ title, router }) => {
  useCheckPermissionsArray(SAVE_ROUTER_PERMISSIONS);

  ///* local state -----------------
  const [canWritePassword, setCanWritePassword] = useState<boolean>(true);

  ///* hooks -----------------------
  const navigate = useNavigate();

  ///* global state ----------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(routerFormSchema) as any,
    defaultValues: {
      state: true,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  const watchedPais = form.watch('pais');
  const watchedProvincia = form.watch('provincia');
  const watchedCiudad = form.watch('ciudad');
  const watchedZona = form.watch('zona');
  const watchedNodo = form.watch('nodo');

  const { Map, latLng, napsByCoords, setLatLng } = useMapComponent({
    form,
    initialCoords: router?.id ? router?.coordenadas : '',
  });
  useLocationCoords({
    isEditting: !!router?.id,
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
    enabled: !!watchedPais,
    params: {
      pais: watchedPais,
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
    data: nodosPagingRes,
    isLoading: isLoadingNodos,
    isRefetching: isRefetchingNodos,
  } = useFetchNodos({
    enabled: !!watchedCiudad,
    params: {
      page_size: 900,
      ciudad: watchedCiudad,
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

  ///* mutations
  const createRouterMutation = useCreateRouter({
    navigate,
    returnUrl: returnUrlRoutersPage,
    enableErrorNavigate: false,
  });
  const updateRouterMutation = useUpdateRouter<CreateRouterParamsBase>({
    navigate,
    returnUrl: returnUrlRoutersPage,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (router?.id) {
      updateRouterMutation.mutate({ id: router.id!, data });
      return;
    }

    ///* create
    createRouterMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!router?.id) return;
    reset(router);
  }, [router, reset]);
  // alerts
  useEffect(() => {
    if (isLoadingProvincias || isRefetchingProvincias || !watchedPais) return;
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
      ToastWrapper.error('No se encontraron sector para la zona seleccionada');
    if (isLoadingNodos || isRefetchingNodos || !watchedCiudad) return;
    !nodosPagingRes?.data?.items?.length &&
      ToastWrapper.error('No se encontraron nodos para la ciudad seleccionada');
    if (isLoadingOlts || isRefetchingOlts || !watchedNodo) return;
    !oltsPagingRes?.data?.items?.length &&
      ToastWrapper.error('No se encontraron olt para el nodo seleccionado');
  }, [
    watchedPais,
    watchedProvincia,
    watchedCiudad,
    watchedZona,
    watchedNodo,
    provinciasPagingRes,
    ciudadesPagingRes,
    zonasPagingRes,
    sectoresPagingRes,
    nodosPagingRes,
    oltsPagingRes,
    isLoadingProvincias,
    isLoadingCiudades,
    isLoadingZonas,
    isLoadingSectores,
    isLoadingNodos,
    isLoadingOlts,
    isRefetchingProvincias,
    isRefetchingCiudades,
    isRefetchingZonas,
    isRefetchingSectores,
    isRefetchingNodos,
    isRefetchingOlts,
  ]);

  const customLoader =
    isLoadingPaises ||
    isRefetchingPaises ||
    isLoadingProvincias ||
    isRefetchingProvincias ||
    isLoadingCiudades ||
    isRefetchingCiudades ||
    isLoadingZonas ||
    isRefetchingZonas ||
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
      onCancel={() => navigate(returnUrlRoutersPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomTextField
        label="Name"
        name="name"
        control={form.control}
        defaultValue={form.getValues().name}
        error={errors.name}
        helperText={errors.name?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Ip"
        name="ip"
        control={form.control}
        defaultValue={form.getValues().ip}
        error={errors.ip}
        helperText={errors.ip?.message}
        size={gridSizeMdLg6}
        ignoreTransform
      />
      <CustomTextField
        label="Username"
        name="username"
        control={form.control}
        defaultValue={form.getValues().username}
        error={errors.username}
        helperText={errors.username?.message}
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
        showIconBtn={!!router?.id}
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
        label="Usuario api"
        name="usuario_api"
        control={form.control}
        defaultValue={form.getValues().usuario_api}
        error={errors.usuario_api}
        helperText={errors.usuario_api?.message}
        size={gridSizeMdLg6}
        ignoreTransform
      />
      <CustomNumberTextField
        label="Puerto api"
        name="puerto_api"
        control={form.control}
        defaultValue={form.getValues().puerto_api}
        error={errors.puerto_api}
        helperText={errors.puerto_api?.message}
        size={gridSizeMdLg6}
        min={0}
      />
      <CustomTextField
        label="Clave api"
        name="clave_api"
        control={form.control}
        defaultValue={form.getValues().clave_api}
        error={errors.clave_api}
        helperText={errors.clave_api?.message}
        size={gridSizeMdLg6}
        ignoreTransform
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
      <CustomAutocompleteArrString
        label="Tipo router"
        name="tipo_router"
        control={form.control}
        defaultValue={form.getValues('tipo_router')}
        options={ROUTER_ARRAY_CHOICES}
        isLoadingData={false}
        error={errors.tipo_router}
        helperText={errors.tipo_router?.message}
        size={gridSizeMdLg6}
        disableClearable
      />
      <SampleCheckbox
        label="state"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        size={gridSizeMdLg6}
        isState
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
        error={errors.sector}
        helperText={errors.sector?.message}
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
      <CustomCoordsTextField
        label="Coordenadas"
        name="coordenadas"
        control={form.control}
        defaultValue={form.getValues().coordenadas}
        error={errors.coordenadas}
        helperText={errors.coordenadas?.message}
        onChangeValue={(value, isValidCoords) => {
          if (!isValidCoords) return;
          const s = value.split(',');
          setLatLng({ lat: s[0], lng: s[1] });
        }}
      />
      <Map
        coordenadas={latLng}
        setLatLng={setLatLng}
        showNaps
        naps={napsByCoords || []}
      />
    </SingleFormBoxScene>
  );
};

export default SaveRouter;

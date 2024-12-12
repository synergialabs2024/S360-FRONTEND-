/* eslint-disable indent */
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreatePrimaryNapParamsBase,
  useCreatePrimaryNap,
  useFetchCiudades,
  useFetchNodos,
  useFetchOLTs,
  useFetchPrimaryNapsPortPonOLT,
  useFetchRutas,
  useFetchSectores,
  useUpdatePrimaryNap,
} from '@/actions/app';
import {
  NAPS_PORTS_QUANTITY_ARRAY,
  SAVE_NAP_PRIMARY_PERMISSIONS,
  ToastWrapper,
  useLoaders,
} from '@/shared';
import {
  CustomAutocomplete,
  CustomCoordsTextField,
  CustomTextArea,
  CustomTextField,
  SampleCheckbox,
  SelectTextFieldArrayString,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { useCheckPermissionsArray } from '@/shared/hooks/auth';
import { useLocationCoords } from '@/shared/hooks/ui/useLocationCoords';
import { useMapComponent } from '@/shared/hooks/ui/useMapComponent';
import {
  Ciudad,
  Nodo,
  OLT,
  PrimaryNap,
  PrimaryNapPortPonOLT,
  Ruta,
  Sector,
} from '@/shared/interfaces';
import { primarynapFormSchema } from '@/shared/utils';
import { returnUrlPrimaryNapsPage } from '../../../pages/tables/PrimaryNapPage';

export interface SavePrimaryNapProps {
  title: string;
  primarynap?: PrimaryNap;
}

type SaveFormData = CreatePrimaryNapParamsBase & {
  isValidCoords?: boolean;
};

const SavePrimaryNap: React.FC<SavePrimaryNapProps> = ({
  title,
  primarynap,
}) => {
  useCheckPermissionsArray(SAVE_NAP_PRIMARY_PERMISSIONS);

  ///* hooks -----------------------
  const navigate = useNavigate();

  ///* form -----------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(primarynapFormSchema) as any,
    defaultValues: {
      state: true,
      es_soterrado: false,
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
  const watchedOlt = form.watch('olt');
  const watchedPP = form.watch('port_pon');

  console.log(watchedPP);

  const {
    Map,
    latLng,
    napsByCoords,
    isLoadingNaps,
    isRefetchingNaps,
    setLatLng,
  } = useMapComponent({
    form,
    initialCoords: primarynap?.id ? primarynap?.coordenadas : '',
    enableFetchNaps: true,
  });
  useLocationCoords({
    isEditting: !!primarynap?.id,
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
    params: {
      page_size: 900,
    },
  });
  const {
    data: oltsPagingRes,
    isLoading: isLoadingOLTs,
    isRefetching: isRefetchingOLTs,
  } = useFetchOLTs({
    enabled: !!watchedNodo,
    params: {
      page_size: 900,
      nodo: watchedNodo,
    },
  });
  const {
    data: primaryNapPPOsPagingRes,
    isLoading: isLoadingPrimaryNapPPOs,
    isRefetching: isRefetchingPrimaryNapPPOs,
  } = useFetchPrimaryNapsPortPonOLT({
    enabled: !!watchedOlt && !!watchedNodo,
    params: {
      olt_id: watchedOlt,
    },
  });

  const {
    data: rutasPagingRes,
    isLoading: isLoadingRutas,
    isRefetching: isRefetchingRutas,
  } = useFetchRutas({
    params: {
      page_size: 900,
    },
  });

  ///* mutations -----------------------
  const createPrimaryNapMutation = useCreatePrimaryNap({
    navigate,
    returnUrl: returnUrlPrimaryNapsPage,
    enableErrorNavigate: false,
  });
  const updatePrimaryNapMutation =
    useUpdatePrimaryNap<CreatePrimaryNapParamsBase>({
      navigate,
      returnUrl: returnUrlPrimaryNapsPage,
    });

  ///* handlers -----------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (primarynap?.id) {
      delete data.puertos;
      delete data.puertos_list;

      updatePrimaryNapMutation.mutate({
        id: primarynap.id!,
        data: {
          ...data,
        },
      });
      return;
    }

    ///* create
    createPrimaryNapMutation.mutate(data);
  };

  ///* effects -----------------------
  useEffect(() => {
    if (!primarynap?.id) return;
    reset(primarynap);
  }, [primarynap, reset]);

  // alets: not found province by country
  useEffect(() => {
    if (isLoadingSectores || isRefetchingSectores || !watchedCity) return;
    !sectoresPagingRes?.data?.items?.length &&
      ToastWrapper.error(
        'No se encontraron sectores para la ciudad seleccionada',
      );
    if (isLoadingNodos || isRefetchingNodos || !watchedCity) return;
    !nodosPagingRes?.data?.items?.length &&
      ToastWrapper.error('No se encontraron nodos para la ciudad seleccionada');
  }, [
    watchedCity,
    watchedSector,
    watchedNodo,
    sectoresPagingRes,
    nodosPagingRes,
    isLoadingSectores,
    isLoadingNodos,
    isRefetchingSectores,
    isRefetchingNodos,
  ]);

  const customLoader =
    isLoadingCities ||
    isRefetchingCities ||
    isLoadingSectores ||
    isRefetchingSectores ||
    isLoadingNodos ||
    isRefetchingNodos ||
    isLoadingNaps ||
    isRefetchingNaps;
  useLoaders(customLoader);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlPrimaryNapsPage)}
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
      <CustomTextField
        label="Proyecto cod"
        name="proyecto_cod"
        control={form.control}
        defaultValue={form.getValues().proyecto_cod}
        error={errors.proyecto_cod}
        helperText={errors.proyecto_cod?.message}
        size={gridSizeMdLg6}
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
        disabled={!!primarynap?.id}
        gridSize={gridSizeMdLg6}
      />
      <CustomTextField
        label="PODER MINIMO"
        name="minimum_power"
        control={form.control}
        defaultValue={form.getValues().minimum_power}
        error={errors.minimum_power}
        helperText={errors.minimum_power?.message}
        size={gridSizeMdLg6}
      />
      <CustomTextField
        label="PODER MAXIMO"
        name="maximum_power"
        control={form.control}
        defaultValue={form.getValues().maximum_power}
        error={errors.maximum_power}
        helperText={errors.maximum_power?.message}
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
        isLoadingData={isLoadingOLTs || isRefetchingOLTs}
        // vaidation
        control={form.control}
        error={errors.olt}
        helperText={errors.olt?.message}
        size={gridSizeMdLg6}
      />
      <CustomAutocomplete<PrimaryNapPortPonOLT>
        label="PUERTO PON"
        name="port_pon"
        // options
        options={(primaryNapPPOsPagingRes || []) as PrimaryNapPortPonOLT[]}
        valueKey="port_pont_location"
        actualValueKey="id"
        defaultValue={form.getValues().port_pon}
        isLoadingData={isLoadingPrimaryNapPPOs || isRefetchingPrimaryNapPPOs}
        // validation
        control={form.control}
        error={errors.port_pon}
        helperText={errors.port_pon?.message}
        size={gridSizeMdLg6}
      />

      <CustomAutocomplete<Ruta>
        label="Rutas"
        name="ruta"
        // options
        options={rutasPagingRes?.data?.items || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().ruta}
        isLoadingData={isLoadingRutas || isRefetchingRutas}
        // vaidation
        control={form.control}
        error={errors.ruta}
        helperText={errors.ruta?.message}
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

export default SavePrimaryNap;

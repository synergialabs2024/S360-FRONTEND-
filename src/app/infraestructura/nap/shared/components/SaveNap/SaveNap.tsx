/* eslint-disable indent */
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateNapParamsBase,
  useCreateNap,
  useFetchCiudades,
  useFetchNodos,
  useFetchOLTs,
  useFetchPrimaryNaps,
  useFetchSectores,
  useUpdateNap,
} from '@/actions/app';
import {
  NAP_STATUS_ARRAY_CHOICES,
  NAPS_PORTS_QUANTITY_ARRAY,
  NapStatusEnumChoice,
  PuertosListaModal,
  SAVE_NAP_PERMISSIONS,
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
import {
  gridSizeMdLg10,
  gridSizeMdLg12,
  gridSizeMdLg2,
  gridSizeMdLg6,
} from '@/shared/constants/ui';
import { useCheckPermissionsArray } from '@/shared/hooks/auth';
import { useLocationCoords } from '@/shared/hooks/ui/useLocationCoords';
import { useMapComponent } from '@/shared/hooks/ui/useMapComponent';
import {
  Ciudad,
  Nap,
  NapPortSecondPrimaryType,
  NapPortType,
  Nodo,
  OLT,
  PrimaryNap,
  Sector,
} from '@/shared/interfaces';
import { napFormSchema } from '@/shared/utils';
import { returnUrlNapsPage } from '../../../pages/tables/NapsPage';

export interface SaveNapProps {
  title: string;
  nap?: Nap;
}

type SaveFormData = CreateNapParamsBase & {
  isValidCoords?: boolean;
};

const SaveNap: React.FC<SaveNapProps> = ({ title, nap }) => {
  useCheckPermissionsArray(SAVE_NAP_PERMISSIONS);

  const [PuertoLists, setPuertoLists] = useState<NapPortSecondPrimaryType[]>(
    [],
  );

  ///* hooks -----------------------
  const navigate = useNavigate();

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
  const watchedPuertosList = form.watch('puertos_list');
  const watchedCity = form.watch('ciudad');
  const watchedSector = form.watch('sector');
  const watchedNodo = form.watch('nodo');
  const watchedPuertos = form.watch('puertos');

  const arrayPuertoNapSecondPrimary = [];

  // Generar el array dinámicamente
  for (let i = 0; i < (watchedPuertos ?? 0); i++) {
    arrayPuertoNapSecondPrimary.push({
      puerto: (i + 1).toString(),
      id: i + 1,
    });
  }

  const {
    Map,
    latLng,
    napsByCoords,
    isLoadingNaps,
    isRefetchingNaps,
    setLatLng,
  } = useMapComponent({
    form,
    initialCoords: nap?.id ? nap?.coordenadas : '',
    enableFetchNaps: true,
  });
  useLocationCoords({
    isEditting: !!nap?.id,
    form,
    setLatLng,
  });

  ///* fetch data -----------------------
  const {
    data: napPrimaryPagingRes,
    isLoading: isLoadingNapPrimary,
    isRefetching: isRefetchingNapPrimary,
  } = useFetchPrimaryNaps({
    params: {
      page_size: 900,
    },
  });

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
      data.puertos_list = PuertoLists.map(pl => ({
        puerto: String(pl.puerto),
        estado: pl.estado ?? false,
      })) as NapPortType[];

      updateNapMutation.mutate({
        id: nap.id!,
        data: {
          ...data,
        },
      });
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
    if (isLoadingNodos || isRefetchingNodos || !watchedCity) return;
    !nodosPagingRes?.data?.items?.length &&
      ToastWrapper.error('No se encontraron nodos para la ciudad seleccionada');
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
    isRefetchingOlts ||
    isLoadingNaps ||
    isRefetchingNaps;
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
      <CustomAutocomplete<PrimaryNap>
        label="Nap Primaria"
        name="nap_primaria"
        // options
        options={napPrimaryPagingRes?.data?.items || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().nap_primaria}
        isLoadingData={isLoadingNapPrimary || isRefetchingNapPrimary}
        // vaidation
        control={form.control}
        error={errors.nap_primaria}
        helperText={errors.nap_primaria?.message}
        size={gridSizeMdLg6}
        onChangeRawValue={row => {
          form.setValue('puerto_nap_primaria', undefined);
          form.setValue(
            'puertos_list',
            row.puertos_list
              ?.map(item => ({
                ...item,
                puerto: item.puerto.toString(),
              }))
              ?.filter(i => i.estado == false),
          );
          form.setValue('proyecto_cod', row.proyecto_cod as any);
          form.setValue('ciudad', row.ciudad as any);
          form.setValue('sector', row.sector as any);
          form.setValue('nodo', row.nodo as any);
          form.setValue('olt', row.olt as any);
          form.setValue('direccion', row.direccion as any);
          form.setValue('coordenadas', row.coordenadas as any);
          const s = row.coordenadas.split(',').map(Number);
          setLatLng({ lat: s[0], lng: s[1] });
        }}
      />
      <CustomAutocomplete<NapPortType>
        label="Puerto salida primaria"
        name="puerto_nap_primaria"
        options={watchedPuertosList || []}
        valueKey="puerto"
        actualValueKey="puerto"
        defaultValue={form.getValues().puerto_nap_primaria}
        isLoadingData={isLoadingNapPrimary || isRefetchingNapPrimary}
        control={form.control}
        error={errors.puerto_nap_primaria}
        helperText={errors.puerto_nap_primaria?.message}
        size={gridSizeMdLg6}
      />

      <SelectTextFieldArrayString
        label="Puertos"
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
        onChangeValue={() => {
          form.setValue('puerto_nap_secundaria_primaria', undefined);
        }}
      />

      <CustomAutocomplete<NapPortSecondPrimaryType>
        label="Puerto a conectar"
        name="puerto_nap_secundaria_primaria"
        options={arrayPuertoNapSecondPrimary || []}
        valueKey="puerto"
        actualValueKey="id"
        defaultValue={form.getValues().puerto_nap_secundaria_primaria}
        isLoadingData={isLoadingNapPrimary || isRefetchingNapPrimary}
        control={form.control}
        error={errors.puerto_nap_secundaria_primaria}
        helperText={errors.puerto_nap_secundaria_primaria?.message}
        size={gridSizeMdLg6}
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
        // validation
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
        size={nap ? gridSizeMdLg10 : gridSizeMdLg12}
      />
      {nap?.id && (
        <PuertosListaModal
          data={nap}
          size={gridSizeMdLg2}
          modalTitle={`Lista de puertos de ${nap?.name}`}
          onDataChange={e => {
            setPuertoLists(e);
          }}
        />
      )}
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

export default SaveNap;

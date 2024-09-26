import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateRadioBaseParamsBase,
  useCreateRadioBase,
  useFetchCiudades,
  useFetchPaises,
  useFetchProvincias,
  useFetchSectores,
  useFetchZonas,
  useUpdateRadioBase,
} from '@/actions/app';
import {
  Ciudad,
  gridSizeMdLg6,
  Pais,
  Provincia,
  RadioBase,
  radiobaseFormSchema,
  SAVE_RADIOBASE_PERMISSIONS,
  Sector,
  ToastWrapper,
  useLoaders,
  Zona,
} from '@/shared';
import { useCheckPermissionsArray } from '@/shared/hooks/auth';
import { returnUrlRadioBasesPage } from '../../../pages/tables/RadioBasesPage';
import {
  CustomAutocomplete,
  CustomCoordsTextField,
  CustomTextArea,
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { useMapComponent } from '@/shared/hooks/ui/useMapComponent';
import { useLocationCoords } from '@/shared/hooks/ui/useLocationCoords';

export interface SaveRadioBaseProps {
  title: string;
  radiobase?: RadioBase;
}

type SaveFormData = CreateRadioBaseParamsBase & {
  isValidCoords?: boolean;
};

const SaveNap: React.FC<SaveRadioBaseProps> = ({ title, radiobase }) => {
  useCheckPermissionsArray(SAVE_RADIOBASE_PERMISSIONS);

  ///* hooks -----------------------
  const navigate = useNavigate();

  ///* form -----------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(radiobaseFormSchema) as any,
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

  const { Map, latLng, setLatLng } = useMapComponent({
    form,
    initialCoords: radiobase?.id ? radiobase?.coordenadas : '',
  });
  useLocationCoords({
    isEditting: !!radiobase?.id,
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

  ///* mutations
  const createRadioBaseMutation = useCreateRadioBase({
    navigate,
    returnUrl: returnUrlRadioBasesPage,
    enableErrorNavigate: false,
  });
  const updateRadioBasesMutation =
    useUpdateRadioBase<CreateRadioBaseParamsBase>({
      navigate,
      returnUrl: returnUrlRadioBasesPage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (radiobase?.id) {
      updateRadioBasesMutation.mutate({ id: radiobase.id!, data });
      return;
    }

    ///* create
    createRadioBaseMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!radiobase?.id) return;
    reset(radiobase);
  }, [radiobase, reset]);
  // alets: not found province by country
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
  }, [
    watchedPais,
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
    isRefetchingSectores;
  useLoaders(customLoader);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlRadioBasesPage)}
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
      <CustomTextArea
        label="Codigo"
        name="codigo"
        control={form.control}
        defaultValue={form.getValues().codigo}
        error={errors.codigo}
        helperText={errors.codigo?.message}
        disabled={!!radiobase?.id}
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
      <SampleCheckbox
        label="Estado"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        size={gridSizeMdLg6}
        isState
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
        disabled={!!radiobase?.id}
      />
      {!radiobase?.id && <Map coordenadas={latLng} setLatLng={setLatLng} />}
    </SingleFormBoxScene>
  );
};

export default SaveNap;

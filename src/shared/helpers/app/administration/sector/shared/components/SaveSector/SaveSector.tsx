import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateSectorParams,
  useCreateSector,
  useFetchCiudades,
  useFetchPaises,
  useFetchProvincias,
  useFetchZonas,
  useUpdateSector,
} from '@/actions/app';
import {
  CustomAutocomplete,
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { SAVE_SECTOR_PERMISSIONS } from '@/shared/constants/app';
import { useCheckPermissionsArray } from '@/shared/hooks/auth';
import { Ciudad, Pais, Provincia, Sector, Zona } from '@/shared/interfaces';
import { sectorFormSchema } from '@/shared/utils/validation-schemas/app/administration/sector';
import { returnUrlSectoresPage } from '../../../pages/tables/SectoresPage';
import { ToastWrapper } from '@/shared/wrappers';
import { useLoaders } from '@/shared/hooks';
import { gridSizeMdLg6 } from '@/shared/constants/ui';

export interface SaveSectorProps {
  title: string;
  sector?: Sector;
}

type SaveFormData = CreateSectorParams & {};

const SaveSector: React.FC<SaveSectorProps> = ({ title, sector }) => {
  useCheckPermissionsArray(SAVE_SECTOR_PERMISSIONS);

  const navigate = useNavigate();

  const form = useForm<SaveFormData>({
    resolver: yupResolver(sectorFormSchema),
    defaultValues: {
      state: true,
      has_coverage: true,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;
  const watchedCountry = form.watch('pais');
  const watchedProvince = form.watch('provincia');
  const watchedCity = form.watch('ciudad');

  ///* fetch data
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
    data: zonasPagingRes,
    isLoading: isLoadingZonas,
    isRefetching: isRefetchingZonas,
  } = useFetchZonas({
    enabled: !!watchedCity,
    params: {
      ciudad: watchedCity,
      page_size: 2000,
    },
  });

  ///* mutations
  const createSectorMutation = useCreateSector({
    navigate,
    returnUrl: returnUrlSectoresPage,
    enableErrorNavigate: false,
  });
  const updateSectoresMutation = useUpdateSector<CreateSectorParams>({
    navigate,
    returnUrl: returnUrlSectoresPage,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (sector?.id) {
      updateSectoresMutation.mutate({ id: sector.id!, data });
      return;
    }

    ///* create
    createSectorMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!sector?.id) return;
    reset(sector);
  }, [sector, reset]);
  // alets: not found province by country
  useEffect(() => {
    if (isLoadingProvincias || isRefetchingProvincias || !watchedCountry)
      return;
    !provinciasPagingRes?.data?.items?.length &&
      ToastWrapper.error(
        'No se encontraron provincias para el país seleccionado',
      );

    if (isLoadingCiudades || isRefetchingCiudades || !watchedProvince) return;
    !ciudadesPagingRes?.data?.items?.length &&
      ToastWrapper.error(
        'No se encontraron ciudades para la provincia seleccionada',
      );

    if (isLoadingZonas || isRefetchingZonas || !watchedCity) return;
    !zonasPagingRes?.data?.items?.length &&
      ToastWrapper.error('No se encontraron zonas para la ciudad seleccionada');
  }, [
    watchedCountry,
    watchedProvince,
    watchedCity,
    provinciasPagingRes,
    ciudadesPagingRes,
    zonasPagingRes,
    isLoadingProvincias,
    isLoadingCiudades,
    isLoadingZonas,
    isRefetchingProvincias,
    isRefetchingCiudades,
    isRefetchingZonas,
  ]);

  useLoaders(
    isLoadingPaises ||
      isRefetchingPaises ||
      isLoadingProvincias ||
      isRefetchingProvincias ||
      isLoadingCiudades ||
      isRefetchingCiudades ||
      isLoadingZonas ||
      isRefetchingZonas,
  );
  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlSectoresPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomTextField
        label="Nombre"
        name="name"
        control={form.control}
        defaultValue={form.getValues().name}
        error={errors.name}
        helperText={errors.name?.message}
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

      <SampleCheckbox
        label="Tiene cobertura"
        name="has_coverage"
        control={form.control}
        defaultValue={form.getValues().has_coverage}
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
    </SingleFormBoxScene>
  );
};

export default SaveSector;

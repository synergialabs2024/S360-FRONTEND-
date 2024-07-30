import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateZonaParams,
  useCreateZona,
  useFetchCiudades,
  useFetchPaises,
  useFetchProvincias,
  useUpdateZona,
} from '@/actions/app';
import {
  CustomAutocomplete,
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { SAVE_ZONA_PERMISSIONS } from '@/shared/constants/app';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { useCheckPermissionsArray } from '@/shared/hooks/auth';
import { Zona } from '@/shared/interfaces/app/administration/zona';
import { zonaFormSchema } from '@/shared/utils';
import { returnUrlZonasPage } from '../../../pages/tables/ZonasPage';
import { ToastWrapper } from '@/shared/wrappers';
import { useLoaders } from '@/shared/hooks';
import { Ciudad, Pais, Provincia } from '@/shared/interfaces';

export interface SaveZonaProps {
  title: string;
  zona?: Zona;
}

type SaveFormData = CreateZonaParams & {};

const SaveZona: React.FC<SaveZonaProps> = ({ title, zona }) => {
  useCheckPermissionsArray(SAVE_ZONA_PERMISSIONS);

  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(zonaFormSchema),
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

  ///* mutations
  const createZonaMutation = useCreateZona({
    navigate,
    returnUrl: returnUrlZonasPage,
    enableErrorNavigate: false,
  });
  const updateZonasMutation = useUpdateZona<CreateZonaParams>({
    navigate,
    returnUrl: returnUrlZonasPage,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (zona?.id) {
      updateZonasMutation.mutate({ id: zona.id!, data });
      return;
    }

    ///* create
    createZonaMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!zona?.id) return;
    reset(zona);
  }, [zona, reset]);
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
  }, [
    watchedCountry,
    watchedProvince,
    provinciasPagingRes,
    ciudadesPagingRes,
    isLoadingProvincias,
    isLoadingCiudades,
    isRefetchingProvincias,
    isRefetchingCiudades,
  ]);

  useLoaders(
    isLoadingPaises ||
      isRefetchingPaises ||
      isLoadingProvincias ||
      isRefetchingProvincias ||
      isLoadingCiudades ||
      isRefetchingCiudades,
  );

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlZonasPage)}
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

export default SaveZona;

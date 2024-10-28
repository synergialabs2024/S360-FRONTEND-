import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateCiudadParams,
  useCreateCiudad,
  useFetchPaises,
  useFetchProvincias,
  useUpdateCiudad,
} from '@/actions/app';
import {
  CustomAutocomplete,
  CustomNumberTextField,
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { SAVE_CIUDAD_PERMISSIONS } from '@/shared/constants/app';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermissionsArray } from '@/shared/hooks/auth';
import { Ciudad, Pais, Provincia } from '@/shared/interfaces';
import { ciudadFormSchema, getKeysFormErrorsMessage } from '@/shared/utils';
import { ToastWrapper } from '@/shared/wrappers';
import { returnUrlCiudadesPage } from '../../../pages/tables/CiudadesPage';

export interface SaveCiudadProps {
  title: string;
  ciudad?: Ciudad;
}

type SaveFormData = CreateCiudadParams & {};

const SaveCiudad: React.FC<SaveCiudadProps> = ({ title, ciudad }) => {
  useCheckPermissionsArray(SAVE_CIUDAD_PERMISSIONS);

  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(ciudadFormSchema) as any,
    defaultValues: {
      state: true,
      has_coverage: false,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;
  const watchedCountry = form.watch('pais');
  const watchedHasCoverage = form.watch('has_coverage');

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

  ///* mutations
  const createCiudadMutation = useCreateCiudad({
    navigate,
    returnUrl: returnUrlCiudadesPage,
    enableErrorNavigate: false,
  });
  const updateCiudadMutation = useUpdateCiudad<CreateCiudadParams>({
    navigate,
    returnUrl: returnUrlCiudadesPage,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (ciudad?.id) {
      updateCiudadMutation.mutate({ id: ciudad.id!, data });
      return;
    }

    ///* create
    createCiudadMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!ciudad?.id) return;
    reset(ciudad);
  }, [ciudad, reset]);
  // alets: not found province by country
  useEffect(() => {
    if (isLoadingProvincias || isRefetchingProvincias || !watchedCountry)
      return;
    !provinciasPagingRes?.data?.items?.length &&
      ToastWrapper.error(
        'No se encontraron provincias para el país seleccionado',
      );
  }, [
    watchedCountry,
    provinciasPagingRes,
    isLoadingProvincias,
    isRefetchingProvincias,
  ]);

  useLoaders(
    isLoadingPaises ||
      isRefetchingPaises ||
      isLoadingProvincias ||
      isRefetchingProvincias,
  );

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlCiudadesPage)}
      onSave={handleSubmit(onSave, errors => {
        const keys = getKeysFormErrorsMessage(errors);
        ToastWrapper.error(`Campos requeridos: ${keys}`);
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

      <>
        {watchedHasCoverage && (
          <>
            <CustomNumberTextField
              label="Metraje autorizado"
              name="metraje_autorizado"
              control={form.control}
              defaultValue={form.getValues().metraje_autorizado}
              error={errors.metraje_autorizado}
              helperText={errors.metraje_autorizado?.message}
              size={gridSizeMdLg6}
              min={0}
              startAdornment="m"
            />
            <CustomNumberTextField
              label="Precio metraje excedido"
              name="precio_metraje_excedido"
              control={form.control}
              defaultValue={form.getValues().precio_metraje_excedido}
              error={errors.precio_metraje_excedido}
              helperText={errors.precio_metraje_excedido?.message}
              size={gridSizeMdLg6}
              customType="currency"
              min={0}
            />
          </>
        )}
      </>
    </SingleFormBoxScene>
  );
};

export default SaveCiudad;

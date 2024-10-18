import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateUbicacionParamsBase,
  useCreateUbicacion,
  useFetchBodegas,
  useUpdateUbicacion,
} from '@/actions/app';
import { ToastWrapper, useLoaders } from '@/shared';
import {
  CustomAutocomplete,
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { Bodega, Ubicacion } from '@/shared/interfaces';
import { getKeysFormErrorsMessage, ubicacionFormSchema } from '@/shared/utils';
import { returnUrlUbicacionsPage } from '../../../pages/tables/UbicacionsPage';

export interface SaveUbicacionProps {
  title: string;
  ubicacion?: Ubicacion;
}

type SaveFormData = CreateUbicacionParamsBase & {};

const SaveUbicacion: React.FC<SaveUbicacionProps> = ({ title, ubicacion }) => {
  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(ubicacionFormSchema) as any,
    defaultValues: {
      state: true,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* fetch data ---------------------
  const {
    data: bodegasPagingRes,
    isLoading: isLoadingBodegas,
    isRefetching: isRefetchingBodegas,
  } = useFetchBodegas({
    params: {
      page_size: 600,
    },
  });

  ///* mutations ---------------------
  const createUbicacionMutation = useCreateUbicacion({
    navigate,
    returnUrl: returnUrlUbicacionsPage,
    enableErrorNavigate: false,
  });
  const updateUbicacionMutation = useUpdateUbicacion<CreateUbicacionParamsBase>(
    {
      navigate,
      returnUrl: returnUrlUbicacionsPage,
    },
  );

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (ubicacion?.id) {
      updateUbicacionMutation.mutate({ id: ubicacion.id!, data });
      return;
    }

    ///* create
    createUbicacionMutation.mutate(data);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!ubicacion?.id) return;
    reset(ubicacion);
  }, [ubicacion, reset]);

  const isLoading = isLoadingBodegas || isRefetchingBodegas;
  useLoaders(isLoading);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlUbicacionsPage)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(
          `Faltan campos requeridos: ${getKeysFormErrorsMessage(errors)}`,
        );
      })}
    >
      <CustomTextField
        label="Nombre"
        name="nombre"
        control={form.control}
        defaultValue={form.getValues().nombre}
        error={errors.nombre}
        helperText={errors.nombre?.message}
      />

      <CustomAutocomplete<Bodega>
        label="Bodega"
        name="bodega"
        // options
        options={bodegasPagingRes?.data?.items || []}
        valueKey="nombre"
        actualValueKey="id"
        defaultValue={form.getValues().bodega}
        isLoadingData={isLoadingBodegas || isRefetchingBodegas}
        // vaidation
        control={form.control}
        error={errors.bodega}
        helperText={errors.bodega?.message}
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

export default SaveUbicacion;

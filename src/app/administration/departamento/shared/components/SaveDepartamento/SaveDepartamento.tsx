import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateDepartamentoParamsBase,
  useCreateDepartamento,
  useFetchAreas,
  useUpdateDepartamento,
} from '@/actions/app';
import { SAVE_DEPARTAMENTO_PERMISSIONS } from '@/shared';
import {
  CustomAutocomplete,
  CustomTextArea,
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { useLoaders } from '@/shared/hooks';
import { useCheckPermissionsArray } from '@/shared/hooks/auth';
import { Area, Departamento } from '@/shared/interfaces';
import { departamentoFormSchema } from '@/shared/utils';
import { returnUrlDepartamentosPage } from '../../../pages/tables/DepartamentosPage';

export interface SaveDepartamentoProps {
  title: string;
  departamento?: Departamento;
}

type SaveFormData = CreateDepartamentoParamsBase & {};

const SaveDepartamento: React.FC<SaveDepartamentoProps> = ({
  title,
  departamento,
}) => {
  useCheckPermissionsArray(SAVE_DEPARTAMENTO_PERMISSIONS);

  ///* hooks ----------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(departamentoFormSchema) as any,
    defaultValues: {
      state: true,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* fetch data
  const {
    data: areasPagingRes,
    isLoading: isLoadingAreas,
    isRefetching: isRefetchingAreas,
  } = useFetchAreas({
    params: {
      page_size: 600,
    },
  });

  ///* mutations
  const createDepartamentoMutation = useCreateDepartamento({
    navigate,
    returnUrl: returnUrlDepartamentosPage,
    enableErrorNavigate: false,
  });
  const updateDepartamentoMutation =
    useUpdateDepartamento<CreateDepartamentoParamsBase>({
      navigate,
      returnUrl: returnUrlDepartamentosPage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (departamento?.id) {
      updateDepartamentoMutation.mutate({ id: departamento.id!, data });
      return;
    }

    ///* create
    createDepartamentoMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!departamento?.id) return;
    reset(departamento);
  }, [departamento, reset]);
  const isCustomLoader = isLoadingAreas || isRefetchingAreas;
  useLoaders(isCustomLoader);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlDepartamentosPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomTextField
        label="Nombre"
        name="name"
        control={form.control}
        defaultValue={form.getValues().name}
        error={errors.name}
        helperText={errors.name?.message}
      />

      <CustomAutocomplete<Area>
        label="Area"
        name="area"
        // options
        options={areasPagingRes?.data?.items || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().area}
        isLoadingData={isLoadingAreas || isRefetchingAreas}
        // vaidation
        control={form.control}
        error={errors.area}
        helperText={errors.area?.message}
      />

      <CustomTextArea
        label="Descripción"
        name="description"
        control={form.control}
        defaultValue={form.getValues().description}
        error={errors.description}
        helperText={errors.description?.message}
        required={false}
      />

      <SampleCheckbox
        label="Estado"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        isState
      />
    </SingleFormBoxScene>
  );
};

export default SaveDepartamento;

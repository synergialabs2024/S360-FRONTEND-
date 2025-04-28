import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  useCreateArea,
  useUpdateArea,
  CreateAreaParams,
  useFetchCentroCostos,
} from '@/actions/app';
import {
  SampleCheckbox,
  CustomTextArea,
  CustomTextField,
  CustomAutocomplete,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared';
import { areaFormSchema } from '@/shared/utils';
import { Area, CentroCosto } from '@/shared/interfaces';
import { returnUrlAreasPage } from '../../../pages/tables/AreasPage';

export interface SaveAreaProps {
  title: string;
  area?: Area;
}

type SaveFormData = CreateAreaParams & {};

const SaveArea: React.FC<SaveAreaProps> = ({ title, area }) => {
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(areaFormSchema) as any,
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
    data: CentroCostoPagingRes,
    isLoading: isLoadingCentroCosto,
    isRefetching: isRefetchingCentroCosto,
  } = useFetchCentroCostos({
    params: {
      page_size: 1000,
    },
  });

  ///* mutations
  const createAreaMutation = useCreateArea({
    navigate,
    returnUrl: returnUrlAreasPage,
    enableErrorNavigate: false,
  });
  const updateAreaMutation = useUpdateArea<CreateAreaParams>({
    navigate,
    returnUrl: returnUrlAreasPage,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (area?.id) {
      updateAreaMutation.mutate({ id: area.id!, data });
      return;
    }

    ///* create
    createAreaMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!area?.id) return;
    reset(area);
  }, [area, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlAreasPage)}
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
      <CustomTextField
        label="Codigo"
        name="code"
        control={form.control}
        defaultValue={form.getValues().code}
        error={errors.code}
        helperText={errors.code?.message}
        size={gridSizeMdLg6}
        disabled={!!area?.id}
      />
      <CustomAutocomplete<CentroCosto>
        label="Centro Costo"
        name="centro_costo"
        // options
        options={CentroCostoPagingRes?.data?.items || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().centro_costo}
        isLoadingData={isLoadingCentroCosto || isRefetchingCentroCosto}
        // vaidation
        control={form.control}
        error={errors.centro_costo}
        helperText={errors.centro_costo?.message}
        size={gridSizeMdLg6}
      />
      <SampleCheckbox
        label="Estado"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        isState
        size={gridSizeMdLg6}
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
    </SingleFormBoxScene>
  );
};

export default SaveArea;

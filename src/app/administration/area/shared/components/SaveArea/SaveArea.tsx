import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { CreateAreaParams, useCreateArea, useUpdateArea } from '@/actions/app';
import {
  CustomTextArea,
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { Area } from '@/shared/interfaces';
import { areaFormSchema } from '@/shared/utils';
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

export default SaveArea;

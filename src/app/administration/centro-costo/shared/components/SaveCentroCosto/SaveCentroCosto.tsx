import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateCentroCostoParamsBase,
  useCreateCentroCosto,
  useUpdateCentroCosto,
} from '@/actions/app';
import {
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { CentroCosto } from '@/shared/interfaces';
import { centroCostoFormSchema } from '@/shared/utils';
import { returnUrlCentroCostosPage } from '../../../pages/tables/CentroCostosPage';

export interface SaveCentroCostoProps {
  title: string;
  centroCosto?: CentroCosto;
}

type SaveFormData = CreateCentroCostoParamsBase & {};

const SaveCentroCosto: React.FC<SaveCentroCostoProps> = ({
  title,
  centroCosto,
}) => {
  ///* hooks ---------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(centroCostoFormSchema) as any,
    defaultValues: {
      state: true,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* mutations
  const createCentroCostoMutation = useCreateCentroCosto({
    navigate,
    returnUrl: returnUrlCentroCostosPage,
    enableErrorNavigate: false,
  });
  const updateCentroCostoMutation =
    useUpdateCentroCosto<CreateCentroCostoParamsBase>({
      navigate,
      returnUrl: returnUrlCentroCostosPage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (centroCosto?.id) {
      updateCentroCostoMutation.mutate({ id: centroCosto.id!, data });
      return;
    }

    ///* create
    createCentroCostoMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!centroCosto?.id) return;
    reset(centroCosto);
  }, [centroCosto, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlCentroCostosPage)}
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
      <CustomTextField
        label="Codigo"
        name="codigo"
        control={form.control}
        defaultValue={form.getValues().codigo}
        error={errors.codigo}
        helperText={errors.codigo?.message}
        size={gridSizeMdLg6}
        disabled={!!centroCosto?.id}
      />
      <SampleCheckbox
        label="state"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        isState
        size={gridSizeMdLg6}
      />
    </SingleFormBoxScene>
  );
};

export default SaveCentroCosto;

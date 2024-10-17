import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateTraficoParamsBase,
  useCreateTrafico,
  useUpdateTrafico,
} from '@/actions/app';
import {
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { Trafico } from '@/shared/interfaces';
import { traficoFormSchema } from '@/shared/utils';
import { returnUrlTraficosPage } from '../../../pages/tables/TraficosPage';

export interface SaveTraficoProps {
  title: string;
  trafico?: Trafico;
}

type SaveFormData = CreateTraficoParamsBase & {};

const SaveTrafico: React.FC<SaveTraficoProps> = ({ title, trafico }) => {
  ///* hooks ---------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(traficoFormSchema) as any,
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
  const createTraficoMutation = useCreateTrafico({
    navigate,
    returnUrl: returnUrlTraficosPage,
    enableErrorNavigate: false,
  });
  const updateTraficoMutation = useUpdateTrafico<CreateTraficoParamsBase>({
    navigate,
    returnUrl: returnUrlTraficosPage,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (trafico?.id) {
      updateTraficoMutation.mutate({ id: trafico.id!, data });
      return;
    }

    ///* create
    createTraficoMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!trafico?.id) return;
    reset(trafico);
  }, [trafico, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlTraficosPage)}
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

export default SaveTrafico;

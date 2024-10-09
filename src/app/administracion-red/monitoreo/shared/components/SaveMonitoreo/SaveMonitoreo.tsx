import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateMonitoreoParamsBase,
  useCreateMonitoreo,
  useUpdateMonitoreo,
} from '@/actions/app';
import {
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { Monitoreo } from '@/shared/interfaces';
import { monitoreoFormSchema } from '@/shared/utils';
import { returnUrlMonitoreosPage } from '../../../pages/tables/MonitoreosPage';

export interface SaveMonitoreoProps {
  title: string;
  monitoreo?: Monitoreo;
}

type SaveFormData = CreateMonitoreoParamsBase & {};

const SaveMonitoreo: React.FC<SaveMonitoreoProps> = ({ title, monitoreo }) => {
  ///* hooks ---------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(monitoreoFormSchema) as any,
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
  const createMonitoreoMutation = useCreateMonitoreo({
    navigate,
    returnUrl: returnUrlMonitoreosPage,
    enableErrorNavigate: false,
  });
  const updateMonitoreoMutation = useUpdateMonitoreo<CreateMonitoreoParamsBase>(
    {
      navigate,
      returnUrl: returnUrlMonitoreosPage,
    },
  );

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (monitoreo?.id) {
      updateMonitoreoMutation.mutate({ id: monitoreo.id!, data });
      return;
    }

    ///* create
    createMonitoreoMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!monitoreo?.id) return;
    reset(monitoreo);
  }, [monitoreo, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlMonitoreosPage)}
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

export default SaveMonitoreo;

import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateAutorizacionOnuParamsBase,
  useCreateAutorizacionOnu,
  useUpdateAutorizacionOnu,
} from '@/actions/app';
import {
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { autorizacionOnusFormSchema } from '@/shared/utils';
import { AutorizacionOnu } from '@/shared';
import { returnUrlAutorizacionOnusPage } from '../../../pages/tables/AutorizacionOnusPage';

export interface SaveAutorizacionOnusProps {
  title: string;
  autorizacionOnu?: AutorizacionOnu;
}

type SaveFormData = CreateAutorizacionOnuParamsBase & {};

const SaveAutorizacionOnus: React.FC<SaveAutorizacionOnusProps> = ({
  title,
  autorizacionOnu,
}) => {
  ///* hooks ---------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(autorizacionOnusFormSchema) as any,
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
  const createAutorizacionOnuMutation = useCreateAutorizacionOnu({
    navigate,
    returnUrl: returnUrlAutorizacionOnusPage,
    enableErrorNavigate: false,
  });
  const updateAutorizacionOnuMutation =
    useUpdateAutorizacionOnu<CreateAutorizacionOnuParamsBase>({
      navigate,
      returnUrl: returnUrlAutorizacionOnusPage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (autorizacionOnu?.id) {
      updateAutorizacionOnuMutation.mutate({ id: autorizacionOnu.id!, data });
      return;
    }

    ///* create
    createAutorizacionOnuMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!autorizacionOnu?.id) return;
    reset(autorizacionOnu);
  }, [autorizacionOnu, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlAutorizacionOnusPage)}
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

export default SaveAutorizacionOnus;

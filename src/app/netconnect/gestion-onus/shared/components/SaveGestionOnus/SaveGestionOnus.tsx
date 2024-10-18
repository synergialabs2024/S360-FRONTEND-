import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateGestionOnuParamsBase,
  useCreateGestionOnu,
  useUpdateGestionOnu,
} from '@/actions/app';
import {
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { gestionOnusFormSchema } from '@/shared/utils';
import { GestionOnu } from '@/shared';
import { returnUrlGestionOnusPage } from '../../../pages/tables/GestionOnusPage';

export interface SaveGestionOnusProps {
  title: string;
  gestionOnu?: GestionOnu;
}

type SaveFormData = CreateGestionOnuParamsBase & {};

const SaveGestionOnus: React.FC<SaveGestionOnusProps> = ({
  title,
  gestionOnu,
}) => {
  ///* hooks ---------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(gestionOnusFormSchema) as any,
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
  const createGestionOnuMutation = useCreateGestionOnu({
    navigate,
    returnUrl: returnUrlGestionOnusPage,
    enableErrorNavigate: false,
  });
  const updateGestionOnuMutation =
    useUpdateGestionOnu<CreateGestionOnuParamsBase>({
      navigate,
      returnUrl: returnUrlGestionOnusPage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (gestionOnu?.id) {
      updateGestionOnuMutation.mutate({ id: gestionOnu.id!, data });
      return;
    }

    ///* create
    createGestionOnuMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!gestionOnu?.id) return;
    reset(gestionOnu);
  }, [gestionOnu, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlGestionOnusPage)}
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

export default SaveGestionOnus;

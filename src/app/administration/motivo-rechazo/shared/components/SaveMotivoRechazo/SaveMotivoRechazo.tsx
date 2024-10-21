import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateMotivoRechazoParamsBase,
  useCreateMotivoRechazo,
  useUpdateMotivoRechazo,
} from '@/actions/app';
import { MOTIVO_RECHAZO_MODULO_ARRAY_CHOICES, ToastWrapper } from '@/shared';
import {
  CustomTextArea,
  CustomTextField,
  SampleCheckbox,
  SelectArrayString,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { MotivoRechazo } from '@/shared/interfaces';
import {
  getKeysFormErrorsMessage,
  motivoRechazoFormSchema,
} from '@/shared/utils';
import { returnUrlMotivosRechazoPage } from '../../../pages/tables/MotivosRechazoPage';

export interface SaveMotivoRechazoProps {
  title: string;
  motivorechazo?: MotivoRechazo;
}

type SaveFormData = CreateMotivoRechazoParamsBase & {};

const SaveMotivoRechazo: React.FC<SaveMotivoRechazoProps> = ({
  title,
  motivorechazo,
}) => {
  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(motivoRechazoFormSchema) as any,
    defaultValues: {
      state: true,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* mutations ---------------------
  const createMotivoRechazoMutation = useCreateMotivoRechazo({
    navigate,
    returnUrl: returnUrlMotivosRechazoPage,
    enableErrorNavigate: false,
  });
  const updateMotivoRechazoMutation =
    useUpdateMotivoRechazo<CreateMotivoRechazoParamsBase>({
      navigate,
      returnUrl: returnUrlMotivosRechazoPage,
    });

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (motivorechazo?.id) {
      updateMotivoRechazoMutation.mutate({ id: motivorechazo.id!, data });
      return;
    }

    ///* create
    createMotivoRechazoMutation.mutate(data);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!motivorechazo?.id) return;
    reset(motivorechazo);
  }, [motivorechazo, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlMotivosRechazoPage)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(
          `Faltan campos requeridos: ${getKeysFormErrorsMessage(errors)}`,
        );
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
      <CustomTextArea
        label="Description"
        name="description"
        control={form.control}
        defaultValue={form.getValues().description}
        error={errors.description}
        helperText={errors.description?.message}
      />

      <SelectArrayString
        label="Módulo"
        name="modulo"
        control={form.control}
        defaultValue={form.getValues('modulo')}
        options={MOTIVO_RECHAZO_MODULO_ARRAY_CHOICES}
      />

      <SampleCheckbox
        label="state"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        size={gridSizeMdLg6}
        isState
      />
    </SingleFormBoxScene>
  );
};

export default SaveMotivoRechazo;

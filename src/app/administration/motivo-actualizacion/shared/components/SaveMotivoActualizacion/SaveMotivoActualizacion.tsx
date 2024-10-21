import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateMotivoActualizacionParamsBase,
  useCreateMotivoActualizacion,
  useUpdateMotivoActualizacion,
} from '@/actions/app';
import {
  MOTIVO_ACTUALIZACION_MODULO_ARRAY_CHOICES,
  ToastWrapper,
} from '@/shared';
import {
  CustomTextArea,
  CustomTextField,
  SampleCheckbox,
  SelectArrayString,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { MotivoActualizacion } from '@/shared/interfaces';
import {
  getKeysFormErrorsMessage,
  motivoActualizacionFormSchema,
} from '@/shared/utils';
import { returnUrlMotivosActualizacionPage } from '../../../pages/tables/MotivosActualizacionPage';

export interface SaveMotivoActualizacionProps {
  title: string;
  motivoactualizacion?: MotivoActualizacion;
}

type SaveFormData = CreateMotivoActualizacionParamsBase & {};

const SaveMotivoActualizacion: React.FC<SaveMotivoActualizacionProps> = ({
  title,
  motivoactualizacion,
}) => {
  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(motivoActualizacionFormSchema) as any,
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
  const createMotivoActualizacionMutation = useCreateMotivoActualizacion({
    navigate,
    returnUrl: returnUrlMotivosActualizacionPage,
    enableErrorNavigate: false,
  });
  const updateMotivoActualizacionMutation =
    useUpdateMotivoActualizacion<CreateMotivoActualizacionParamsBase>({
      navigate,
      returnUrl: returnUrlMotivosActualizacionPage,
    });

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (motivoactualizacion?.id) {
      updateMotivoActualizacionMutation.mutate({
        id: motivoactualizacion.id!,
        data,
      });
      return;
    }

    ///* create
    createMotivoActualizacionMutation.mutate(data);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!motivoactualizacion?.id) return;
    reset(motivoactualizacion);
  }, [motivoactualizacion, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlMotivosActualizacionPage)}
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
        label="Descripción"
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
        options={MOTIVO_ACTUALIZACION_MODULO_ARRAY_CHOICES}
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

export default SaveMotivoActualizacion;

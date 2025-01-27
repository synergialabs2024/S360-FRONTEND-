import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CustomNumberTextField,
  CustomTextField,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { ToastWrapper } from '@/shared';
import { MotivoRubroAdicional } from '@/shared/interfaces';
import {
  motivoRubroAdicionalFormSchema,
  getKeysFormErrorsMessage,
} from '@/shared/utils';
import {
  useCreateMotivoRubroAdicional,
  useUpdateMotivoRubroAdicional,
  CreateMotivoRubroAdicionalParamsBase,
} from '@/actions/app';
import { returnUrlMotivosRubroAdicionalPage } from '../../../pages';

export interface SaveMotivoRubroAdicionalProps {
  title: string;
  motivorubroadicional?: MotivoRubroAdicional;
}

type SaveFormData = CreateMotivoRubroAdicionalParamsBase & {};

const SaveMotivoRubroAdicional: React.FC<SaveMotivoRubroAdicionalProps> = ({
  title,
  motivorubroadicional,
}) => {
  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(motivoRubroAdicionalFormSchema) as any,
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
  const createMotivoRubroAdicionalMutation = useCreateMotivoRubroAdicional({
    navigate,
    returnUrl: returnUrlMotivosRubroAdicionalPage,
    enableErrorNavigate: false,
  });
  const updateMotivoRubroAdicionalMutation =
    useUpdateMotivoRubroAdicional<CreateMotivoRubroAdicionalParamsBase>({
      navigate,
      returnUrl: returnUrlMotivosRubroAdicionalPage,
    });

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (motivorubroadicional?.id) {
      updateMotivoRubroAdicionalMutation.mutate({
        id: motivorubroadicional.id!,
        data,
      });
      return;
    }

    ///* create
    createMotivoRubroAdicionalMutation.mutate(data);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!motivorubroadicional?.id) return;
    reset(motivorubroadicional);
  }, [motivorubroadicional, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlMotivosRubroAdicionalPage)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(
          `Faltan campos requeridos: ${getKeysFormErrorsMessage(errors)}`,
        );
      })}
    >
      <CustomNumberTextField
        label="Id"
        name="id"
        control={form.control}
        defaultValue={form.getValues().id}
        error={errors.id}
        helperText={errors.id?.message}
        size={gridSizeMdLg6}
        min={0}
      />

      <CustomTextField
        label="Uuid"
        name="uuid"
        control={form.control}
        defaultValue={form.getValues().uuid}
        error={errors.uuid}
        helperText={errors.uuid?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Nombre"
        name="nombre"
        control={form.control}
        defaultValue={form.getValues().nombre}
        error={errors.nombre}
        helperText={errors.nombre?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Código"
        name="codigo"
        control={form.control}
        defaultValue={form.getValues().codigo}
        error={errors.codigo}
        helperText={errors.codigo?.message}
        size={gridSizeMdLg6}
        defaultHelperText="El código debe ser único"
        // TODO: revisar
        disabled={!!motivorubroadicional?.false}
      />

      <CustomTextField
        label="Valor"
        name="valor"
        control={form.control}
        defaultValue={form.getValues().valor}
        error={errors.valor}
        helperText={errors.valor?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Descripcion"
        name="descripcion"
        control={form.control}
        defaultValue={form.getValues().descripcion}
        error={errors.descripcion}
        helperText={errors.descripcion?.message}
        size={gridSizeMdLg6}
      />
    </SingleFormBoxScene>
  );
};

export default SaveMotivoRubroAdicional;

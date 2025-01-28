import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateMotivoRubroAdicionalParamsBase,
  useCreateMotivoRubroAdicional,
  useUpdateMotivoRubroAdicional,
} from '@/actions/app';
import { ToastWrapper } from '@/shared';
import {
  CustomNumberTextField,
  CustomTextArea,
  CustomTextField,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { MotivoRubroAdicional } from '@/shared/interfaces';
import {
  getKeysFormErrorsMessage,
  motivoRubroAdicionalFormSchema,
} from '@/shared/utils';
import { returnUrlMotivosRubroAdicionalPage } from '../../../pages/tables/MotivosRubroAdicionalPage';

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
      <CustomTextField
        label="Nombre"
        name="nombre"
        control={form.control}
        defaultValue={form.getValues().nombre}
        error={errors.nombre}
        helperText={errors.nombre?.message}
      />
      <CustomTextField
        label="Código"
        name="codigo"
        control={form.control}
        defaultValue={form.getValues().codigo}
        error={errors.codigo}
        helperText={errors.codigo?.message}
        defaultHelperText="El código debe ser único"
        disabled={!!motivorubroadicional?.id}
      />

      <CustomNumberTextField
        label="Valor"
        name="valor"
        control={form.control}
        defaultValue={form.getValues().valor}
        error={errors.valor}
        helperText={errors.valor?.message}
        size={gridSizeMdLg6}
      />

      <CustomTextArea
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

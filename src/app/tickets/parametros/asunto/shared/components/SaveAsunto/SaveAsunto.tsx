import {
  CreateAsuntoParamsBase,
  useCreateAsunto,
  useUpdateAsunto,
} from '@/actions/app/tickets/parametros/asunto/asunto.actions';
import { Asunto } from '@/shared/interfaces/app/ticket';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { returnUrlAsuntosPage } from '../../../pages/tables/AsuntosPage';
import { getKeysFormErrorsMessage, ToastWrapper } from '@/shared';
import { useEffect } from 'react';
import {
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { asuntoFormSchema } from '@/shared/utils/validation-schemas/app/tickets/parametros/asunto/asunto.schema';

export type SaveAsuntoProps = {
  title: string;
  asunto?: Asunto;
};

type SaveFormData = CreateAsuntoParamsBase & {};

const SaveAsunto: React.FC<SaveAsuntoProps> = ({ title, asunto }) => {
  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(asuntoFormSchema) as any,
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
  const createUbicacionMutation = useCreateAsunto({
    navigate,
    returnUrl: returnUrlAsuntosPage,
    enableErrorNavigate: false,
  });
  const updateUbicacionMutation = useUpdateAsunto<CreateAsuntoParamsBase>({
    navigate,
    returnUrl: returnUrlAsuntosPage,
  });

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (asunto?.id) {
      updateUbicacionMutation.mutate({ id: asunto.id!, data });
      return;
    }

    ///* create
    createUbicacionMutation.mutate(data);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!asunto?.id) return;
    reset(asunto);
  }, [asunto, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlAsuntosPage)}
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

      <CustomTextField
        label="Valor a cobrar"
        name="valor_cobrar"
        control={form.control}
        defaultValue={(form.getValues().valor_cobrar ?? '').toString()}
        error={errors.valor_cobrar}
        helperText={errors.valor_cobrar?.message}
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

export default SaveAsunto;

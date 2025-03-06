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
import {
  getKeysFormErrorsMessage,
  gridSizeMdLg6,
  TIPO_TICKET_ASUNTO_ARRAY_CHOICES,
  ToastWrapper,
} from '@/shared';
import { useEffect } from 'react';
import {
  CustomAutocompleteArrString,
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
  const createAsuntoMutation = useCreateAsunto({
    navigate,
    returnUrl: returnUrlAsuntosPage,
    enableErrorNavigate: false,
  });
  const updateAsuntoMutation = useUpdateAsunto<CreateAsuntoParamsBase>({
    navigate,
    returnUrl: returnUrlAsuntosPage,
  });

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (asunto?.id) {
      updateAsuntoMutation.mutate({ id: asunto.id!, data });
      return;
    }

    ///* create
    createAsuntoMutation.mutate(data);
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
        size={gridSizeMdLg6}
      />

      <CustomTextField
        label="Valor a cobrar"
        name="valor_cobrar"
        control={form.control}
        defaultValue={(form.getValues().valor_cobrar ?? '').toString()}
        error={errors.valor_cobrar}
        helperText={errors.valor_cobrar?.message}
        size={gridSizeMdLg6}
      />
      <CustomAutocompleteArrString
        label="Tipo Ticket"
        name="tipo_ticket"
        control={form.control}
        defaultValue={form.getValues('tipo_ticket')}
        options={TIPO_TICKET_ASUNTO_ARRAY_CHOICES}
        isLoadingData={false}
        error={errors.tipo_ticket}
        helperText={errors.tipo_ticket?.message}
        size={gridSizeMdLg6}
        disableClearable
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

export default SaveAsunto;

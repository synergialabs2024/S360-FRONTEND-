import { Origen } from '@/shared/interfaces/app/ticket';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { getKeysFormErrorsMessage, ToastWrapper } from '@/shared';
import { useEffect } from 'react';
import {
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import {
  CreateOrigenParamsBase,
  useCreateOrigen,
  useUpdateOrigen,
} from '@/actions/app/tickets';
import { origenFormSchema } from '@/shared/utils/validation-schemas/app/tickets';
import { returnUrlOrigenesPage } from '../../../pages/tables/OrigenesPage';

export type SaveOrigenProps = {
  title: string;
  origen?: Origen;
};

type SaveFormData = CreateOrigenParamsBase & {};

const SaveOrigen: React.FC<SaveOrigenProps> = ({ title, origen }) => {
  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(origenFormSchema) as any,
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
  const createOrigenMutation = useCreateOrigen({
    navigate,
    returnUrl: returnUrlOrigenesPage,
    enableErrorNavigate: false,
  });
  const updateOrigenMutation = useUpdateOrigen<CreateOrigenParamsBase>({
    navigate,
    returnUrl: returnUrlOrigenesPage,
  });

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (origen?.id) {
      updateOrigenMutation.mutate({ id: origen.id!, data });
      return;
    }

    ///* create
    createOrigenMutation.mutate(data);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!origen?.id) return;
    reset(origen);
  }, [origen, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlOrigenesPage)}
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

export default SaveOrigen;

import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import {
  CustomTextArea,
  SampleCheckbox,
  CustomTextField,
  SingleFormBoxScene,
} from '@/shared/components';
import {
  gridSizeMdLg6,
  PermissionsEnum,
  MensajeriaTicketMasivo,
  mensajeriaTicketMasivoFormSchema,
} from '@/shared';
import {
  useCreateMensajeriaTicketMasivo,
  useUpdateMensajeriaTicketMasivo,
  CreateMensajeriaTicketMasivoParamsBase,
} from '@/actions/app';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCheckPermission } from '@/shared/hooks/auth';
import { returnUrlMensajeriaTicketMasivoPage } from '../../../pages/tables/MensajeriaTicketMasivoPage';

export interface SaveMensajeriaTicketMasivoProps {
  title: string;
  mensajeriaTM?: MensajeriaTicketMasivo;
}

type SaveFormData = CreateMensajeriaTicketMasivoParamsBase & {};

const SaveMensajeriaTicketMasivo: React.FC<SaveMensajeriaTicketMasivoProps> = ({
  title,
  mensajeriaTM,
}) => {
  useCheckPermission(PermissionsEnum.tecnico_view_mensajeriaticketmasivo);

  ///* hooks -----------------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(mensajeriaTicketMasivoFormSchema) as any,
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
  const createMensajeriaTMMutation = useCreateMensajeriaTicketMasivo({
    navigate,
    returnUrl: returnUrlMensajeriaTicketMasivoPage,
    enableErrorNavigate: false,
  });
  const updateMensajeriaTMMutation =
    useUpdateMensajeriaTicketMasivo<CreateMensajeriaTicketMasivoParamsBase>({
      navigate,
      returnUrl: returnUrlMensajeriaTicketMasivoPage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (mensajeriaTM?.id) {
      updateMensajeriaTMMutation.mutate({ id: mensajeriaTM.id!, data });
      return;
    }

    ///* create
    createMensajeriaTMMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!mensajeriaTM?.id) return;
    reset(mensajeriaTM);
  }, [mensajeriaTM, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlMensajeriaTicketMasivoPage)}
      onSave={handleSubmit(onSave, () => {})}
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
      <SampleCheckbox
        label="state"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        isState
        size={gridSizeMdLg6}
      />
      <CustomTextArea
        label="Descripción"
        name="description"
        control={form.control}
        defaultValue={form.getValues().description}
        error={errors.description}
        helperText={errors.description?.message}
        required={false}
      />
    </SingleFormBoxScene>
  );
};

export default SaveMensajeriaTicketMasivo;

import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import {
  gridSizeMdLg6,
  PermissionsEnum,
  MensajeriaTM,
  mensajeriaTMFormSchema,
} from '@/shared';
import {
  CustomTextArea,
  SampleCheckbox,
  CustomTextField,
  SingleFormBoxScene,
} from '@/shared/components';
import {
  useCreateMensajeriaTM,
  useUpdateMensajeriaTM,
  CreateMensajeriaTMParamsBase,
} from '@/actions/app';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCheckPermission } from '@/shared/hooks/auth';
import { returnUrlMensajeriaTMPage } from '../../../pages/tables/MensajeriaTMPage';

export interface SaveMensajeriaTMProps {
  title: string;
  mensajeriaTM?: MensajeriaTM;
}

type SaveFormData = CreateMensajeriaTMParamsBase & {};

const SaveMensajeriaTM: React.FC<SaveMensajeriaTMProps> = ({
  title,
  mensajeriaTM,
}) => {
  useCheckPermission(PermissionsEnum.tecnico_view_mensajeriaticketmasivo);

  ///* hooks -----------------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(mensajeriaTMFormSchema) as any,
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
  const createMensajeriaTMMutation = useCreateMensajeriaTM({
    navigate,
    returnUrl: returnUrlMensajeriaTMPage,
    enableErrorNavigate: false,
  });
  const updateMensajeriaTMMutation =
    useUpdateMensajeriaTM<CreateMensajeriaTMParamsBase>({
      navigate,
      returnUrl: returnUrlMensajeriaTMPage,
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
      onCancel={() => navigate(returnUrlMensajeriaTMPage)}
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

export default SaveMensajeriaTM;

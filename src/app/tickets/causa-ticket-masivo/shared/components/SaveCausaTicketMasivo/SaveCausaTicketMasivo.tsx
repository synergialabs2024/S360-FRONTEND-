import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import {
  CustomTextArea,
  SampleCheckbox,
  CustomTextField,
  SingleFormBoxScene,
  CustomAutocompleteArrString,
} from '@/shared/components';
import {
  useCreateCausaTicketMasivo,
  useUpdateCausaTicketMasivo,
  CreateCausaTicketMasivoParamsBase,
} from '@/actions/app';
import {
  gridSizeMdLg6,
  PermissionsEnum,
  CausaTicketMasivo,
  causaTicketMasivoFormSchema,
  TIPO_CAUSA_TICKET_MASIVO_ARRAY_CHOICES,
} from '@/shared';
import { useCheckPermission } from '@/shared/hooks/auth';
import { returnUrlCausaTicketMasivoPage } from '../../../pages/tables/CausaTicketMasivoPage';

export interface SaveCausaTicketMasivoProps {
  title: string;
  causaTM?: CausaTicketMasivo;
}

type SaveFormData = CreateCausaTicketMasivoParamsBase & {};

const SaveCausaTicketMasivo: React.FC<SaveCausaTicketMasivoProps> = ({
  title,
  causaTM,
}) => {
  useCheckPermission(PermissionsEnum.tecnico_view_causaticketmasivo);

  ///* hooks -----------------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(causaTicketMasivoFormSchema) as any,
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
  const createCausaTMMutation = useCreateCausaTicketMasivo({
    navigate,
    returnUrl: returnUrlCausaTicketMasivoPage,
    enableErrorNavigate: false,
  });
  const updateCausaTMMutation =
    useUpdateCausaTicketMasivo<CreateCausaTicketMasivoParamsBase>({
      navigate,
      returnUrl: returnUrlCausaTicketMasivoPage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (causaTM?.id) {
      updateCausaTMMutation.mutate({ id: causaTM.id!, data });
      return;
    }

    ///* create
    createCausaTMMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!causaTM?.id) return;
    reset(causaTM);
  }, [causaTM, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlCausaTicketMasivoPage)}
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
      <CustomAutocompleteArrString
        label="TIPO"
        name="tipo_causa"
        control={form.control}
        defaultValue={form.getValues('tipo_causa')}
        options={TIPO_CAUSA_TICKET_MASIVO_ARRAY_CHOICES}
        isLoadingData={false}
        error={errors.tipo_causa}
        helperText={errors.tipo_causa?.message}
        size={gridSizeMdLg6}
        disableClearable
      />
      <CustomTextArea
        label="Descripción"
        name="descripcion"
        control={form.control}
        defaultValue={form.getValues().descripcion}
        error={errors.descripcion}
        helperText={errors.descripcion?.message}
        required={false}
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

export default SaveCausaTicketMasivo;

import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import {
  useCreateCausaTM,
  useUpdateCausaTM,
  CreateCausaTMParamsBase,
} from '@/actions/app';
import {
  CustomTextArea,
  SampleCheckbox,
  CustomTextField,
  SingleFormBoxScene,
  CustomAutocompleteArrString,
} from '@/shared/components';
import {
  CausaTM,
  gridSizeMdLg6,
  PermissionsEnum,
  causaTMFormSchema,
  TIPO_CAUSA_TICKET_MASIVO_ARRAY_CHOICES,
} from '@/shared';
import { useCheckPermission } from '@/shared/hooks/auth';
import { returnUrlCausaTMPage } from '../../../pages/tables/CausaTMPage';

export interface SaveCausaTMProps {
  title: string;
  causaTM?: CausaTM;
}

type SaveFormData = CreateCausaTMParamsBase & {};

const SaveCausaTM: React.FC<SaveCausaTMProps> = ({ title, causaTM }) => {
  useCheckPermission(PermissionsEnum.tecnico_view_causaticketmasivo);

  ///* hooks -----------------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(causaTMFormSchema) as any,
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
  const createCausaTMMutation = useCreateCausaTM({
    navigate,
    returnUrl: returnUrlCausaTMPage,
    enableErrorNavigate: false,
  });
  const updateCausaTMMutation = useUpdateCausaTM<CreateCausaTMParamsBase>({
    navigate,
    returnUrl: returnUrlCausaTMPage,
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
      onCancel={() => navigate(returnUrlCausaTMPage)}
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
        name="description"
        control={form.control}
        defaultValue={form.getValues().description}
        error={errors.description}
        helperText={errors.description?.message}
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

export default SaveCausaTM;

import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import {
  DepartamentoTM,
  gridSizeMdLg6,
  PermissionsEnum,
  departamentoTMFormSchema,
} from '@/shared';
import {
  SampleCheckbox,
  CustomTextField,
  SingleFormBoxScene,
} from '@/shared/components';
import {
  useCreateDepartamentoTM,
  useUpdateDepartamentoTM,
  CreateDepartamentoTMParamsBase,
} from '@/actions/app';
import { useCheckPermission } from '@/shared/hooks/auth';
import { returnUrlDepartamentoTMPage } from '../../../pages/tables/DepartamentoTMPage';

export interface SaveDepartamentoTMProps {
  title: string;
  departamentoTM?: DepartamentoTM;
}

type SaveFormData = CreateDepartamentoTMParamsBase & {};

const SaveDepartamentoTM: React.FC<SaveDepartamentoTMProps> = ({
  title,
  departamentoTM,
}) => {
  useCheckPermission(PermissionsEnum.tecnico_view_departamentoticketmasivo);

  ///* hooks -----------------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(departamentoTMFormSchema) as any,
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
  const createDepartamentoTMMutation = useCreateDepartamentoTM({
    navigate,
    returnUrl: returnUrlDepartamentoTMPage,
    enableErrorNavigate: false,
  });
  const updateDepartamentoTMMutation =
    useUpdateDepartamentoTM<CreateDepartamentoTMParamsBase>({
      navigate,
      returnUrl: returnUrlDepartamentoTMPage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (departamentoTM?.id) {
      updateDepartamentoTMMutation.mutate({ id: departamentoTM.id!, data });
      return;
    }

    ///* create
    createDepartamentoTMMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!departamentoTM?.id) return;
    reset(departamentoTM);
  }, [departamentoTM, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlDepartamentoTMPage)}
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
      <CustomTextField
        label="CODIGO"
        name="code"
        control={form.control}
        defaultValue={form.getValues().code}
        error={errors.code}
        helperText={errors.code?.message}
        size={gridSizeMdLg6}
        disabled={!!departamentoTM?.id}
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

export default SaveDepartamentoTM;

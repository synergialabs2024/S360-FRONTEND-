import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import {
  SampleCheckbox,
  CustomTextField,
  SingleFormBoxScene,
  CustomColorPickerHexa,
} from '@/shared/components';
import {
  gridSizeMdLg1,
  gridSizeMdLg6,
  gridSizeMdLg11,
  PermissionsEnum,
  PrioridadIncidenciaTM,
  prioridadincidenciaTMFormSchema,
} from '@/shared';
import {
  useCreatePrioridadIncidenciaTM,
  useUpdatePrioridadIncidenciaTM,
  CreatePrioridadIncidenciaTMParamsBase,
} from '@/actions/app';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCheckPermission } from '@/shared/hooks/auth';
import { returnUrlPrioridadIncidenciaTMPage } from '../../../pages/tables/PrioridadIncidenciaTMPage';

export interface SavePrioridadIncidenciaTMProps {
  title: string;
  prioridadincidenciaTM?: PrioridadIncidenciaTM;
}

type SaveFormData = CreatePrioridadIncidenciaTMParamsBase & {};

const SavePrioridadIncidenciaTM: React.FC<SavePrioridadIncidenciaTMProps> = ({
  title,
  prioridadincidenciaTM,
}) => {
  useCheckPermission(
    PermissionsEnum.tecnico_view_prioridadincidenciaticketmasivo,
  );

  ///* hooks -----------------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(prioridadincidenciaTMFormSchema) as any,
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
  const createPrioridadIncidenciaTMMutation = useCreatePrioridadIncidenciaTM({
    navigate,
    returnUrl: returnUrlPrioridadIncidenciaTMPage,
    enableErrorNavigate: false,
  });
  const updatePrioridadIncidenciaTMMutation =
    useUpdatePrioridadIncidenciaTM<CreatePrioridadIncidenciaTMParamsBase>({
      navigate,
      returnUrl: returnUrlPrioridadIncidenciaTMPage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (prioridadincidenciaTM?.id) {
      updatePrioridadIncidenciaTMMutation.mutate({
        id: prioridadincidenciaTM.id!,
        data,
      });
      return;
    }

    console.log(data);

    ///* create
    createPrioridadIncidenciaTMMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!prioridadincidenciaTM?.id) return;
    reset(prioridadincidenciaTM);
  }, [prioridadincidenciaTM, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlPrioridadIncidenciaTMPage)}
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
        label="Codigo"
        name="code"
        control={form.control}
        defaultValue={form.getValues().code}
        error={errors.code}
        helperText={errors.code?.message}
        size={gridSizeMdLg6}
        disabled={!!prioridadincidenciaTM?.id}
      />
      <CustomTextField
        label="Color Hex"
        name="color_hex"
        control={form.control}
        defaultValue={form.getValues().color_hex}
        error={errors.color_hex}
        helperText={errors.color_hex?.message}
        size={gridSizeMdLg11}
        disabled
      />
      <CustomColorPickerHexa
        size={gridSizeMdLg1}
        initialColor={prioridadincidenciaTM?.color_hex}
        onData={row => {
          form.setValue('color_hex', row);
        }}
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

export default SavePrioridadIncidenciaTM;

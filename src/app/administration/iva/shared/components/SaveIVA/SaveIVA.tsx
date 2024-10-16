import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { CreateIVAParamsBase, useCreateIVA, useUpdateIVA } from '@/actions/app';
import {
  CustomNumberTextField,
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { IVA, PermissionsEnum } from '@/shared/interfaces';
import { iVAFormSchema } from '@/shared/utils';
import { returnUrlIVAsPage } from '../../../pages/tables/IVAsPage';
import { useCheckPermission } from '@/shared/hooks/auth';

export interface SaveIVAProps {
  title: string;
  iva?: IVA;
}

type SaveFormData = CreateIVAParamsBase & {};

const SaveIVA: React.FC<SaveIVAProps> = ({ title, iva }) => {
  useCheckPermission(PermissionsEnum.administration_view_iva);
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(iVAFormSchema),
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
  const createIVAMutation = useCreateIVA({
    navigate,
    returnUrl: returnUrlIVAsPage,
    enableErrorNavigate: false,
  });
  const updateIVAMutation = useUpdateIVA<CreateIVAParamsBase>({
    navigate,
    returnUrl: returnUrlIVAsPage,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (iva?.id) {
      updateIVAMutation.mutate({ id: iva.id!, data });
      return;
    }

    ///* create
    createIVAMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!iva?.id) return;
    reset(iva);
  }, [iva, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlIVAsPage)}
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
        label="Sri code"
        name="sri_code"
        control={form.control}
        defaultValue={form.getValues().sri_code}
        error={errors.sri_code}
        helperText={errors.sri_code?.message}
        size={gridSizeMdLg6}
      />

      <CustomNumberTextField
        label="Percentage"
        name="percentage"
        control={form.control}
        defaultValue={form.getValues().percentage}
        error={errors.percentage}
        helperText={errors.percentage?.message}
        size={gridSizeMdLg6}
        customType="percentage"
      />

      <SampleCheckbox
        label="Estado"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        size={gridSizeMdLg6}
        isState
      />
    </SingleFormBoxScene>
  );
};

export default SaveIVA;

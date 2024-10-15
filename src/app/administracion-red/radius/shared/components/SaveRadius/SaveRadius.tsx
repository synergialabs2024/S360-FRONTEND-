import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateRadiusParamsBase,
  useCreateRadius,
  useUpdateRadius,
} from '@/actions/app';
import {
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { Radius } from '@/shared/interfaces';
import { radiusFormSchema } from '@/shared/utils';
import { returnUrlRadiusPage } from '../../../pages/tables/RadiusPage';

export interface SaveRadiusProps {
  title: string;
  radius?: Radius;
}

type SaveFormData = CreateRadiusParamsBase & {};

const SaveRadius: React.FC<SaveRadiusProps> = ({ title, radius }) => {
  ///* hooks ---------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(radiusFormSchema) as any,
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
  const createRadiusMutation = useCreateRadius({
    navigate,
    returnUrl: returnUrlRadiusPage,
    enableErrorNavigate: false,
  });
  const updateRadiusMutation = useUpdateRadius<CreateRadiusParamsBase>({
    navigate,
    returnUrl: returnUrlRadiusPage,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (radius?.id) {
      updateRadiusMutation.mutate({ id: radius.id!, data });
      return;
    }

    ///* create
    createRadiusMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!radius?.id) return;
    reset(radius);
  }, [radius, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlRadiusPage)}
      onSave={handleSubmit(onSave, () => {})}
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

export default SaveRadius;

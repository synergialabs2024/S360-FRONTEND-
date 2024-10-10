import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateVlanParamsBase,
  useCreateVlan,
  useUpdateVlan,
} from '@/actions/app';
import {
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { vlanFormSchema } from '@/shared/utils';
import { Vlan } from '@/shared/interfaces/app/netconnect';
import { returnUrlVlansPage } from '../../../pages/tables/VlansPage';

export interface SaveVlanProps {
  title: string;
  vlan?: Vlan;
}

type SaveFormData = CreateVlanParamsBase & {};

const SaveVlan: React.FC<SaveVlanProps> = ({ title, vlan }) => {
  ///* hooks ---------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(vlanFormSchema) as any,
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
  const createVlanMutation = useCreateVlan({
    navigate,
    returnUrl: returnUrlVlansPage,
    enableErrorNavigate: false,
  });
  const updateVlanMutation = useUpdateVlan<CreateVlanParamsBase>({
    navigate,
    returnUrl: returnUrlVlansPage,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (vlan?.id) {
      updateVlanMutation.mutate({ id: vlan.id!, data });
      return;
    }

    ///* create
    createVlanMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!vlan?.id) return;
    reset(vlan);
  }, [vlan, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlVlansPage)}
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

export default SaveVlan;

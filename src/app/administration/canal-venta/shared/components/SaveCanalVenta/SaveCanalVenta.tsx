import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateCanalVentaParamsBase,
  useCreateCanalVenta,
  useUpdateCanalVenta,
} from '@/actions/app';
import {
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { CanalVenta } from '@/shared/interfaces';
import { canalVentaFormSchema } from '@/shared/utils';
import { returnUrlCanalesVentaPage } from '../../../pages/tables/CanalesVentaPage';

export interface SaveCanalVentaProps {
  title: string;
  canalventa?: CanalVenta;
}

type SaveFormData = CreateCanalVentaParamsBase & {};

const SaveCanalVenta: React.FC<SaveCanalVentaProps> = ({
  title,
  canalventa,
}) => {
  ///* hooks ---------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(canalVentaFormSchema) as any,
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
  const createCanalVentaMutation = useCreateCanalVenta({
    navigate,
    returnUrl: returnUrlCanalesVentaPage,
    enableErrorNavigate: false,
  });
  const updateCanalVentaMutation =
    useUpdateCanalVenta<CreateCanalVentaParamsBase>({
      navigate,
      returnUrl: returnUrlCanalesVentaPage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (canalventa?.id) {
      updateCanalVentaMutation.mutate({ id: canalventa.id!, data });
      return;
    }

    ///* create
    createCanalVentaMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!canalventa?.id) return;
    reset(canalventa);
  }, [canalventa, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlCanalesVentaPage)}
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
        size={gridSizeMdLg6}
      />
    </SingleFormBoxScene>
  );
};

export default SaveCanalVenta;

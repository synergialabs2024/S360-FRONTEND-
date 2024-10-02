import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Ruta, rutaFormSchema } from '@/shared';
import {
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import {
  CreateRutaParamsBase,
  useCreateRuta,
  useUpdateRuta,
} from '@/actions/app';
import { returnUrlRutasPage } from '../../../pages/tables/RutasPage';

export interface SaveRutaProps {
  title: string;
  ruta?: Ruta;
}

type SaveFormData = CreateRutaParamsBase & {};

const SaveRuta: React.FC<SaveRutaProps> = ({ title, ruta }) => {
  ///* Pendiente a cambio
  //useCheckPermissionsArray();

  ///* hooks
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(rutaFormSchema) as any,
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
  const createRutaMutation = useCreateRuta({
    navigate,
    returnUrl: returnUrlRutasPage,
    enableErrorNavigate: false,
  });
  const updateRutaMutation = useUpdateRuta<CreateRutaParamsBase>({
    navigate,
    returnUrl: returnUrlRutasPage,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (ruta?.id) {
      updateRutaMutation.mutate({ id: ruta.id!, data });
      return;
    }

    ///* create
    createRutaMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!ruta?.id) return;
    reset(ruta);
  }, [ruta, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlRutasPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomTextField
        label="Name"
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

export default SaveRuta;

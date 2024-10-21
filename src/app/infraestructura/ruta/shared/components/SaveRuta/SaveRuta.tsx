import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  PermissionsEnum,
  Ruta,
  RUTA_TYPE_ARRAY_CHOICES,
  rutaFormSchema,
} from '@/shared';
import {
  CustomAutocompleteArrString,
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
import { useCheckPermission } from '@/shared/hooks/auth';

export interface SaveRutaProps {
  title: string;
  ruta?: Ruta;
}

type SaveFormData = CreateRutaParamsBase & {};

const SaveRuta: React.FC<SaveRutaProps> = ({ title, ruta }) => {
  useCheckPermission(PermissionsEnum.infraestructura_view_ruta);

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
        label="Nombre"
        name="name"
        control={form.control}
        defaultValue={form.getValues().name}
        error={errors.name}
        helperText={errors.name?.message}
      />
      <CustomAutocompleteArrString
        label="Status"
        name="status"
        options={RUTA_TYPE_ARRAY_CHOICES}
        isLoadingData={false}
        control={form.control}
        defaultValue={form.getValues().status}
        error={errors.status}
        helperText={errors.status?.message}
      />

      <SampleCheckbox
        label="Estado"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        isState
      />
    </SingleFormBoxScene>
  );
};

export default SaveRuta;

import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateAutenticacionClienteParamsBase,
  useCreateAutenticacionCliente,
  useUpdateAutenticacionCliente,
} from '@/actions/app';
import {
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { AutenticacionCliente } from '@/shared/interfaces/app/administracion-red/autenticacion-cliente';
import { autenticacionClienteFormSchema } from '@/shared/utils/validation-schemas/app/administracion-red/autenticacion-cliente';
import { returnUrlAutenticacionClientesPage } from '../../../pages/tables/AutenticacionClientePage';

export interface SaveAutenticacionClienteProps {
  title: string;
  authCliente?: AutenticacionCliente;
}

type SaveFormData = CreateAutenticacionClienteParamsBase & {};

const SaveAutenticacionCliente: React.FC<SaveAutenticacionClienteProps> = ({
  title,
  authCliente,
}) => {
  ///* hooks ---------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(autenticacionClienteFormSchema) as any,
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
  const createAutenticacionClienteMutation = useCreateAutenticacionCliente({
    navigate,
    returnUrl: returnUrlAutenticacionClientesPage,
    enableErrorNavigate: false,
  });
  const updateAutenticacionClienteMutation =
    useUpdateAutenticacionCliente<CreateAutenticacionClienteParamsBase>({
      navigate,
      returnUrl: returnUrlAutenticacionClientesPage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (authCliente?.id) {
      updateAutenticacionClienteMutation.mutate({ id: authCliente.id!, data });
      return;
    }

    ///* create
    createAutenticacionClienteMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!authCliente?.id) return;
    reset(authCliente);
  }, [authCliente, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlAutenticacionClientesPage)}
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

export default SaveAutenticacionCliente;

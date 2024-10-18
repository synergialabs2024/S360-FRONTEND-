import {
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { TipoInstalacion } from '@/shared/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  CreateTipoInstalacionParams,
  useCreateTipoInstalacion,
  useUpdateTipoInstalacion,
} from '@/actions/app/logistica';
import { tipoInstalacionFormSchema } from '@/shared/utils/validation-schemas/app/logistica';
import { returnUrlTipoInstalacionesPage } from '../../../pages/tables/TipoInstalacionesPage';

export interface SaveTipoInstalacionProps {
  title: string;
  tipoInstalacion?: TipoInstalacion;
}

type SaveFormData = CreateTipoInstalacionParams & {};

const SaveTipoInstalacion: React.FC<SaveTipoInstalacionProps> = ({
  title,
  tipoInstalacion,
}) => {
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(tipoInstalacionFormSchema) as any,
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
  const createTipoInstalacionMutation = useCreateTipoInstalacion({
    navigate,
    returnUrl: returnUrlTipoInstalacionesPage,
    enableErrorNavigate: false,
  });
  const updateTipoInstalacionMutation =
    useUpdateTipoInstalacion<CreateTipoInstalacionParams>({
      navigate,
      returnUrl: returnUrlTipoInstalacionesPage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (tipoInstalacion?.id) {
      updateTipoInstalacionMutation.mutate({ id: tipoInstalacion.id!, data });
      return;
    }

    ///* create
    createTipoInstalacionMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!tipoInstalacion?.id) return;
    reset(tipoInstalacion);
  }, [tipoInstalacion, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlTipoInstalacionesPage)}
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
      <CustomTextField
        label="Codigo"
        name="codigo"
        control={form.control}
        defaultValue={form.getValues().codigo}
        error={errors.codigo}
        helperText={errors.codigo?.message}
      />
      <CustomTextField
        label="Descripcion"
        name="descripcion"
        control={form.control}
        defaultValue={form.getValues().descripcion}
        error={errors.descripcion}
        helperText={errors.descripcion?.message}
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

export default SaveTipoInstalacion;

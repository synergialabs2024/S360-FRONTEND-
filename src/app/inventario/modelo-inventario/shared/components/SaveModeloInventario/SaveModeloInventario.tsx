import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateModeloInventarioParamsBase,
  useCreateModeloInventario,
  useUpdateModeloInventario,
} from '@/actions/app';
import { CustomTextField, SingleFormBoxScene } from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { ModeloInventario, PermissionsEnum } from '@/shared/interfaces';
import { modeloInventarioFormSchema } from '@/shared/utils';
import { useCheckPermission } from '@/shared/hooks/auth';
import { returnUrlModeloInventariosPage } from '../../../pages/tables/ModeloInventariosPages';

export interface SaveModeloInventarioProps {
  title: string;
  modelo_inventario?: ModeloInventario;
}

type SaveFormData = CreateModeloInventarioParamsBase & {};

const SaveModeloInventario: React.FC<SaveModeloInventarioProps> = ({
  title,
  modelo_inventario,
}) => {
  useCheckPermission(PermissionsEnum.inventario_view_modeloinventario);

  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(modeloInventarioFormSchema) as any,
    defaultValues: {},
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* mutations
  const createModeloInventarioMutation = useCreateModeloInventario({
    navigate,
    returnUrl: returnUrlModeloInventariosPage,
    enableErrorNavigate: false,
  });
  const updateModeloInventarioMutation =
    useUpdateModeloInventario<CreateModeloInventarioParamsBase>({
      navigate,
      returnUrl: returnUrlModeloInventariosPage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (modelo_inventario?.id) {
      updateModeloInventarioMutation.mutate({
        id: modelo_inventario.id!,
        data,
      });
      return;
    }

    ///* create
    createModeloInventarioMutation.mutate(data);
  };

  ///* effects
  useEffect(() => {
    if (!modelo_inventario?.id) return;
    reset(modelo_inventario);
  }, [modelo_inventario, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlModeloInventariosPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomTextField
        label="Nombre"
        name="nombre"
        control={form.control}
        defaultValue={form.getValues().nombre}
        error={errors.nombre}
        size={gridSizeMdLg6}
        helperText={errors.nombre?.message}
      />
      <CustomTextField
        label="Codigo"
        name="codigo"
        control={form.control}
        defaultValue={form.getValues().codigo}
        error={errors.codigo}
        size={gridSizeMdLg6}
        helperText={errors.codigo?.message}
      />
    </SingleFormBoxScene>
  );
};

export default SaveModeloInventario;

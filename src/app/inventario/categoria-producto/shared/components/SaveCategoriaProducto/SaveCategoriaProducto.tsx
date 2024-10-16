import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateCategoriaProductoParamsBase,
  useCreateCategoriaProducto,
  useUpdateCategoriaProducto,
} from '@/actions/app';
import { ToastWrapper } from '@/shared';
import {
  CustomTextField,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { CategoriaProducto } from '@/shared/interfaces';
import {
  categoriaProductoFormSchema,
  getKeysFormErrorsMessage,
} from '@/shared/utils';
import { returnUrlCategoriasProductoPage } from '../../../pages/tables/CategoriasProductoPage';

export interface SaveCategoriaProductoProps {
  title: string;
  categoriaproducto?: CategoriaProducto;
}

type SaveFormData = CreateCategoriaProductoParamsBase & {};

const SaveCategoriaProducto: React.FC<SaveCategoriaProductoProps> = ({
  title,
  categoriaproducto,
}) => {
  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(categoriaProductoFormSchema) as any,
    defaultValues: {
      state: true,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* mutations ---------------------
  const createCategoriaProductoMutation = useCreateCategoriaProducto({
    navigate,
    returnUrl: returnUrlCategoriasProductoPage,
    enableErrorNavigate: false,
  });
  const updateCategoriaProductoMutation =
    useUpdateCategoriaProducto<CreateCategoriaProductoParamsBase>({
      navigate,
      returnUrl: returnUrlCategoriasProductoPage,
    });

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (categoriaproducto?.id) {
      updateCategoriaProductoMutation.mutate({
        id: categoriaproducto.id!,
        data,
      });
      return;
    }

    ///* create
    createCategoriaProductoMutation.mutate(data);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!categoriaproducto?.id) return;
    reset(categoriaproducto);
  }, [categoriaproducto, reset]);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlCategoriasProductoPage)}
      onSave={handleSubmit(onSave, errors => {
        ToastWrapper.error(
          `Faltan campos requeridos: ${getKeysFormErrorsMessage(errors)}`,
        );
      })}
    >
      <CustomTextField
        label="Nombre"
        name="nombre"
        control={form.control}
        defaultValue={form.getValues().nombre}
        error={errors.nombre}
        helperText={errors.nombre?.message}
        size={gridSizeMdLg6}
      />

      <SampleCheckbox
        label="state"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        size={gridSizeMdLg6}
        isState
      />
    </SingleFormBoxScene>
  );
};

export default SaveCategoriaProducto;

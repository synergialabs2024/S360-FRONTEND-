import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  CreateProductoParamsBase,
  useCreateProducto,
  useFetchIVAs,
  useUpdateProducto,
} from '@/actions/app';
import {
  TIPO_PRODUCTO_ARRAY_CHOICES,
  ToastWrapper,
  useLoaders,
} from '@/shared';
import {
  CustomAutocomplete,
  CustomTextArea,
  CustomTextField,
  SampleCheckbox,
  SelectTextFieldArrayString,
  SingleFormBoxScene,
} from '@/shared/components';
import { gridSizeMdLg6 } from '@/shared/constants/ui';
import { IVA, Producto } from '@/shared/interfaces';
import { getKeysFormErrorsMessage, productoFormSchema } from '@/shared/utils';
import { returnUrlProductosPage } from '../../../pages/tables/ProductosPage';

export interface SaveProductoProps {
  title: string;
  producto?: Producto;
}

type SaveFormData = CreateProductoParamsBase & {};

const SaveProducto: React.FC<SaveProductoProps> = ({ title, producto }) => {
  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(productoFormSchema) as any,
    defaultValues: {
      state: true,
      es_para_venta: false,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  ///* fetch data ---------------------
  const {
    data: ivasPaginatedRes,
    isLoading: isLoadingIVAs,
    isRefetching: isRefetchingIVAs,
  } = useFetchIVAs({
    params: {
      page_size: 300,
    },
  });

  ///* mutations ---------------------
  const createProductoMutation = useCreateProducto({
    navigate,
    returnUrl: returnUrlProductosPage,
    enableErrorNavigate: false,
  });
  const updateProductoMutation = useUpdateProducto<CreateProductoParamsBase>({
    navigate,
    returnUrl: returnUrlProductosPage,
  });

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (producto?.id) {
      updateProductoMutation.mutate({ id: producto.id!, data });
      return;
    }

    ///* create
    createProductoMutation.mutate(data);
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!producto?.id) return;
    reset(producto);
  }, [producto, reset]);
  const isCustomLoading = isLoadingIVAs || isRefetchingIVAs;
  useLoaders(isCustomLoading);

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlProductosPage)}
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
      />

      <CustomTextField
        label="Código"
        name="codigo"
        control={form.control}
        defaultValue={form.getValues().codigo}
        error={errors.codigo}
        helperText={errors.codigo?.message}
        size={gridSizeMdLg6}
        defaultHelperText="El código debe ser único"
        disabled={!!producto?.id}
      />
      <CustomTextField
        label="Código Auxiliar"
        name="codigo_auxiliar"
        control={form.control}
        defaultValue={form.getValues().codigo_auxiliar}
        error={errors.codigo_auxiliar}
        helperText={errors.codigo_auxiliar?.message}
        size={gridSizeMdLg6}
        defaultHelperText="El código debe ser único"
        disabled={!!producto?.id}
      />

      <CustomTextArea
        label="Descripción"
        name="descripcion"
        control={form.control}
        defaultValue={form.getValues().descripcion}
        error={errors.descripcion}
        helperText={errors.descripcion?.message}
      />

      {/* TIPO_PRODUCTO_ARRAY_CHOICES */}
      <SelectTextFieldArrayString
        label="Tipo producto"
        name="tipo"
        textFieldKey="tipo"
        // options
        options={['', ...TIPO_PRODUCTO_ARRAY_CHOICES]}
        defaultValue={form.getValues()?.tipo || ''}
        // errors
        control={form.control}
        error={form.formState.errors.tipo}
        helperText={form.formState.errors.tipo?.message}
        gridSize={gridSizeMdLg6}
      />
      <CustomAutocomplete<IVA>
        label="Iva"
        name="iva"
        // options
        options={ivasPaginatedRes?.data?.items || []}
        valueKey="name"
        actualValueKey="id"
        defaultValue={form.getValues().iva}
        isLoadingData={isLoadingIVAs || isRefetchingIVAs}
        // vaidation
        control={form.control}
        error={errors.iva}
        helperText={errors.iva?.message}
        size={gridSizeMdLg6}
      />

      <SampleCheckbox
        label="Es para venta"
        name="es_para_venta"
        control={form.control}
        defaultValue={form.getValues().es_para_venta}
        size={gridSizeMdLg6}
      />
      <SampleCheckbox
        label="Estado"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        size={gridSizeMdLg6}
      />
    </SingleFormBoxScene>
  );
};

export default SaveProducto;

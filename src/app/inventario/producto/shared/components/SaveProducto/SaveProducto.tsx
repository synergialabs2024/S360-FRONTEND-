import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  CreateProductoParamsBase,
  useCreateProducto,
  useFetchCategoriaProductos,
  useFetchCuentaContables,
  useFetchIVAs,
  useFetchModeloInventarios,
  useUpdateProducto,
} from '@/actions/app';
import {
  CodigoModeloProductoEnumChoice,
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
import {
  gridSizeMdLg12,
  gridSizeMdLg2,
  gridSizeMdLg4,
  gridSizeMdLg6,
} from '@/shared/constants/ui';
import {
  CategoriaProducto,
  CuentaContable_Producto,
  IVA,
  ModeloInventario,
  PrecioProducto,
  Producto,
} from '@/shared/interfaces';
import { getKeysFormErrorsMessage, productoFormSchema } from '@/shared/utils';
import { returnUrlProductosPage } from '../../../pages/tables/ProductosPage';
import { PricesForm } from './PricesForm'; // Asegúrate de importar correctamente
import CustomCuentaContable from '../../custom/CustomCuentaContable';

export interface SaveProductoProps {
  title: string;
  producto?: Producto;
}

type SaveFormData = CreateProductoParamsBase & {};

const SaveProducto: React.FC<SaveProductoProps> = ({ title, producto }) => {
  const [isPreconectizada, setIsPreconectizada] = useState<boolean>(false);
  const [isValidMetraje, setIsValidMetraje] = useState<boolean>(false);

  const navigate = useNavigate();

  ///* form ---------------------
  const form = useForm<SaveFormData>({
    resolver: yupResolver(productoFormSchema) as any,
    defaultValues: {
      state: true,
      es_para_venta: false,
      requiere_series: false,
      aplica_promocion: false,
      considera_reporte_arcotel: false,
      // init with 1 default price
      precios: [
        {
          nombre: '',
          valor: 0,
          default: true,
          descripcion: '',
        },
      ],
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
    control,
    watch,
    setValue,
  } = form;

  ///* fetch data ---------------------
  const {
    data: modeloInventarioPaginatedRes,
    isLoading: isLoadingModeloInventario,
    isRefetching: isRefetchingModeloInventario,
  } = useFetchModeloInventarios({
    params: {
      page_size: 300,
    },
  });
  const {
    data: ivasPaginatedRes,
    isLoading: isLoadingIVAs,
    isRefetching: isRefetchingIVAs,
  } = useFetchIVAs({
    params: {
      page_size: 300,
    },
  });
  const {
    data: categoriasPaginatedRes,
    isLoading: isLoadingCategorias,
    isRefetching: isRefetchingCategorias,
  } = useFetchCategoriaProductos({
    params: {
      page_size: 300,
    },
  });
  const {
    data: cuentaContablePaginatedRes,
    isLoading: isLoadingCuentaContable,
    isRefetching: isRefetchingCuentaContable,
  } = useFetchCuentaContables({
    params: {
      page_size: 5000,
    },
  });

  ///* mutations ---------------------
  const createProductoMutation = useCreateProducto<CreateProductoParamsBase>({
    navigate,
    returnUrl: returnUrlProductosPage,
    enableErrorNavigate: false,
  });
  const updateProductoMutation = useUpdateProducto<CreateProductoParamsBase>({
    navigate,
    returnUrl: returnUrlProductosPage,
  });

  const watchedMetrajeRelativo = form.watch('metraje_relativo');

  ///* handlers ---------------------
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;
    if (isPreconectizada && watchedMetrajeRelativo == '') {
      setIsValidMetraje(true);
      return ToastWrapper.error('El campo Metraje Relativo es obligatorio');
    }
    ///* upd
    if (producto?.id) {
      updateProductoMutation.mutate({
        id: producto.id!,
        data: {
          ...data,
          precios: data.precios?.map(precio => ({
            ...precio,
            valor: precio.valor.toFixed(2),
          })) as unknown as PrecioProducto[],
        },
      });
      return;
    }

    ///* create
    createProductoMutation.mutate({
      ...data,
      precios: data.precios?.map(precio => ({
        ...precio,
        valor: precio.valor.toFixed(2),
      })) as unknown as PrecioProducto[],
    });
  };

  ///* effects ---------------------
  useEffect(() => {
    if (!producto?.id) return;
    reset(producto);
    if (
      producto.modelo_data?.codigo ==
      CodigoModeloProductoEnumChoice.FIBRA_PRECONECTORIZADA
    ) {
      return setIsPreconectizada(true);
    }
  }, [producto, reset]);

  const isCustomLoading =
    isLoadingIVAs ||
    isRefetchingIVAs ||
    isLoadingCategorias ||
    isRefetchingCategorias;
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
        control={control}
        defaultValue={form.getValues().nombre}
        error={errors.nombre}
        helperText={errors.nombre?.message}
      />

      <CustomTextField
        label="Código"
        name="codigo"
        control={control}
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
        control={control}
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
        control={control}
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
        options={TIPO_PRODUCTO_ARRAY_CHOICES}
        defaultValue={form.getValues()?.tipo || ''}
        // errors
        control={control}
        error={errors.tipo}
        helperText={errors.tipo?.message}
        gridSize={gridSizeMdLg4}
      />
      <CustomAutocomplete<CategoriaProducto>
        label="Categoría"
        name="categoria"
        options={categoriasPaginatedRes?.data?.items || []}
        valueKey="nombre"
        actualValueKey="id"
        defaultValue={form.getValues().categoria}
        isLoadingData={isLoadingCategorias || isRefetchingCategorias}
        control={control}
        error={errors.categoria}
        helperText={errors.categoria?.message}
        size={gridSizeMdLg4}
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
        // validation
        control={control}
        error={errors.iva}
        helperText={errors.iva?.message}
        size={gridSizeMdLg4}
      />
      <CustomAutocomplete<ModeloInventario>
        label="Modelo"
        name="modelo"
        // options
        options={modeloInventarioPaginatedRes?.data?.items || []}
        valueKey="nombre"
        actualValueKey="id"
        defaultValue={form.getValues().modelo}
        isLoadingData={
          isLoadingModeloInventario || isRefetchingModeloInventario
        }
        // validation cuenta_padre_data
        control={control}
        error={errors.modelo}
        helperText={errors.modelo?.message}
        size={isPreconectizada ? gridSizeMdLg6 : gridSizeMdLg12}
        onChangeRawValue={row => {
          setValue('metraje_relativo', '0.00');
          if (
            row.codigo === CodigoModeloProductoEnumChoice.FIBRA_PRECONECTORIZADA
          ) {
            setIsPreconectizada(true);
          } else {
            setIsPreconectizada(false);
          }
        }}
      />
      {isPreconectizada ? (
        <CustomTextField
          label="Metraje Relativo"
          name="metraje_relativo"
          type="number"
          control={form.control}
          defaultValue={form.getValues().metraje_relativo}
          error={
            isValidMetraje
              ? {
                type: 'required',
                message: 'El campo modelo es requerido',
                ref: HTMLInputElement,
              }
              : undefined
          }
          helperText={
            isValidMetraje ? 'El campo modelo es requerido' : undefined
          }
          size={gridSizeMdLg6}
          required={false}
          ignoreTransform
          onChangeValue={() => setIsValidMetraje(false)}
        />
      ) : null}
      <CustomCuentaContable<CuentaContable_Producto>
        label="Cuenta Contable"
        name="cuentas_contables"
        options={
          cuentaContablePaginatedRes?.data?.items
            ?.filter(item => item.id !== undefined)
            .map(item => ({
              id: item.id as number,
              nombre: item.nombre,
              codigo: item.codigo,
            })) || []
        }
        isLoadingData={isLoadingCuentaContable || isRefetchingCuentaContable}
        control={control}
        size={gridSizeMdLg12}
        limitTags={7}
        defaultValue={form.getValues().cuentas_contables}
      />

      <SampleCheckbox
        label="Estado"
        name="state"
        control={control}
        defaultValue={form.getValues().state}
        size={gridSizeMdLg2}
      />
      <SampleCheckbox
        label="Es para venta"
        name="es_para_venta"
        control={control}
        defaultValue={form.getValues().es_para_venta}
        size={gridSizeMdLg2}
      />
      <SampleCheckbox
        label="Aplica promocion"
        name="aplica_promocion"
        control={control}
        defaultValue={form.getValues().aplica_promocion}
        size={gridSizeMdLg2}
      />
      <SampleCheckbox
        label="Requiere serie"
        name="requiere_series"
        control={control}
        defaultValue={form.getValues().requiere_series}
        size={gridSizeMdLg2}
        disabled={!!producto}
      />
      <SampleCheckbox
        label="Considera Reporte Arcotel"
        name="considera_reporte_arcotel"
        control={control}
        defaultValue={form.getValues().considera_reporte_arcotel}
        size={gridSizeMdLg2}
      />
      {/* ------------ prices component ------------ */}
      <PricesForm
        control={control}
        watch={watch}
        setValue={setValue}
        formState={{ errors }}
      />
    </SingleFormBoxScene>
  );
};

export default SaveProducto;

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { FiPlus } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';

import {
  CreateTransferenciaMaterialParamsBase,
  useCreateTransferenciaMaterial,
  useFetchBodegas,
  useFetchMotivoTransferencia,
  useFetchUbicacions,
} from '@/actions/app';
import {
  Bodega,
  gridSizeMdLg4,
  MotivoTransferencia,
  ProductosDisponiblesModal,
  ProductosDisponiblesTableType,
  ToastWrapper,
  TransferenciaMaterial,
  transferenciaMaterialFormSchema,
  Ubicacion,
  useColumnsProductosDisponibles,
  useLoaders,
} from '@/shared';
import {
  CustomAutocomplete,
  CustomMinimalTable,
  CustomSingleButton,
  CustomTextArea,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  SingleFormBoxScene,
} from '@/shared/components';
import { returnUrlTransferenciaMaterialesPage } from '../../../pages/tables/TransferenciaMaterialPage';
import { useProductosStore } from '@/store/app';

export interface SaveTransferenciaMaterialProps {
  title: string;
  transferenciaMaterial?: TransferenciaMaterial;
}

type SaveFormData = CreateTransferenciaMaterialParamsBase & {};

const SaveTransferenciaMaterial: React.FC<SaveTransferenciaMaterialProps> = ({
  title,
}) => {
  ///* local state --------------------
  const [openAddProducts, setOpenAddProducts] = useState<boolean>(false);
  const [uuidUbicacion, setUUIDUbicacion] = useState<string | undefined>('');

  ///* global state --------------------
  const productosDisponibles = useProductosStore(s => s.productosDisponibles);
  const productosEnviar = useProductosStore(s => s.setProductosDisponibles);

  ///* hooks ---------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(transferenciaMaterialFormSchema) as any,
    defaultValues: {
      state: true,
    },
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const watchedBodegaOrigen = form.watch('bodega_origen');
  const watchedBodegaDestino = form.watch('bodega_destino');
  const watchedUbicacionOrigen = form.watch('ubicacion_origen');
  const watchedUbicacionDestino = form.watch('ubicacion_destino');

  ///* fetch data ---------------------
  const {
    data: bodegaOrigenPagingRes,
    isLoading: isLoadingBodegaOrigen,
    isRefetching: isRefetchingBodegaOrigen,
  } = useFetchBodegas({
    params: {
      page_size: 600,
    },
  });
  const {
    data: bodegaDestinoPagingRes,
    isLoading: isLoadingBodegaDestino,
    isRefetching: isRefetchingBodegaDestino,
  } = useFetchBodegas({
    params: {
      page_size: 600,
    },
  });
  const {
    data: ubicacionOrigenPaging,
    isLoading: isLoadingUbicacionOrigen,
    isRefetching: isRefetchingUbicacionOrigen,
  } = useFetchUbicacions({
    enabled: !!watchedBodegaOrigen,
    params: {
      page_size: 1200,
      bodega: watchedBodegaOrigen!,
    },
  });
  const {
    data: ubicacionDestinoPaging,
    isLoading: isLoadingUbicacionDestino,
    isRefetching: isRefetchingUbicacionDestino,
  } = useFetchUbicacions({
    enabled: !!watchedBodegaDestino,
    params: {
      page_size: 1200,
      bodega: watchedBodegaDestino!,
    },
  });
  const {
    data: motivoTransferenciaPaging,
    isLoading: isLoadingMotivoTransferencia,
    isRefetching: isRefetchingMotivoTransferencia,
  } = useFetchMotivoTransferencia({
    params: {
      page_size: 1200,
    },
  });

  ///* mutations
  const createTransferenciaMaterialMutation = useCreateTransferenciaMaterial({
    navigate,
    returnUrl: returnUrlTransferenciaMaterialesPage,
    enableErrorNavigate: false,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    const mappedProductos = productosDisponibles.map(producto => ({
      id: producto.id,
      producto: producto.id,
      cantidad: producto.cantidad,
      descripcion: producto.descripcion,
      nombre: producto.nombre,
      codigo: producto.codigo,
      codigo_auxiliar: producto.codigo_auxiliar,
      categoria: producto.categoria,
      categoria_data: producto.categoria_data,
      series: producto.series ? producto.series : [],
      requiere_series: producto.requiere_series,
      tipo: producto.tipo,
    }));

    for (const producto of mappedProductos) {
      if (producto.requiere_series === true) {
        if (producto.cantidad !== producto.series.length) {
          ToastWrapper.error(
            'Las series deben tener la misma cifra que la cantidad',
          );
          return;
        }
      }
    }

    if (mappedProductos.length === 0) {
      ToastWrapper.error('Campo Productos es requerido');
      return;
    }

    const preparedData = {
      ...data,
      productos: mappedProductos,
    };

    createTransferenciaMaterialMutation.mutate(preparedData);
  };

  ///* effects
  useEffect(() => {
    productosEnviar([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      isLoadingUbicacionOrigen ||
      isRefetchingUbicacionOrigen ||
      !watchedBodegaOrigen
    )
      return;
    !ubicacionOrigenPaging?.data?.items?.length &&
      ToastWrapper.error(
        'No se encontraron ubicaciones para la bodega seleccionada',
      );
    if (
      isLoadingUbicacionDestino ||
      isRefetchingUbicacionDestino ||
      !watchedBodegaDestino
    )
      return;
    !ubicacionDestinoPaging?.data?.items?.length &&
      ToastWrapper.error(
        'No se encontraron ubicaciones para la bodega seleccionada',
      );
  }, [
    isLoadingUbicacionOrigen,
    isRefetchingUbicacionOrigen,
    watchedBodegaOrigen,
    ubicacionOrigenPaging,
    isLoadingUbicacionDestino,
    isRefetchingUbicacionDestino,
    watchedBodegaDestino,
    ubicacionDestinoPaging,
  ]);

  const customLoader =
    isLoadingUbicacionOrigen ||
    isRefetchingUbicacionOrigen ||
    isLoadingUbicacionDestino ||
    isRefetchingUbicacionDestino;

  useLoaders(customLoader);

  ///* columns --------------------
  const { crearMaterialColumns } = useColumnsProductosDisponibles();

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlTransferenciaMaterialesPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomAutocomplete<Bodega>
        label="Bodega Origen"
        name="bodega_origen"
        // options
        options={bodegaOrigenPagingRes?.data?.items || []}
        valueKey="nombre"
        actualValueKey="id"
        defaultValue={form.getValues().bodega_origen}
        isLoadingData={isLoadingBodegaOrigen || isRefetchingBodegaOrigen}
        // vaidation
        control={form.control}
        error={errors.bodega_origen}
        helperText={errors.bodega_origen?.message}
        onChangeRawValue={value => {
          form.setValue('bodega_origen', Number(value?.id));
          form.setValue('ubicacion_origen', '' as any);
          productosEnviar([]);
        }}
        size={gridSizeMdLg4}
      />
      <CustomAutocomplete<Bodega>
        label="Bodega Destino"
        name="bodega_destino"
        // options
        options={bodegaDestinoPagingRes?.data?.items || []}
        valueKey="nombre"
        actualValueKey="id"
        defaultValue={form.getValues().bodega_destino}
        isLoadingData={isLoadingBodegaDestino || isRefetchingBodegaDestino}
        // vaidation
        control={form.control}
        error={errors.bodega_destino}
        helperText={errors.bodega_destino?.message}
        onChangeRawValue={value => {
          form.setValue('bodega_destino', Number(value?.id));
          form.setValue('ubicacion_destino', '' as any);
          productosEnviar([]);
        }}
        size={gridSizeMdLg4}
      />
      <CustomAutocomplete<Ubicacion>
        label="Ubicacion Origen"
        name="ubicacion_origen"
        defaultValue={form.getValues().ubicacion_origen || ''}
        // options
        valueKey="nombre"
        actualValueKey="id"
        options={ubicacionOrigenPaging?.data.items || []}
        isLoadingData={isLoadingUbicacionOrigen || isRefetchingUbicacionOrigen}
        disableClearable
        // errors
        control={form.control}
        error={errors.ubicacion_origen as any}
        helperText={errors.ubicacion_origen?.message}
        size={gridSizeMdLg4}
        onChangeRawValue={value => {
          setUUIDUbicacion(value?.uuid);
          form.setValue('ubicacion_origen', Number(value?.id));
          form.setValue('ubicacion_destino', '' as any);
          productosEnviar([]);
        }}
      />
      <CustomAutocomplete<Ubicacion>
        label="Ubicacion Destino"
        name="ubicacion_destino"
        defaultValue={form.getValues().ubicacion_destino || ''}
        // options
        valueKey="nombre"
        actualValueKey="id"
        options={
          watchedBodegaOrigen === watchedBodegaDestino
            ? ubicacionDestinoPaging?.data.items.filter(
              item => item.id !== watchedUbicacionOrigen,
            ) || []
            : ubicacionDestinoPaging?.data.items || []
        }
        isLoadingData={
          isLoadingUbicacionDestino || isRefetchingUbicacionDestino
        }
        disableClearable
        // errors
        control={form.control}
        error={errors.ubicacion_destino as any}
        helperText={errors.ubicacion_destino?.message}
        size={gridSizeMdLg4}
        onChangeRawValue={value => {
          form.setValue('ubicacion_destino', Number(value?.id));
          productosEnviar([]);
        }}
      />
      <CustomAutocomplete<MotivoTransferencia>
        label="Motivo Egreso"
        name="motivo_transferencia"
        defaultValue={form.getValues().motivo_transferencia}
        // options
        valueKey="nombre"
        actualValueKey="id"
        options={motivoTransferenciaPaging?.data.items || []}
        isLoadingData={
          isLoadingMotivoTransferencia || isRefetchingMotivoTransferencia
        }
        disableClearable
        // errors
        control={form.control}
        error={errors.motivo_transferencia as any}
        helperText={errors.motivo_transferencia?.message}
        size={gridSizeMdLg4}
      />
      <CustomTextArea
        label="Observación"
        name="observacion"
        control={form.control}
        defaultValue={form.getValues().observacion}
        error={errors.observacion}
        helperText={errors.observacion?.message}
        required={false}
      />
      {/* ==================== PRODUCTS ==================== */}
      <CustomTypoLabel
        text="Productos"
        pt={CustomTypoLabelEnum.ptMiddlePosition}
      />
      <Grid container justifyContent="flex-end">
        {!!watchedUbicacionOrigen && !!watchedUbicacionDestino && (
          <CustomSingleButton
            label="AGREGAR PRODUCTO"
            color="primary"
            variant="text"
            startIcon={<FiPlus />}
            onClick={() => {
              setOpenAddProducts(true);
            }}
            justifyContent="flex-end"
          />
        )}

        <CustomMinimalTable<ProductosDisponiblesTableType>
          columns={crearMaterialColumns}
          data={productosDisponibles || []}
          enablePagination
          density="comfortable"
        />
        <ProductosDisponiblesModal
          askADD={true}
          pk_ubicacion={uuidUbicacion}
          open={openAddProducts}
          onClose={() => setOpenAddProducts(false)}
        />
      </Grid>
    </SingleFormBoxScene>
  );
};

export default SaveTransferenciaMaterial;

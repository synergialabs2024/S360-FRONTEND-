import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';
import { Grid } from '@mui/material';

import {
  CustomTextArea,
  CustomTypoLabel,
  CustomAutocomplete,
  CustomMinimalTable,
  CustomSingleButton,
  SingleFormBoxScene,
  CustomTypoLabelEnum,
} from '@/shared/components';
import {
  Bodega,
  Ubicacion,
  useLoaders,
  ToastWrapper,
  gridSizeMdLg6,
  gridSizeMdLg12,
  MotivoTransferencia,
  TransferenciaMaterial,
  ProductosDisponiblesModal,
  ProductosDisponiblesTableType,
  useColumnsProductosDisponibles,
  transferenciaMaterialFormSchema,
} from '@/shared';
import {
  useFetchBodegas,
  useFetchProductos,
  useFetchUbicacions,
  useFetchMotivoTransferencia,
  useCreateTransferenciaMaterial,
  CreateTransferenciaMaterialParamsBase,
} from '@/actions/app';
import { useProductosStore } from '@/store/app';
import { returnUrlTransferenciaMaterialesPage } from '../../../pages/tables/TransferenciaMaterialPage';
import { useAuthStore } from '@/store/auth';

export interface SaveTransferenciaMaterialProps {
  title: string;
  transferenciaMaterial?: TransferenciaMaterial;
}

type SaveFormData = CreateTransferenciaMaterialParamsBase & {};

const SaveTransferenciaMaterial: React.FC<SaveTransferenciaMaterialProps> = ({
  title,
  transferenciaMaterial,
}) => {
  const user = useAuthStore(s => s.user);

  ///* local state --------------------
  const [openAddProducts, setOpenAddProducts] = useState<boolean>(false);
  const [uuidUbicacion, setUUIDUbicacion] = useState<string | undefined>('');

  ///* global state --------------------
  const productosDisponibles = useProductosStore(s => s.productosDisponibles);
  const productosEnviar = useProductosStore(s => s.setProductosDisponibles);
  const clearAllStore = useProductosStore(s => s.clearAll);

  ///* hooks ---------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(transferenciaMaterialFormSchema) as any,
    defaultValues: {
      state: true,
      user_create: user?.id,
    },
  });

  const {
    handleSubmit,
    reset,
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
  const { data: productosPaging } = useFetchProductos({
    params: {
      page_size: 90000,
    },
  });

  ///* mutations
  const createTransferenciaMaterialMutation = useCreateTransferenciaMaterial({
    navigate,
    returnUrl: returnUrlTransferenciaMaterialesPage,
    enableErrorNavigate: false,
    customOnSuccess: () => clearAllStore(),
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    const mappedProductos = productosDisponibles.map(producto => ({
      producto: producto.id,
      cantidad: producto.cantidad,
      series: producto.series ? producto.series : [],
    }));

    if (mappedProductos.length === 0) {
      ToastWrapper.error('Campo Productos es requerido');
      return;
    }

    // Validaciones
    for (const prod of mappedProductos) {
      const detalles = productosPaging?.data.items.find(
        item => item.id === prod.producto,
      );

      const validarCantidad = (
        detalles?.ubicaciones_producto as unknown as {
          stock: number;
          ubicacion: string;
        }[]
      )?.find(i => i.ubicacion == uuidUbicacion);

      if (!detalles) {
        ToastWrapper.error(
          `No se encontró el producto con ID ${prod.producto}`,
        );
        return;
      }

      // Validar cantidad
      if (
        prod.cantidad === undefined ||
        prod.cantidad === null ||
        prod.cantidad === 0 ||
        prod.cantidad < 0
      ) {
        ToastWrapper.error(
          `El producto "${detalles.codigo}" necesita cantidad.`,
        );
        return;
      } else if (validarCantidad && validarCantidad.stock < prod.cantidad) {
        ToastWrapper.error(
          `El producto "${detalles.codigo}" tiene una cantidad
          de ${prod.cantidad} y solo existe ${validarCantidad.stock}.`,
        );
        return;
      }

      // Validaciones según `requiere_series`
      if (
        detalles.requiere_series &&
        (!prod.series || prod.series.length === 0)
      ) {
        ToastWrapper.error(`El producto "${detalles.codigo}" requiere series.`);
        return;
      } else if (!detalles.requiere_series && prod.series.length > 0) {
        ToastWrapper.error(
          `El producto "${detalles.nombre}" no necesita series.`,
        );
        return;
      }
      if (
        detalles.requiere_series == true &&
        prod.series.length !== prod.cantidad
      ) {
        ToastWrapper.error(
          `El producto "${detalles.codigo}" debe tener una
          cantidad de series de ${prod.cantidad}.`,
        );
        return;
      }
    }

    if (data.ubicacion_origen_data) {
      delete data.ubicacion_origen_data;
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
    if (!transferenciaMaterial) return;
    reset(transferenciaMaterial);
    productosEnviar(transferenciaMaterial?.productos);
    setUUIDUbicacion(transferenciaMaterial?.ubicacion_origen_data?.uuid || '');
  }, [transferenciaMaterial, reset, productosEnviar]);

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

  const productosConUbicacion = productosDisponibles.map(producto => {
    return {
      ...producto,
      ubicacion: uuidUbicacion,
    };
  });

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
        }}
        size={gridSizeMdLg6}
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
        }}
        size={gridSizeMdLg6}
      />
      <CustomAutocomplete<Ubicacion>
        label="Ubicacion Origen"
        name="ubicacion_origen"
        defaultValue={form.getValues().ubicacion_origen || ''}
        // options
        valueKey="nombre"
        actualValueKey="id"
        options={
          watchedBodegaDestino === watchedBodegaOrigen
            ? ubicacionOrigenPaging?.data.items.filter(
              item => item.id !== watchedUbicacionDestino,
            ) || []
            : ubicacionOrigenPaging?.data.items || []
        }
        isLoadingData={isLoadingUbicacionOrigen || isRefetchingUbicacionOrigen}
        disableClearable
        // errors
        control={form.control}
        error={errors.ubicacion_origen as any}
        helperText={errors.ubicacion_origen?.message}
        size={gridSizeMdLg6}
        onChangeRawValue={value => {
          setUUIDUbicacion(value?.uuid);
          form.setValue('ubicacion_origen', Number(value?.id));
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
        size={gridSizeMdLg6}
        onChangeRawValue={value => {
          form.setValue('ubicacion_destino', Number(value?.id));
        }}
      />
      <CustomAutocomplete<MotivoTransferencia>
        label="Motivo Transferencia"
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
        size={gridSizeMdLg12}
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
          data={productosConUbicacion || []}
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

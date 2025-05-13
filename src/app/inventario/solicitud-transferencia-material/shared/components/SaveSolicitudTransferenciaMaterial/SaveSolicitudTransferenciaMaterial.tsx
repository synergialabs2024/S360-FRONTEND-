/* eslint-disable indent */
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';
import { Grid } from '@mui/material';

import {
  CustomTextArea,
  CustomTypoLabel,
  SingleFormBoxScene,
  CustomAutocomplete,
  CustomMinimalTable,
  CustomSingleButton,
  CustomTypoLabelEnum,
} from '@/shared/components';
import {
  Bodega,
  Ubicacion,
  useLoaders,
  ToastWrapper,
  gridSizeMdLg6,
  ProductosDisponiblesModal,
  ProductosDisponiblesTableType,
  SolicitudTransferenciaMaterial,
  useColumnsProductosDisponibles,
  solicitudTransferenciaMaterialFormSchema,
} from '@/shared';
import { useProductosStore } from '@/store/app';
import {
  useFetchBodegas,
  useFetchProductos,
  useFetchUbicacions,
  useCreateSolicitudTransferenciaMaterial,
  CreateSolicitudTransferenciaMaterialParamsBase,
} from '@/actions/app';
import { returnUrlSolicitudTransferenciaMaterialesPage } from '../../../pages/tables/SolicitudTransferenciaMaterialMainPages';
import { useAuthStore } from '@/store/auth';

export interface SaveSolicitudTransferenciaMaterialProps {
  title: string;
  solicitudTransferenciaMaterial?: SolicitudTransferenciaMaterial;
}

type SaveFormData = CreateSolicitudTransferenciaMaterialParamsBase & {};

const SaveSolicitudTransferenciaMaterial: React.FC<
  SaveSolicitudTransferenciaMaterialProps
> = ({ title }) => {
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
    resolver: yupResolver(solicitudTransferenciaMaterialFormSchema) as any,
    defaultValues: {
      state: true,
      user_create: user?.id,
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
  const { data: productosPaging } = useFetchProductos({
    params: {
      page_size: 90000,
    },
  });

  ///* mutations
  const createSolicitudTransferenciaMaterialMutation =
    useCreateSolicitudTransferenciaMaterial({
      navigate,
      returnUrl: returnUrlSolicitudTransferenciaMaterialesPage,
      enableErrorNavigate: false,
      customOnSuccess: () => clearAllStore(),
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    const userFlotaId = user?.flota_data?.ubicacion_data?.id;

    if (
      userFlotaId &&
      watchedUbicacionDestino !== userFlotaId &&
      watchedUbicacionOrigen !== userFlotaId
    ) {
      return ToastWrapper.error(
        'Debes seleccionar este usuario como flota en el origen o destino.',
      );
    }

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
    }

    const preparedData = {
      ...data,
      productos: mappedProductos,
    };

    createSolicitudTransferenciaMaterialMutation.mutate(preparedData);
  };

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
  const { crearMaterialColumnsSinSerie } = useColumnsProductosDisponibles();

  const productosConUbicacion = productosDisponibles.map(producto => {
    return {
      ...producto,
      ubicacion: uuidUbicacion,
    };
  });

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlSolicitudTransferenciaMaterialesPage)}
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
          productosEnviar([]);
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
        size={gridSizeMdLg6}
        onChangeRawValue={value => {
          form.setValue('ubicacion_destino', Number(value?.id));
          productosEnviar([]);
        }}
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
          columns={crearMaterialColumnsSinSerie}
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

export default SaveSolicitudTransferenciaMaterial;

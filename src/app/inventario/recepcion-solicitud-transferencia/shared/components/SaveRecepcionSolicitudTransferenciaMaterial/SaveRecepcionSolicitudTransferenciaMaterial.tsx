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
  ProductosDisponiblesTableType,
  SolicitudTransferenciaMaterial,
  useColumnsProductosDisponibles,
  solicitudTransferenciaMaterialFormSchema,
} from '@/shared';
import {
  useFetchBodegas,
  useFetchProductos,
  useFetchUbicacions,
  useUpdateSolicitudTransferenciaMaterial,
  CreateSolicitudTransferenciaMaterialParamsBase,
} from '@/actions/app';
import { useProductosStore } from '@/store/app';
import { useUiConfirmModalStore } from '@/store/ui';
import ProductosDisponiblesModal from '@/shared/hooks/app/inventario/modals/ProductosDisponiblesModal';
import { returnUrlRecepcionSolicitudTransferenciaMaterialesPage } from '../../../pages/tables/RecepcionSolicitudTransferenciaMaterialMainPages';
import { returnUrlTransferenciaMaterialesPage } from '@/app/inventario/transferencia-material/pages/tables/TransferenciaMaterialPage';

export interface SaveRecepcionSolicitudTransferenciaMaterialProps {
  title: string;
  solicitudTransferenciaMaterial?: SolicitudTransferenciaMaterial;
}

type SaveFormData = CreateSolicitudTransferenciaMaterialParamsBase & {};

const SaveRecepcionSolicitudTransferenciaMaterial: React.FC<
  SaveRecepcionSolicitudTransferenciaMaterialProps
> = ({ title, solicitudTransferenciaMaterial }) => {
  ///* local state --------------------
  const [openAddProducts, setOpenAddProducts] = useState<boolean>(false);

  ///* global state --------------------
  const productosDisponibles = useProductosStore(s => s.productosDisponibles);
  const productosEnviar = useProductosStore(s => s.setProductosDisponibles);

  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* hooks ---------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(solicitudTransferenciaMaterialFormSchema) as any,
    defaultValues: {
      state: true,
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
  const { data: productosPaging } = useFetchProductos({
    params: {
      page_size: 90000,
    },
  });

  ///* mutations
  const updateRecepcionSolicitudTransferenciaMaterialMutation =
    useUpdateSolicitudTransferenciaMaterial<CreateSolicitudTransferenciaMaterialParamsBase>(
      {
        navigate,
        returnUrl: returnUrlRecepcionSolicitudTransferenciaMaterialesPage,
      },
    );
  const updateRecepcionSolicitudTransferenciaAprobarMutation =
    useUpdateSolicitudTransferenciaMaterial<CreateSolicitudTransferenciaMaterialParamsBase>(
      {
        enableNavigate: true,
        enableErrorNavigate: true,
      },
    );

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    const mappedProductos = productosDisponibles.map(producto => ({
      producto: producto.id,
      cantidad: producto.cantidad ?? 0,
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
      )?.find(
        i =>
          i.ubicacion ==
          solicitudTransferenciaMaterial?.ubicacion_origen_data?.uuid,
      );

      if (!detalles) {
        ToastWrapper.error(
          `No se encontró el producto con ID ${prod.producto}`,
        );
        return;
      }

      // Validar cantidad
      if (prod.cantidad <= 0) {
        ToastWrapper.error(
          `El producto "${detalles.codigo}" necesita cantidad.`,
        );
        return;
      } else if (validarCantidad && validarCantidad.stock < prod.cantidad) {
        ToastWrapper.error(
          `El producto "${detalles.codigo}" tiene una cantidad de ${prod.cantidad} y solo existe ${validarCantidad.stock}.`,
        );
        return;
      }
    }

    data.estado_solicitud = 'APROBADO';
    data.productos = mappedProductos;

    setConfirmDialog({
      isOpen: true,
      title: 'Solicitud de material creada',
      subtitle: '¿Desea ingresar la solicitud de este material?',
      onConfirm: () => {
        try {
          navigate(
            `${returnUrlTransferenciaMaterialesPage}/solicitud/${data.uuid}`,
            {
              state: { solicitud: 'solicitud_transferencia' },
            },
          );
          setConfirmDialogIsOpen(false);
          if (data.id !== undefined) {
            updateRecepcionSolicitudTransferenciaAprobarMutation.mutate({
              id: data.id,
              data,
            });
          }
        } catch (error) {
          setConfirmDialogIsOpen(false);
          ToastWrapper.error(`${error}`);
        }
      },
      confirmTextBtn: 'SI, CONTINUAR',
      cancelTextBtn: 'CERRAR',
      onClose: () => {
        setConfirmDialogIsOpen(false);
        updateRecepcionSolicitudTransferenciaMaterialMutation.mutate({
          id: data.id!,
          data,
        });
        navigate(returnUrlRecepcionSolicitudTransferenciaMaterialesPage);
      },
    });
  };

  const onRechazar = async (data: SaveFormData) => {
    if (!isValid) return;

    ///* upd
    if (solicitudTransferenciaMaterial?.id) {
      data.estado_solicitud = 'RECHAZADO';
      updateRecepcionSolicitudTransferenciaMaterialMutation.mutate({
        id: solicitudTransferenciaMaterial.id!,
        data,
      });
      return navigate(
        `${returnUrlRecepcionSolicitudTransferenciaMaterialesPage}`,
      );
    }
  };

  ///* effects
  useEffect(() => {
    const dataP = solicitudTransferenciaMaterial?.productos
      ?.map(prod => {
        const itemEncontrado = productosPaging?.data?.items.find(
          item => item.id === prod.producto,
        );
        return itemEncontrado
          ? {
              ...itemEncontrado,
              producto: prod.producto,
              cantidad: prod.cantidad,
              cantidad_pedida: prod.cantidad,
              cantidad_aprobada: prod.cantidad,
              ubicacion:
                solicitudTransferenciaMaterial.ubicacion_origen_data?.id,
              series: prod.series,
            }
          : null;
      })
      .filter(Boolean);

    productosEnviar(dataP?.filter(item => item !== null) || []);
    if (!solicitudTransferenciaMaterial?.id) return;
    reset(solicitudTransferenciaMaterial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

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
  const { crearMaterialColumnsSolicitud } = useColumnsProductosDisponibles();

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() =>
        navigate(returnUrlRecepcionSolicitudTransferenciaMaterialesPage)
      }
      onReject={handleSubmit(onRechazar, () => {})}
      onSave={handleSubmit(onSave, () => {})}
      saveTextBtn="Aprobar"
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
        required={false}
        disabled={true}
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
        disabled={true}
        required={false}
        size={gridSizeMdLg6}
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
        size={gridSizeMdLg6}
        onChangeRawValue={value => {
          form.setValue('ubicacion_origen', Number(value?.id));
          form.setValue('ubicacion_destino', '' as any);
          productosEnviar([]);
        }}
        required={false}
        disabled={true}
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
        disabled={true}
      />
      <CustomTextArea
        label="Observación"
        name="observacion"
        control={form.control}
        defaultValue={form.getValues().observacion}
        error={errors.observacion}
        helperText={errors.observacion?.message}
        required={false}
        disabled={true}
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
          columns={crearMaterialColumnsSolicitud}
          data={productosDisponibles || []}
          enablePagination
          density="comfortable"
        />
        <ProductosDisponiblesModal
          askADD={true}
          pk_ubicacion={
            solicitudTransferenciaMaterial?.ubicacion_origen_data?.uuid
          }
          open={openAddProducts}
          onClose={() => setOpenAddProducts(false)}
        />
      </Grid>
    </SingleFormBoxScene>
  );
};

export default SaveRecepcionSolicitudTransferenciaMaterial;

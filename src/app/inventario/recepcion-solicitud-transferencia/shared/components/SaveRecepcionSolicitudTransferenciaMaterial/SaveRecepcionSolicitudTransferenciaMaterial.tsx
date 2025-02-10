/* eslint-disable indent */
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { FiPlus } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';

import {
  CreateSolicitudTransferenciaMaterialParamsBase,
  useCreateTransferenciaMaterial,
  useFetchBodegas,
  useFetchUbicacions,
  useUpdateSolicitudTransferenciaMaterial,
} from '@/actions/app';
import {
  Bodega,
  gridSizeMdLg6,
  ToastWrapper,
  SolicitudTransferenciaMaterial,
  solicitudTransferenciaMaterialFormSchema,
  Ubicacion,
  useLoaders,
  useColumnsTransferenciaMaterial,
  ProductosDisponiblesTableType,
  Producto,
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
import { useProductosStore } from '@/store/app';
import ProductosDisponiblesModal from '@/shared/hooks/app/inventario/modals/ProductosDisponiblesModal';
import { returnUrlRecepcionSolicitudTransferenciaMaterialesPage } from '../../../pages/tables/RecepcionSolicitudTransferenciaMaterialMainPages';
import { useUiConfirmModalStore } from '@/store/ui';
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
  const [uuidUbicacion, setUUIDUbicacion] = useState<string | undefined>('');

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

  const createTransferenciaMaterialMutation = useCreateTransferenciaMaterial({
    navigate,
    returnUrl: returnUrlTransferenciaMaterialesPage,
    enableErrorNavigate: false,
  });

  const onSuccessCreateTransferencia = (
    dato: SolicitudTransferenciaMaterial,
  ) => {
    updateRecepcionSolicitudTransferenciaAprobarMutation.mutate(
      {
        id: dato.id!,
        data: dato,
      },
      {
        onSuccess: () => {
          const preparedData = {
            state: dato.state,
            observacion: dato.observacion,
            productos: dato.productos,
            bodega_origen: dato.bodega_origen,
            ubicacion_origen: dato.ubicacion_origen,
            bodega_destino: dato.bodega_destino,
            ubicacion_destino: dato.ubicacion_destino,
          };

          setConfirmDialog({
            isOpen: true,
            title: 'Solicitud de material creada',
            subtitle:
              'La solicitud ha sido creada con éxito. ¿Desea continuar con la preventa?',
            onConfirm: () => {
              setConfirmDialogIsOpen(false);
              createTransferenciaMaterialMutation.mutate(preparedData);
            },
            confirmTextBtn: 'SI, CONTINUAR',
            cancelTextBtn: 'CERRAR',
            onClose: () => {
              setConfirmDialogIsOpen(false);
              navigate(returnUrlRecepcionSolicitudTransferenciaMaterialesPage);
            },
          });
        },
        onError: error => {
          // Muestra un mensaje de error si la mutación falla
          ToastWrapper.error('Error al actualizar la recepción del material.');
          console.error('Error al actualizar:', error);
        },
      },
    );
  };

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;
    const mappedProductos = productosDisponibles.map(producto => ({
      id: producto.id,
      producto: producto.id,
      cantidad: producto.cantidad,
      cantidad_pedida: producto.cantidad,
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

    data.productos = mappedProductos as unknown as Producto[];

    onSuccessCreateTransferencia(data as SolicitudTransferenciaMaterial);

    /*
    ///* upd
    if (solicitudTransferenciaMaterial?.id) {
      data.estado_solicitud = 'APROBADO';
      setModalData(preparedData);
      setOpenModal(true);
    }
      */
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
    if (!solicitudTransferenciaMaterial?.id) return;
    reset(solicitudTransferenciaMaterial);
    productosEnviar(
      (solicitudTransferenciaMaterial?.productos as ProductosDisponiblesTableType[]) ||
        [],
    );
    setUUIDUbicacion(
      solicitudTransferenciaMaterial?.ubicacion_origen_data?.uuid,
    );
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
  const { crearMaterialColumnsRecepcion } = useColumnsTransferenciaMaterial();

  return (
    <>
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
          isLoadingData={
            isLoadingUbicacionOrigen || isRefetchingUbicacionOrigen
          }
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
            columns={crearMaterialColumnsRecepcion}
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
    </>
  );
};

export default SaveRecepcionSolicitudTransferenciaMaterial;

import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { FiPlus } from 'react-icons/fi';
import { Grid } from '@mui/material';

import {
  CreateSolicitudDevolucionParamsBase,
  CreateTransferenciaMaterialParamsBase,
  useCreateTransferenciaMaterial,
  useFetchBodegas,
  useFetchMotivoTransferencia,
  useFetchProductos,
  useFetchUbicacions,
  useUpdatesolicitudDevolucion,
} from '@/actions/app';
import {
  Bodega,
  gridSizeMdLg12,
  gridSizeMdLg6,
  MotivoTransferencia,
  ProductosDisponiblesModal,
  ProductosDisponiblesTableType,
  SolicitudDevolucion,
  ToastWrapper,
  transferenciaMaterialFormSchema,
  Ubicacion,
  useColumnsProductosDisponibles,
} from '@/shared';
import {
  CustomAutocomplete,
  CustomMinimalTable,
  CustomSingleButton,
  CustomTextArea,
  CustomTextFieldNoForm,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  SingleFormBoxScene,
} from '@/shared/components';
import { useAuthStore } from '@/store/auth';
import { useProductosStore } from '@/store/app';
import { returnUrlAprobarSolDevolucionPage } from '../../../pages/tables/AprobarSolDevolucion';

export interface SaveAprobSolDevolucionProps {
  title: string;
  aprobDevolucion?: SolicitudDevolucion;
}

type SaveFormData = CreateTransferenciaMaterialParamsBase & {};

const SaveAprobSolDevolucion: React.FC<SaveAprobSolDevolucionProps> = ({
  title,
  aprobDevolucion,
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

  const watchedBodegaDestino = form.watch('bodega_destino');
  const watchedUbicacionDestino = form.watch('ubicacion_destino');

  ///* fetch data ---------------------
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

  const updateRecepcionDevolucionAprobarMutation =
    useUpdatesolicitudDevolucion<CreateSolicitudDevolucionParamsBase>({
      enableNavigate: true,
      enableErrorNavigate: true,
      customOnSuccess: () => clearAllStore(), // solo aquí
    });

  const createTransferenciaMaterialMutation = useCreateTransferenciaMaterial({
    navigate,
    returnUrl: returnUrlAprobarSolDevolucionPage,
    enableErrorNavigate: false,
    customOnSuccess: () => clearAllStore(),
  });

  ///* handlers
  const onSave = async (data: any) => {
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
      }

      // Validaciones según `requiere_series`
      if (
        detalles.requiere_series &&
        (!prod.series || prod.series.length === 0)
      ) {
        ToastWrapper.error(`El producto "${detalles.codigo}" requiere series.`);
        return;
      } else if (
        detalles.requiere_series &&
        prod.series.length !== prod.cantidad
      ) {
        ToastWrapper.error(
          `La cantidad del producto "${detalles.nombre}" debe ser igual a la cantidad de series existente.`,
        );
        return;
      } else if (!detalles.requiere_series && prod.series.length > 0) {
        ToastWrapper.error(
          `El producto "${detalles.nombre}" no necesita series.`,
        );
        return;
      }
    }

    const preparedData = {
      state: data.state,
      observacion: data.observacion,
      motivo_transferencia: data.motivo_transferencia,
      user_create: user?.id,
      productos: mappedProductos,

      bodega_origen: aprobDevolucion?.bodega!,
      ubicacion_origen: aprobDevolucion?.ubicacion!,
      bodega_destino: data.bodega_destino,
      ubicacion_destino: data.ubicacion_destino,
    };

    try {
      createTransferenciaMaterialMutation.mutate(preparedData);
    } catch (error) {
      return;
    }
    if (aprobDevolucion) {
      aprobDevolucion.estado_solicitud = 'FINALIZADO';
      updateRecepcionDevolucionAprobarMutation.mutate({
        id: Number(aprobDevolucion.id),
        data: aprobDevolucion,
      });
    }
  };

  ///* effects
  useEffect(() => {
    const resultado = aprobDevolucion?.productos.map(d => {
      const productoEncontrado = productosPaging?.data?.items.find(
        i => i.id === d.producto,
      );
      return {
        ...d,
        ...productoEncontrado,
      };
    });

    productosEnviar(resultado!);
    form.setValue('observacion', aprobDevolucion?.observacion!);
    setUUIDUbicacion(aprobDevolucion?.ubicacion_data?.uuid);
  }, [aprobDevolucion, reset]);

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
      onCancel={() => navigate(returnUrlAprobarSolDevolucionPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomTextFieldNoForm
        label="Bodega Origen"
        size={gridSizeMdLg6}
        value={aprobDevolucion?.bodega_data?.nombre!}
        required={false}
        disabled
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
      <CustomTextFieldNoForm
        label="Ubicacion Origen"
        size={gridSizeMdLg6}
        value={aprobDevolucion?.ubicacion_data?.nombre!}
        required={false}
        disabled
      />
      <CustomAutocomplete<Ubicacion>
        label="Ubicacion Destino"
        name="ubicacion_destino"
        defaultValue={form.getValues().ubicacion_destino || ''}
        // options
        valueKey="nombre"
        actualValueKey="id"
        options={
          aprobDevolucion?.bodega === watchedBodegaDestino
            ? ubicacionDestinoPaging?.data.items.filter(
              item => item.id !== aprobDevolucion?.ubicacion,
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
        {!!aprobDevolucion?.ubicacion_data?.uuid &&
          !!watchedUbicacionDestino && (
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

export default SaveAprobSolDevolucion;

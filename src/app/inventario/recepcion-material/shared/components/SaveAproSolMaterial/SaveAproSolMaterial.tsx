import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { FiPlus } from 'react-icons/fi';
import { Grid } from '@mui/material';

import {
  CreatesolicitudMaterialParamsBase,
  CreateTransferenciaMaterialParamsBase,
  useCreateTransferenciaMaterial,
  useFetchBodegas,
  useFetchMotivoTransferencia,
  useFetchProductos,
  useFetchUbicacions,
  useUpdatesolicitudMaterial,
} from '@/actions/app';
import {
  Bodega,
  gridSizeMdLg12,
  gridSizeMdLg6,
  MotivoTransferencia,
  ProductosDisponiblesModal,
  ProductosDisponiblesTableType,
  SolicitudMaterial,
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
import { returnUrlAprobarSolMaterialPage } from '../../../pages/tables/AprobarSolMaterial';

export interface SaveAprobSolMaterialProps {
  title: string;
  aprobMaterial?: SolicitudMaterial;
}

type SaveFormData = CreateTransferenciaMaterialParamsBase & {};

const SaveAprobSolMaterial: React.FC<SaveAprobSolMaterialProps> = ({
  title,
  aprobMaterial,
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
  const watchedUbicacionOrigen = form.watch('ubicacion_origen');

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
  const updateRecepcionMaterialAprobarMutation =
    useUpdatesolicitudMaterial<CreatesolicitudMaterialParamsBase>({
      enableNavigate: true,
      enableErrorNavigate: true,
      customOnSuccess: () => clearAllStore(),
    });

  const createTransferenciaMaterialMutation = useCreateTransferenciaMaterial({
    navigate,
    returnUrl: returnUrlAprobarSolMaterialPage,
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

      bodega_origen: data.bodega_origen,
      ubicacion_origen: data.ubicacion_origen,
      bodega_destino: aprobMaterial?.bodega!,
      ubicacion_destino: aprobMaterial?.ubicacion!,
    };

    try {
      createTransferenciaMaterialMutation.mutate(preparedData);
    } catch (error) {
      return;
    }

    if (aprobMaterial) {
      aprobMaterial.estado_solicitud = 'FINALIZADO';
      updateRecepcionMaterialAprobarMutation.mutate({
        id: Number(aprobMaterial.id),
        data: aprobMaterial,
      });
    }
  };

  ///* effects
  useEffect(() => {
    const resultado = aprobMaterial?.productos.map(d => {
      const productoEncontrado = productosPaging?.data?.items.find(
        i => i.id === d.producto,
      );
      return {
        ...d,
        ...productoEncontrado,
      };
    });

    productosEnviar(resultado!);
    form.setValue('observacion', aprobMaterial?.observacion!);
  }, [aprobMaterial, reset]);

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
      onCancel={() => navigate(returnUrlAprobarSolMaterialPage)}
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
      <CustomTextFieldNoForm
        label="Bodega Destino"
        size={gridSizeMdLg6}
        value={aprobMaterial?.bodega_data?.nombre!}
        required={false}
        disabled
      />
      <CustomAutocomplete<Ubicacion>
        label="Ubicacion Origen"
        name="ubicacion_origen"
        defaultValue={form.getValues().ubicacion_origen || ''}
        // options
        valueKey="nombre"
        actualValueKey="id"
        options={
          aprobMaterial?.bodega === watchedBodegaOrigen
            ? ubicacionOrigenPaging?.data.items.filter(
              item => item.id !== aprobMaterial?.ubicacion,
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
      <CustomTextFieldNoForm
        label="Ubicacion Destino"
        size={gridSizeMdLg6}
        value={aprobMaterial?.ubicacion_data?.nombre!}
        required={false}
        disabled
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
        {!!watchedUbicacionOrigen && !!aprobMaterial?.ubicacion_data?.uuid && (
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
          //enablePagination
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

export default SaveAprobSolMaterial;

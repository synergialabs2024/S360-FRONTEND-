import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { FiPlus } from 'react-icons/fi';
import { Grid } from '@mui/material';

import {
  CreateIngresoMaterialParamsBase,
  CreateSolicitudCompraParamsBase,
  useCreateIngresoMaterial,
  useFetchMotivoIngreso,
  useFetchProductos,
  useFetchUbicacions,
  useUpdatesolicitudCompra,
} from '@/actions/app';
import {
  gridSizeMdLg4,
  ingresoMaterialFormSchema,
  MotivoIngreso,
  ProductosDisponiblesModal,
  ProductosDisponiblesTableType,
  SolicitudCompra,
  ToastWrapper,
  useColumnsProductosDisponibles,
  useLoaders,
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
import { returnUrlAprobarSolCompraPage } from '../../../pages/tables/AprobarSolCompra';

export interface SaveAprobSolCompraProps {
  title: string;
  aprobCompra?: SolicitudCompra;
}

type SaveFormData = CreateIngresoMaterialParamsBase & {};

const SaveAprobSolCompra: React.FC<SaveAprobSolCompraProps> = ({
  title,
  aprobCompra,
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
    resolver: yupResolver(ingresoMaterialFormSchema) as any,
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

  const watchedBodega = form.watch('bodega');
  const watchedUbicacion = form.watch('ubicacion');

  ///* fetch data ---------------------
  const {
    data: ubicacionesPaging,
    isLoading: isLoadingUbicaciones,
    isRefetching: isRefetchingUbicaciones,
  } = useFetchUbicacions({
    enabled: !!watchedBodega,
    params: {
      page_size: 1200,
      bodega: watchedBodega!,
    },
  });

  const {
    data: motivoIngresoPaging,
    isLoading: isLoadingMotivoIngreso,
    isRefetching: isRefetchingMotivoIngreso,
  } = useFetchMotivoIngreso({
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
  const createIngresoMaterialMutation = useCreateIngresoMaterial({
    navigate,
    returnUrl: returnUrlAprobarSolCompraPage,
    enableErrorNavigate: false,
    customOnSuccess: () => clearAllStore(),
  });
  const updateRecepcionCompraAprobarMutation =
    useUpdatesolicitudCompra<CreateSolicitudCompraParamsBase>({
      enableNavigate: true,
      enableErrorNavigate: true,
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
      bodega: data.bodega,
      ubicacion: data.ubicacion,
      motivo_ingreso: data.motivo_ingreso,
      user_create: user?.id,
      productos: mappedProductos,
    };

    try {
      createIngresoMaterialMutation.mutate(preparedData);
    } catch (error) {
      return;
    }
    data.estado_solicitud = 'FINALIZADO';
    updateRecepcionCompraAprobarMutation.mutate({
      id: data.id,
      data,
    });
  };

  ///* effects
  useEffect(() => {
    const dataP = aprobCompra?.productos
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
            series: prod.series,
          }
          : null;
      })
      .filter(Boolean);
    productosEnviar(dataP?.filter(item => item !== null) || []);
    if (!aprobCompra) return;
    reset(aprobCompra);
    setUUIDUbicacion(aprobCompra.ubicacion_data?.uuid);
  }, [aprobCompra, reset]);

  useEffect(() => {
    if (isLoadingUbicaciones || isRefetchingUbicaciones || !watchedBodega)
      return;
    !ubicacionesPaging?.data?.items?.length &&
      ToastWrapper.error(
        'No se encontraron ubicaciones para la bodega seleccionada',
      );
  }, [
    watchedBodega,
    ubicacionesPaging,
    isLoadingUbicaciones,
    isRefetchingUbicaciones,
  ]);

  const customLoader = isLoadingUbicaciones || isRefetchingUbicaciones;
  useLoaders(customLoader);

  ///* columns --------------------
  const { crearMaterialColumnsIngreso } = useColumnsProductosDisponibles();

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlAprobarSolCompraPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomTextFieldNoForm
        label="Bodega"
        size={gridSizeMdLg4}
        value={aprobCompra?.bodega_data?.nombre!}
        required={false}
        disabled
      />
      <CustomTextFieldNoForm
        label="Bodega"
        size={gridSizeMdLg4}
        value={aprobCompra?.ubicacion_data?.nombre!}
        required={false}
        disabled
      />
      <CustomAutocomplete<MotivoIngreso>
        label="Motivo Ingreso"
        name="motivo_ingreso"
        defaultValue={form.getValues().motivo_ingreso}
        // options
        valueKey="nombre"
        actualValueKey="id"
        options={motivoIngresoPaging?.data.items || []}
        isLoadingData={isLoadingMotivoIngreso || isRefetchingMotivoIngreso}
        disableClearable
        // errors
        control={form.control}
        error={errors.motivo_ingreso as any}
        helperText={errors.motivo_ingreso?.message}
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
        {!!watchedUbicacion && (
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
      </Grid>
      <CustomMinimalTable<ProductosDisponiblesTableType>
        columns={crearMaterialColumnsIngreso}
        data={productosDisponibles || []}
        //enablePagination
        density="comfortable"
      />
      <ProductosDisponiblesModal
        askADD={false}
        pk_ubicacion={uuidUbicacion}
        open={openAddProducts}
        onClose={() => setOpenAddProducts(false)}
      />
    </SingleFormBoxScene>
  );
};

export default SaveAprobSolCompra;

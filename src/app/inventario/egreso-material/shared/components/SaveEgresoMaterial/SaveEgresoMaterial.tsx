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
  useFetchBodegas,
  useFetchProductos,
  useFetchUbicacions,
  useFetchMotivoEgreso,
  useCreateEgresoMaterial,
  CreateEgresoMaterialParamsBase,
} from '@/actions/app';
import {
  Bodega,
  Ubicacion,
  useLoaders,
  ToastWrapper,
  MotivoEgreso,
  gridSizeMdLg4,
  EgresoMaterial,
  PermissionsEnum,
  egresoMaterialFormSchema,
  ProductosDisponiblesModal,
  ProductosDisponiblesTableType,
  useColumnsProductosDisponibles,
} from '@/shared';
import { useAuthStore } from '@/store/auth';
import { useProductosStore } from '@/store/app';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCheckPermission } from '@/shared/hooks/auth';
import { returnUrlEgresoMaterialesPage } from '../../../pages/tables/EgresoMaterialesPage';

export interface SaveEgresoMaterialProps {
  title: string;
  egresoMaterial?: EgresoMaterial;
}

type SaveFormData = CreateEgresoMaterialParamsBase & {};

const SaveEgresoMaterial: React.FC<SaveEgresoMaterialProps> = ({ title }) => {
  const user = useAuthStore(s => s.user);

  useCheckPermission(PermissionsEnum.inventario_view_egresomaterial);

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
    resolver: yupResolver(egresoMaterialFormSchema) as any,
    defaultValues: {
      state: true,
      user_create: user?.id,
    },
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const watchedBodega = form.watch('bodega');
  const watchedUbicacion = form.watch('ubicacion');

  ///* fetch data ---------------------
  const {
    data: bodegasPagingRes,
    isLoading: isLoadingBodegas,
    isRefetching: isRefetchingBodegas,
  } = useFetchBodegas({
    params: {
      page_size: 600,
    },
  });
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
    data: motivoEgresoPaging,
    isLoading: isLoadingMotivoEgreso,
    isRefetching: isRefetchingMotivoEgreso,
  } = useFetchMotivoEgreso({
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
  const createEgresoMaterialMutation = useCreateEgresoMaterial({
    navigate,
    returnUrl: returnUrlEgresoMaterialesPage,
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
          `El producto "${detalles.codigo}" debe tener una cantidad de series de ${prod.cantidad}.`,
        );
        return;
      }
    }

    const preparedData = {
      ...data,
      productos: mappedProductos,
    };

    createEgresoMaterialMutation.mutate(preparedData);
  };

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
      onCancel={() => navigate(returnUrlEgresoMaterialesPage)}
      onSave={handleSubmit(onSave, () => {})}
    >
      <CustomAutocomplete<Bodega>
        label="Bodega"
        name="bodega"
        // options
        options={bodegasPagingRes?.data?.items || []}
        valueKey="nombre"
        actualValueKey="id"
        defaultValue={form.getValues().bodega}
        isLoadingData={isLoadingBodegas || isRefetchingBodegas}
        // vaidation
        control={form.control}
        error={errors.bodega}
        helperText={errors.bodega?.message}
        onChangeRawValue={() => {
          form.setValue('ubicacion', '' as any);
          productosEnviar([]);
        }}
        size={gridSizeMdLg4}
      />
      <CustomAutocomplete<Ubicacion>
        label="Ubicacion"
        name="ubicacion"
        defaultValue={form.getValues().ubicacion || ''}
        // options
        valueKey="nombre"
        actualValueKey="id"
        options={ubicacionesPaging?.data.items || []}
        isLoadingData={isLoadingUbicaciones || isRefetchingUbicaciones}
        disableClearable
        // errors
        control={form.control}
        error={errors.ubicacion as any}
        helperText={errors.ubicacion?.message}
        size={gridSizeMdLg4}
        onChangeRawValue={row => {
          setUUIDUbicacion(row?.uuid);
          productosEnviar([]);
        }}
      />
      <CustomAutocomplete<MotivoEgreso>
        label="Motivo Egreso"
        name="motivo_egreso"
        defaultValue={form.getValues().motivo_egreso}
        // options
        valueKey="nombre"
        actualValueKey="id"
        options={motivoEgresoPaging?.data.items || []}
        isLoadingData={isLoadingMotivoEgreso || isRefetchingMotivoEgreso}
        disableClearable
        // errors
        control={form.control}
        error={errors.motivo_egreso as any}
        helperText={errors.motivo_egreso?.message}
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

export default SaveEgresoMaterial;

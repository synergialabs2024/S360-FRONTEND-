import { FiPlus } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

import {
  CreateIngresoMaterialParamsBase,
  useFetchBodegas,
  useFetchUbicacions,
} from '@/actions/app';
import {
  Bodega,
  IngresoMaterial,
  ingresoMaterialFormSchema,
  gridSizeMdLg6,
  Ubicacion,
  Producto,
  ToastWrapper,
} from '@/shared';

import {
  CustomAutocomplete,
  CustomMinimalTable,
  CustomSingleButton,
  CustomTextArea,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  SampleCheckbox,
  SingleFormBoxScene,
} from '@/shared/components';

import { useProductosStore } from '@/store/app/inventario/productos-disponible.store';
import { yupResolver } from '@hookform/resolvers/yup';
import { returnUrlSolicitudMaterialPage } from '../../../pages/tables/SolicitudMaterialMainPage';
import { useColumnsProductosDisponibles } from '@/app/inventario/ingreso-material/shared/hooks';
import ProductosDisponiblesModal from '@/app/inventario/ingreso-material/pages/modal/ProductosDisponiblesModal';
import { useCreateSolicitudMaterial } from '@/actions/app/inventario/solicitud-material';

export interface SaveIngresoMaterialProps {
  title: string;
  ingresoMaterial?: IngresoMaterial;
}

export type ProductosDisponiblesTableType = Producto & {
  usedQuantity: number;

  containsSeries: boolean;
  selectedSeries: string[];
  savedSeries: string[];
  cantidad?: number;
  series?: any[];
  productos?: string[];
};

type SaveFormData = CreateIngresoMaterialParamsBase & {};

const SaveSolicitudMaterial: React.FC<SaveIngresoMaterialProps> = ({
  title,
  ingresoMaterial,
}) => {
  ///* local state --------------------
  const [openAddProducts, setOpenAddProducts] = useState<boolean>(false);

  ///* global state --------------------
  const productosDisponibles = useProductosStore(s => s.productosDisponibles);
  const productosEnviar = useProductosStore(s => s.setProductosDisponibles);

  ///* hooks ---------------
  const navigate = useNavigate();

  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(ingresoMaterialFormSchema) as any,
    defaultValues: {
      state: true,
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

  ///* mutations
  const createIngresoMaterialMutation = useCreateSolicitudMaterial({
    navigate,
    returnUrl: returnUrlSolicitudMaterialPage,
    enableErrorNavigate: false,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    const mappedProductos = productosDisponibles.map(producto => ({
      ...producto,
      producto: producto.id,
      series: producto.series ? producto.series : [],
    }));

    if (mappedProductos.length === 0) {
      ToastWrapper.error('Campo Productos es requerido');
      return;
    }
    const preparedData = {
      ...data,
      productos: mappedProductos,
    };
    createIngresoMaterialMutation.mutate(preparedData);
  };

  ///* effects
  useEffect(() => {
    if (ingresoMaterial?.productos) {
      const productosTransformados = ingresoMaterial.productos.map(
        producto => ({
          ...producto,
          usedQuantity: 0,
          containsSeries: false,
          selectedSeries: [],
          savedSeries: [],
        }),
      );

      productosEnviar(productosTransformados);
    }
    reset(ingresoMaterial);
  }, [ingresoMaterial, reset, productosEnviar]);

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

  ///* columns --------------------
  const { crearMaterialColumns } = useColumnsProductosDisponibles();

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlSolicitudMaterialPage)}
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
        size={gridSizeMdLg6}
        onChangeRawValue={() => {
          productosEnviar([]);
        }}
      />
      <SampleCheckbox
        label="state"
        name="state"
        control={form.control}
        defaultValue={form.getValues().state}
        isState
        size={gridSizeMdLg6}
      />
      {/* ==================== PRODUCTS ==================== */}
      {!!watchedUbicacion && (
        <>
          <CustomTypoLabel
            text="Productos"
            pt={CustomTypoLabelEnum.ptMiddlePosition}
          />
          <Grid container justifyContent="flex-end">
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
          </Grid>
          <CustomMinimalTable<ProductosDisponiblesTableType>
            columns={crearMaterialColumns}
            data={productosDisponibles || []}
            enablePagination
            density="comfortable"
          />
          <ProductosDisponiblesModal
            open={openAddProducts}
            onClose={() => setOpenAddProducts(false)}
          />
        </>
      )}
      <CustomTextArea
        label="Observación"
        name="observacion"
        control={form.control}
        defaultValue={form.getValues().observacion}
        error={errors.observacion}
        helperText={errors.observacion?.message}
        required={false}
      />
    </SingleFormBoxScene>
  );
};

export default SaveSolicitudMaterial;

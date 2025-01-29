import { FiPlus } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

import {
  CreateEgresoMaterialParamsBase,
  useCreateEgresoMaterial,
  useFetchBodegas,
  useFetchUbicacions,
} from '@/actions/app';
import {
  Bodega,
  EgresoMaterial,
  egresoMaterialFormSchema,
  gridSizeMdLg6,
  Ubicacion,
  ToastWrapper,
  PermissionsEnum,
} from '@/shared';
import { returnUrlEgresoMaterialesPage } from '../../../pages/tables/EgresoMaterialesPage';
import {
  CustomAutocomplete,
  CustomMinimalTable,
  CustomSingleButton,
  CustomTextArea,
  CustomTypoLabel,
  CustomTypoLabelEnum,
  SingleFormBoxScene,
} from '@/shared/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useProductosStore } from '@/store/app';

import { useCheckPermission } from '@/shared/hooks/auth';
import ProductosDisponiblesModal from '@/app/inventario/ingreso-material/pages/modal/ProductosDisponiblesModal';
import {
  ProductosDisponiblesTableType,
  useColumnsProductosDisponibles,
} from '@/app/inventario/ingreso-material/shared/hooks';

export interface SaveEgresoMaterialProps {
  title: string;
  egresoMaterial?: EgresoMaterial;
}

type SaveFormData = CreateEgresoMaterialParamsBase & {};

const SaveEgresoMaterial: React.FC<SaveEgresoMaterialProps> = ({ title }) => {
  useCheckPermission(PermissionsEnum.inventario_view_egresomaterial);

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
    resolver: yupResolver(egresoMaterialFormSchema) as any,
    defaultValues: {
      state: true,
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

  ///* mutations
  const createEgresoMaterialMutation = useCreateEgresoMaterial({
    navigate,
    returnUrl: returnUrlEgresoMaterialesPage,
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
      stock_up: producto.stock_up || 0,
    }));

    let hasError = false;

    for (const producto of mappedProductos) {
      if (producto.stock_up <= 0) {
        ToastWrapper.error(
          `
            El producto de código ${producto.codigo} no
            puede ser procesado porque su stock actual es 0 o menor.
          `,
        );
        return;
      }
    }

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

    mappedProductos.forEach(producto => {
      const cantidad = producto.cantidad ?? 0;
      if (cantidad > producto.stock_up) {
        ToastWrapper.error(
          `
            El producto de ${producto.codigo}
            tiene una cantidad ${cantidad} mayor que el stock actual
            ${producto.stock_up}.
          `,
        );
        hasError = true;
      }
    });

    if (hasError) {
      return;
    }

    if (mappedProductos.length === 0) {
      ToastWrapper.error('Campo Productos es requerido');
      return;
    }

    const preparedData = {
      ...data,
      productos: mappedProductos,
    };

    createEgresoMaterialMutation.mutate(preparedData);
    productosEnviar([]);
  };

  ///* effects
  useEffect(() => {
    productosEnviar([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        size={gridSizeMdLg6}
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
        onChangeRawValue={row => {
          setUUIDUbicacion(row?.uuid);
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

export default SaveEgresoMaterial;

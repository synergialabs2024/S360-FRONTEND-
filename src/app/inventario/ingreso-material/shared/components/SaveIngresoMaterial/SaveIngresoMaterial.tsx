import {
  CreateIngresoMaterialParamsBase,
  useCreateIngresoMaterial,
  useFetchBodegas,
  useFetchUbicacions,
  useUpdateIngresoMaterial,
} from '@/actions/app';
import {
  Bodega,
  IngresoMaterial,
  ingresoMaterialFormSchema,
  gridSizeMdLg6,
  Ubicacion,
  UbicacionProducto,
  ToastWrapper,
} from '@/shared';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { returnUrlIngresoMaterialesPage } from '../../../pages/tables/IngresoMaterialesPage';
import { useEffect, useState } from 'react';
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
import { Grid } from '@mui/material';
import { FiPlus } from 'react-icons/fi';
import ProductosDisponiblesModal from '../../../pages/modal/ProductosDisponiblesModal';
import { useColumnsProductosDisponibles } from '../../hooks';
import { useProductosStore } from '@/store/app/inventario/productos-disponible.store';

export interface SaveIngresoMaterialProps {
  title: string;
  ingresoMaterial?: IngresoMaterial;
}

export type ProductosDisponiblesTableType = UbicacionProducto & {
  usedQuantity: number;

  containsSeries: boolean;
  selectedSeries: string[];
  savedSeries: string[];
  cantidad?: number;
};

type SaveFormData = CreateIngresoMaterialParamsBase & {};

const SaveIngresoMaterial: React.FC<SaveIngresoMaterialProps> = ({
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
  /*
  const watchedProductos = form.watch('productos');

  console.log(watchedProductos);
  */
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
  const createIngresoMaterialMutation = useCreateIngresoMaterial({
    navigate,
    returnUrl: returnUrlIngresoMaterialesPage,
    enableErrorNavigate: false,
  });
  const updateIngresoMaterialMutation =
    useUpdateIngresoMaterial<CreateIngresoMaterialParamsBase>({
      navigate,
      returnUrl: returnUrlIngresoMaterialesPage,
    });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    if (productosDisponibles.length === 0) {
      ToastWrapper.error('La Tabla Productos no puede estar vacia');
      return;
    }

    for (const producto of productosDisponibles) {
      if (
        producto.cantidad === undefined ||
        isNaN(producto.cantidad) ||
        producto.cantidad === 0
      ) {
        ToastWrapper.error('El campo cantidad de la tabla es requerido');
        return;
      }
    }
    const data2 = {
      ...data,
      productos: productosDisponibles,
    };

    ///* upd
    if (ingresoMaterial?.id) {
      updateIngresoMaterialMutation.mutate({
        id: ingresoMaterial.id!,
        data: data2,
      });
      return;
    }

    ///* create
    createIngresoMaterialMutation.mutate({
      ...data,
      productos: productosDisponibles,
    });
  };

  ///* effects
  useEffect(() => {
    if (!ingresoMaterial?.id) return;
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

  ///* columns --------------------
  const { crearMaterialColumns } = useColumnsProductosDisponibles();

  return (
    <SingleFormBoxScene
      titlePage={title}
      onCancel={() => navigate(returnUrlIngresoMaterialesPage)}
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
            ubicacionIngresoMaterial={watchedUbicacion}
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

export default SaveIngresoMaterial;

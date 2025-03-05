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
  gridSizeMdLg6,
  Ubicacion,
  solicitudMaterialFormSchema,
  ProductosDisponiblesModal,
  useColumnsProductosDisponibles,
  ProductosDisponiblesTableType,
} from '@/shared';
import { returnUrlIngresoMaterialesPage } from '../inventario/ingreso-material/pages/tables/IngresoMaterialesPage';
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
import { yupResolver } from '@hookform/resolvers/yup';
import { useProductosStore } from '@/store/app/inventario/productos-disponible.store';
import { useCreateSolicitudMaterial } from '@/actions/app/inventario/solicitud-material';

export interface SaveSolicitudMaterialProps {
  title: string;
  ingresoMaterial?: IngresoMaterial;
}

type SaveFormData = CreateIngresoMaterialParamsBase & {};

const SolicitudMaterial: React.FC<SaveSolicitudMaterialProps> = ({
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
    resolver: yupResolver(solicitudMaterialFormSchema) as any,
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
    returnUrl: returnUrlIngresoMaterialesPage,
    enableErrorNavigate: false,
  });

  /*   const updateIngresoMaterialMutation =
      useUpdateIngresoMaterial<CreateSolicitudMaterialParams>({
        navigate,
        returnUrl: returnUrlIngresoMaterialesPage,
      }); */

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    const mappedProductos = productosDisponibles.map(producto => ({
      ...producto,
      producto: producto.id,
      series: producto.series ? producto.series : [],
    }));

    const preparedData = {
      ...data,
      productos: mappedProductos,
    };
    //console.log("preparedData", preparedData);

    createIngresoMaterialMutation.mutate(preparedData);
  };

  ///* effects
  useEffect(() => {
    if (!ingresoMaterial?.id) return;

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
            askADD={true}
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

export default SolicitudMaterial;

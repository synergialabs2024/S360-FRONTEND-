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
  UbicacionProducto,
} from '@/shared';
import { returnUrlEgresoMaterialesPage } from '../../../pages/tables/EgresoMaterialesPage';
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
import { useUbicacionProductosStore } from '@/store/app';
import { useColumnsUbicacionProductosDisponibles } from '../../hooks';
import UbicacionProductosDisponiblesModal from '../../../pages/modal/UbicacionProductosDisponiblesModal';

export interface SaveEgresoMaterialProps {
  title: string;
  egresoMaterial?: EgresoMaterial;
}

export type UbicacionProductosDisponiblesTableType = UbicacionProducto & {
  usedQuantity: number;

  containsSeries: boolean;
  selectedSeries: string[];
  savedSeries: string[];
  cantidad?: number;
  series?: any[];
  productos?: string[];
};

type SaveFormData = CreateEgresoMaterialParamsBase & {};

const SaveEgresoMaterial: React.FC<SaveEgresoMaterialProps> = ({
  title,
  egresoMaterial,
}) => {
  ///* local state --------------------
  const [openAddProducts, setOpenAddProducts] = useState<boolean>(false);

  ///* global state --------------------
  const ubicacionProductosDisponibles = useUbicacionProductosStore(
    s => s.ubicacionProductosDisponibles,
  );
  const ubicacionProductosEnviar = useUbicacionProductosStore(
    s => s.setUbicacionProductosDisponibles,
  );

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
  const createEgresoMaterialMutation = useCreateEgresoMaterial({
    navigate,
    returnUrl: returnUrlEgresoMaterialesPage,
    enableErrorNavigate: false,
  });

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    const mappedProductos = ubicacionProductosDisponibles.map(
      ubicacionproducto => ({
        ...ubicacionproducto,
        series: ubicacionproducto.series ? ubicacionproducto.series : [],
      }),
    );

    if (mappedProductos.length === 0) {
      ToastWrapper.error('Campo Productos es requerido');
      return;
    }
    const preparedData = {
      ...data,
      productos: mappedProductos,
    };

    createEgresoMaterialMutation.mutate(preparedData);
  };

  ///* effects
  useEffect(() => {
    if (egresoMaterial?.productos) {
      const productosTransformados = egresoMaterial.productos.map(producto => ({
        ...producto,
        usedQuantity: 0,
        containsSeries: false,
        selectedSeries: [],
        savedSeries: [],
      }));

      ubicacionProductosEnviar(productosTransformados);
    }

    reset(egresoMaterial);
  }, [egresoMaterial, reset, ubicacionProductosEnviar]);

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
  const { crearMaterialColumns } = useColumnsUbicacionProductosDisponibles();

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
          ubicacionProductosEnviar([]);
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
          ubicacionProductosEnviar([]);
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
          <CustomMinimalTable<UbicacionProductosDisponiblesTableType>
            columns={crearMaterialColumns}
            data={ubicacionProductosDisponibles || []}
            enablePagination
            density="comfortable"
          />
          <UbicacionProductosDisponiblesModal
            pk_ubicacion={watchedUbicacion}
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

export default SaveEgresoMaterial;

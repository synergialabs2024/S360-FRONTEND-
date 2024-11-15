import { UseFormReturn } from 'react-hook-form';

import {
  useFetchBodegas,
  useFetchCategoriaProductos,
  useFetchUbicacions,
} from '@/actions/app';
import {
  Bodega,
  CategoriaProducto,
  gridSizeMdLg4,
  LineaServicio,
  Ubicacion,
} from '@/shared';
import {
  CustomAutocomplete,
  CustomSingleButton,
  CustomToggleSection,
} from '@/shared/components';
import { Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import ClienteFibraRubroLibreHeader from './ClienteFibraRubroLibreHeader';
import { RubrosClienteFormData } from './ClienteFibraRubroLibreModal';

export type ClienteFibraRubroLibreItemsTableProps = {
  serviceLine: LineaServicio;
  form: UseFormReturn<RubrosClienteFormData>;
};

const ClienteFibraRubroLibreItemsTable: React.FC<
  ClienteFibraRubroLibreItemsTableProps
> = ({ form, serviceLine }) => {
  ///* local state ----------------
  const [showTable, setShowTable] = useState<boolean>(false);

  ///* form ----------------
  const watchedBodega = form.watch('bodega');
  const { errors } = form.formState;

  ///* fetch data ----------------
  const {
    data: bodegasPaging,
    isLoading: isLoadingBodegas,
    isRefetching: isRefetchingBodegas,
  } = useFetchBodegas({
    enabled: !!serviceLine?.uuid && showTable,
    params: {
      page_size: 1200,
    },
  });
  const {
    data: ubicacionesPaging,
    isLoading: isLoadingUbicaciones,
    isRefetching: isRefetchingUbicaciones,
  } = useFetchUbicacions({
    enabled: !!serviceLine?.uuid && !!watchedBodega && showTable,
    params: {
      page_size: 1200,
      bodega: watchedBodega!,
    },
  });
  const {
    data: productCategoryPaging,
    isLoading: isLoadingCategoryProduct,
    isRefetching: isRefetchingCategoryProduct,
  } = useFetchCategoriaProductos({
    enabled: !!serviceLine?.uuid && showTable,
    params: {
      page_size: 900,
    },
  });

  ///* handlers ----------------
  const onAddEmptyLine = () => {
    console.log('add empty line');
  };

  return (
    <Grid item xs={12}>
      {/* ==================== headers ==================== */}
      <ClienteFibraRubroLibreHeader form={form} serviceLine={serviceLine} />

      {/* ==================== butons ==================== */}
      <Grid
        item
        container
        xs={12}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item>
          <Typography variant="h6">Detalle:</Typography>
        </Grid>

        <Grid item>
          <Grid container spacing={1}>
            <Grid item>
              <CustomSingleButton
                label="AGREGAR LINEA"
                justifyContent="flex-end"
                onClick={onAddEmptyLine}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <CustomSingleButton
                justifyContent="flex-end"
                label="AGREGAR PRODUCTO"
                variant="contained"
                startIcon={<FiPlus />}
                onClick={() => {
                  setShowTable(true);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* ==================== table ==================== */}
      <>
        {showTable && (
          <>
            <Grid item container xs={12} mb={4} spacing={3}>
              <CustomToggleSection sectionTitle="Productos disponibles">
                <Grid item container xs={12} spacing={3}>
                  <CustomAutocomplete<Bodega>
                    label="Bodega"
                    name="bodega"
                    defaultValue={form.getValues().bodega || ''}
                    // options
                    valueKey="nombre"
                    actualValueKey="id"
                    options={bodegasPaging?.data.items || []}
                    isLoadingData={isLoadingBodegas || isRefetchingBodegas}
                    disableClearable
                    // errors
                    control={form.control}
                    error={errors.bodega as any}
                    helperText={errors.bodega?.message}
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
                    isLoadingData={
                      isLoadingUbicaciones || isRefetchingUbicaciones
                    }
                    disableClearable
                    // errors
                    control={form.control}
                    error={errors.ubicacion as any}
                    helperText={errors.ubicacion?.message}
                    size={gridSizeMdLg4}
                  />

                  <CustomAutocomplete<CategoriaProducto>
                    label="Categoría Producto"
                    name="categoria_producto"
                    defaultValue={form.getValues().categoria_producto || ''}
                    // options
                    valueKey="nombre"
                    actualValueKey="id"
                    options={productCategoryPaging?.data.items || []}
                    isLoadingData={
                      isLoadingCategoryProduct || isRefetchingCategoryProduct
                    }
                    disableClearable
                    // errors
                    control={form.control}
                    error={errors.categoria_producto as any}
                    helperText={errors.categoria_producto?.message}
                    size={gridSizeMdLg4}
                  />
                </Grid>
              </CustomToggleSection>
            </Grid>
          </>
        )}
      </>
    </Grid>
  );
};

export default ClienteFibraRubroLibreItemsTable;

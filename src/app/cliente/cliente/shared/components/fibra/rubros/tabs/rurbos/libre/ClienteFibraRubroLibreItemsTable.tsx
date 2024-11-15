import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';
import { IoMdAddCircle } from 'react-icons/io';

import {
  useFetchBodegas,
  useFetchCategoriaProductos,
  useFetchUbicacionProductos,
  useFetchUbicacions,
} from '@/actions/app';
import {
  Bodega,
  CategoriaProducto,
  gridSizeMdLg4,
  LineaServicio,
  TABLE_CONSTANTS,
  ToastWrapper,
  Ubicacion,
  UbicacionProducto,
  useColumnsUbicacionProducto,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomAutocomplete,
  CustomMinimalTable,
  CustomSingleButton,
  CustomTable,
  CustomToggleSection,
} from '@/shared/components';
import { InstalacionesStoreKey, useInstalacionesStore } from '@/store/app';
import ClienteFibraRubroLibreHeader from './ClienteFibraRubroLibreHeader';
import { RubrosClienteFormData } from './ClienteFibraRubroLibreModal';

export type ClienteFibraRubroLibreItemsTableProps = {
  serviceLine: LineaServicio;
  form: UseFormReturn<RubrosClienteFormData>;
};

export type ClienteRubroLibreTableType = UbicacionProducto & {};

const ClienteFibraRubroLibreItemsTable: React.FC<
  ClienteFibraRubroLibreItemsTableProps
> = ({ form, serviceLine }) => {
  ///* hooks ---------------------
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();
  const { pagination, setPagination } = useTableFilter();
  const { pageIndex, pageSize } = pagination;

  ///* local state ----------------
  const [showTable, setShowTable] = useState<boolean>(false);

  ///* global state ----------------
  const addSelectedItem = useInstalacionesStore(s => s.addSelectedItem);
  const selectedItems = useInstalacionesStore(s => s.equiposUtilizados);

  ///* form ----------------
  const { errors } = form.formState;
  const watchedBodega = form.watch('bodega');
  const watchedUbicacion = form.watch('ubicacion');
  const watchedCategoriaProducto = form.watch('categoria_producto');

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
  const {
    data: itemsDisponiblesPaging,
    isLoading: isLoadingItemsDisponibles,
    isRefetching: isRefetchingItemsDisponibles,
  } = useFetchUbicacionProductos({
    enabled: !!showTable && !!watchedUbicacion,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,

      ...filterObject,

      producto__categoria__pk: watchedCategoriaProducto,

      ubicacion: watchedUbicacion!,
    },
  });

  ///* handlers ----------------
  const onAddEmptyLine = () => {
    console.log('add empty line');
  };

  ///* columns ----------------
  const {
    baseColumnsUbicacionProducto,
    baseColumnsRubroClienteUbicacionProducto,
  } = useColumnsUbicacionProducto();

  ///* effects ----------------
  // alerts ---------
  useEffect(() => {
    if (!showTable) return;

    if (isLoadingBodegas || isRefetchingBodegas) return;
    if (
      !isLoadingBodegas &&
      !isRefetchingBodegas &&
      bodegasPaging?.data?.items &&
      bodegasPaging.data.items.length === 0
    ) {
      ToastWrapper.error('No se encontraron bodegas');
    }

    if (isLoadingUbicaciones || isRefetchingUbicaciones) return;
    if (
      !isLoadingUbicaciones &&
      !isRefetchingUbicaciones &&
      ubicacionesPaging?.data?.items &&
      ubicacionesPaging.data.items.length === 0
    ) {
      ToastWrapper.error(
        'No han encontrado ubicaciones para la bodega seleccionada',
      );
    }

    if (isLoadingCategoryProduct || isRefetchingCategoryProduct) return;
    if (
      !isLoadingCategoryProduct &&
      !isRefetchingCategoryProduct &&
      productCategoryPaging?.data?.items &&
      productCategoryPaging.data.items.length === 0
    ) {
      ToastWrapper.error('No se encontraron categorías de productos');
    }

    if (isLoadingItemsDisponibles || isRefetchingItemsDisponibles) return;
    if (
      !isLoadingItemsDisponibles &&
      !isRefetchingItemsDisponibles &&
      itemsDisponiblesPaging?.data?.items &&
      itemsDisponiblesPaging.data.items.length === 0
    ) {
      ToastWrapper.error('No se encontraron items disponibles');
    }
  }, [
    bodegasPaging,
    isLoadingBodegas,
    isLoadingCategoryProduct,
    isLoadingItemsDisponibles,
    isLoadingUbicaciones,
    isRefetchingBodegas,
    isRefetchingCategoryProduct,
    isRefetchingItemsDisponibles,
    isRefetchingUbicaciones,
    itemsDisponiblesPaging,
    productCategoryPaging,
    showTable,
    ubicacionesPaging,
  ]);

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

      {/* ==================== items table ==================== */}
      <>
        {showTable && (
          <>
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
                  onChangeValue={() => {
                    form.setValue('ubicacion', undefined as any);
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
                  // errors
                  control={form.control}
                  error={errors.categoria_producto as any}
                  helperText={errors.categoria_producto?.message}
                  size={gridSizeMdLg4}
                />
              </Grid>

              {/* ----------- table ----------- */}
              <>
                {!!watchedBodega && !!watchedUbicacion && (
                  <Grid item xs={12} my={3}>
                    <CustomTable<UbicacionProducto>
                      columns={baseColumnsUbicacionProducto}
                      data={itemsDisponiblesPaging?.data?.items || []}
                      isLoading={isLoadingItemsDisponibles}
                      isRefetching={isRefetchingItemsDisponibles}
                      // // filters - server side
                      enableManualFiltering={true}
                      columnFilters={columnFilters}
                      onColumnFiltersChange={setColumnFilters}
                      // // search
                      enableGlobalFilter={false}
                      // // pagination
                      pagination={pagination}
                      onPaging={setPagination}
                      rowCount={itemsDisponiblesPaging?.data?.meta?.count}
                      // // actions
                      actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
                      enableActionsColumn={true}
                      // crud
                      canEdit={true}
                      onEdit={ubProd => {
                        addSelectedItem({
                          keyStore: InstalacionesStoreKey.equiposUtilizados,
                          item: {
                            ...ubProd,
                            usedQuantity: 1,
                            selectedSeries: [],
                            savedSeries: [],
                            containsSeries: !!ubProd?.series?.length,
                          },
                          showToast: true,
                        });
                      }}
                      editIcon={<IoMdAddCircle />}
                      editIconColor="primary"
                      editIconToolTipTitle="Agregar"
                      canDelete={false}
                      editIconTooltipPlacement="left"
                    />
                  </Grid>
                )}
              </>
            </CustomToggleSection>
          </>
        )}
      </>

      {/* ==================== selected items ==================== */}
      <>
        <CustomMinimalTable<ClienteRubroLibreTableType>
          columns={baseColumnsRubroClienteUbicacionProducto}
          data={selectedItems || []}
          enablePagination
          density="comfortable"
        />
      </>
    </Grid>
  );
};

export default ClienteFibraRubroLibreItemsTable;

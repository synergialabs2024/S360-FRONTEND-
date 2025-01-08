import { useForm } from 'react-hook-form';
import { useState } from 'react';
import * as XLSX from 'xlsx';

import { useFetchMovimientoMateriales } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  Bodega,
  gridSizeMdLg6,
  MovimientoMaterial,
  PermissionsEnum,
  useColumnsMovimientoMaterial,
  useFetchBodegaWithDebounce,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  DateRangePicker,
  SingleTableBoxScene,
} from '@/shared/components';
import CustomAutocompletSearchNoForm from '@/shared/components/CustomAutocompletes/CustomAutocompletSearchNoForm';
import { useCheckPermission } from '@/shared/hooks/auth';
import { Button, Grid } from '@mui/material';

export const returnUrlMovimientoMaterialesPage =
  ROUTER_PATHS.inventario.movimientoMaterialesNav;

export type MovimientoMaterialesPageProps = {};

const MovimientoMaterialesPage: React.FC<
  MovimientoMaterialesPageProps
> = () => {
  useCheckPermission(PermissionsEnum.inventario_view_movimientomaterial);

  ///* local state
  const [selectedBodegaArray, setSelectedBodegaArray] = useState<Bodega | null>(
    null,
  );

  const { control, watch } = useForm({
    defaultValues: {
      fecha_rango: { date_1: '', date_2: '' },
    },
  });

  const selectedDateRange = watch('fecha_rango');

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* table
  const {
    globalFilter,
    pagination,
    searchTerm,
    onChangeFilter,
    setPagination,
  } = useTableFilter();
  const { pageIndex, pageSize } = pagination;

  const { bodegas, isLoadingBodega, selectedBodega, onChangeFilterBodega } =
    useFetchBodegaWithDebounce();

  ///* fetch data
  const {
    data: movimientoMaterialPagingRes,
    isLoading,
    isRefetching,
  } = useFetchMovimientoMateriales({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      filterByState: false,

      bodega_origen: selectedBodegaArray?.id,
      created_at__gte: selectedDateRange.date_1,
      created_at__lte: selectedDateRange.date_2,
    },
  });

  ///* columns
  const { movimientoMaterialColumns } = useColumnsMovimientoMaterial();

  const handleDownloadExcel = () => {
    const items = movimientoMaterialPagingRes?.data?.items || [];

    const data = items.map(item => ({
      ID: item.id,
      Cantidad: item.cantidad,
      Observación: item.observacion,
      Series: item.series,
      Producto: item.producto_data?.nombre,
      'Bodega Origen': item.bodega_origen_data?.nombre,
      'Ubicación Origen': item.ubicacion_origen_data?.nombre,
      'Bodega Destino': item.bodega_destino_data?.nombre,
      'Ubicacion Destino': item.ubicacion_destino_data?.nombre,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Movimiento Material');

    XLSX.writeFile(workbook, 'Movimiento Material.xlsx');
  };

  return (
    <SingleTableBoxScene title="Movimiento Materiales" showCreateBtn={false}>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
        sxContainer={{
          mb: 3,
        }}
        customSpaceNode={
          <>
            <CustomAutocompletSearchNoForm<Bodega>
              label="Buscar por bodega"
              options={
                (bodegas.map(u => ({
                  id: u?.id || 0,
                  nombre: u?.nombre || '',
                })) as unknown as Bodega[]) || []
              }
              valueKey="nombre"
              actualValueKey="id"
              defaultValue={selectedBodega?.id?.toString() || ''}
              optionLabelForEdit={selectedBodega?.nombre || ''}
              isLoadingData={isLoadingBodega}
              onChangeInputText={onChangeFilterBodega}
              size={gridSizeMdLg6}
              onChangeRawValue={bodega => {
                setSelectedBodegaArray(bodega);
              }}
              required={false}
            />
          </>
        }
      />
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <DateRangePicker
            sxGrid={{ m: [0, 0, 3, 1.5], width: '12.5cm' }}
            label="RANGO FECHA"
            name="fecha_rango"
            control={control}
            size={gridSizeMdLg6}
          />
        </Grid>
        <Grid item xs={2}>
          <Button onClick={handleDownloadExcel}>Descargar Excel</Button>
        </Grid>
      </Grid>

      <CustomTable<MovimientoMaterial>
        columns={movimientoMaterialColumns}
        data={movimientoMaterialPagingRes?.data?.items || []}
        isLoading={isLoading}
        isRefetching={isRefetching}
        // // filters - server side
        enableManualFiltering={true}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        // // search
        enableGlobalFilter={false}
        // // pagination
        pagination={pagination}
        onPaging={setPagination}
        rowCount={movimientoMaterialPagingRes?.data?.meta?.count}
        enableActionsColumn={false}
      />
    </SingleTableBoxScene>
  );
};

export default MovimientoMaterialesPage;

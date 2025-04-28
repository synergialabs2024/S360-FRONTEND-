import { Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import {
  CustomTable,
  CustomSearch,
  CustomDatePicker,
  SingleTableBoxScene,
} from '@/shared/components';
import {
  gridSizeMdLg6,
  useTableFilter,
  PermissionsEnum,
  UbicacionProducto,
  useColumnsReporteStock,
  useTableServerSideFiltering,
} from '@/shared';
import {
  useFetchUbicacionProductos,
  ReportUbicacionProductoExcel,
} from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import { useCheckPermission } from '@/shared/hooks/auth';

export const returnUrlReporteStockPages =
  ROUTER_PATHS.inventario.reporteStocksNav;

const MotivoReporteStockPages: React.FC = () => {
  useCheckPermission(PermissionsEnum.inventario_view_ubicacionproducto);

  const {
    control,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fecha: '',
    },
  });

  const selectedDate = watch('fecha');

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

  ///* fetch data
  const {
    data: reporteStockPagingRes,
    isLoading,
    isRefetching,
  } = useFetchUbicacionProductos({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      producto__nombre: searchTerm,
      ...filterObject,

      created_at__gte: '2000-01-01',
      created_at__lte: selectedDate,
    },
  });

  const { motivoTransferenciaColumns } = useColumnsReporteStock();

  const handleDownloadExcel = () => {
    ReportUbicacionProductoExcel({
      page_size: 99999999,
      producto__nombre: searchTerm,
      ...filterObject,
      filterByState: false,

      created_at__gte: '2000-01-01',
      created_at__lte: selectedDate,
    });
  };

  return (
    <SingleTableBoxScene title="Reporte Stock" showCreateBtn={false}>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por Producto"
        sxContainer={{ mb: 3 }}
        customSpaceNode={
          <>
            <CustomDatePicker
              label=""
              required={false}
              name="fecha"
              control={control}
              defaultValue={getValues().fecha}
              error={errors.fecha}
              helperText={errors.fecha?.message}
              size={gridSizeMdLg6}
            />
            <Grid sx={{ m: '5px' }}>
              <Button onClick={handleDownloadExcel}>Descargar Excel</Button>
            </Grid>
          </>
        }
      />

      <CustomTable<UbicacionProducto>
        columns={motivoTransferenciaColumns}
        data={reporteStockPagingRes?.data?.items || []}
        isLoading={isLoading}
        isRefetching={isRefetching}
        enableManualFiltering
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        enableGlobalFilter={false}
        pagination={pagination}
        onPaging={setPagination}
        enableActionsColumn={false}
      />
    </SingleTableBoxScene>
  );
};

export default MotivoReporteStockPages;

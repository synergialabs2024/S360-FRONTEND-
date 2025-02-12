import { Button, Grid } from '@mui/material';

import {
  useTableFilter,
  PermissionsEnum,
  UbicacionProducto,
  useColumnsReporteStock,
  useTableServerSideFiltering,
  gridSizeMdLg6,
} from '@/shared';
import {
  CustomTable,
  CustomSearch,
  SingleTableBoxScene,
  DateRangePicker,
} from '@/shared/components';
import { ROUTER_PATHS } from '@/router/constants';
import { useCheckPermission } from '@/shared/hooks/auth';
import {
  ReportUbicacionProductoExcel,
  useFetchUbicacionProductos,
} from '@/actions/app';
import { useForm } from 'react-hook-form';

export const returnUrlReporteStockPages =
  ROUTER_PATHS.inventario.reporteStocksNav;

const MotivoReporteStockPages: React.FC = () => {
  useCheckPermission(PermissionsEnum.inventario_view_ubicacionproducto);

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

      created_at__gte: selectedDateRange.date_1,
      created_at__lte: selectedDateRange.date_2,
    },
  });

  const { motivoTransferenciaColumns } = useColumnsReporteStock();

  const handleDownloadExcel = () => {
    ReportUbicacionProductoExcel({
      page_size: 99999999,
      producto__nombre: searchTerm,
      ...filterObject,
      filterByState: false,

      created_at__gte: selectedDateRange.date_1,
      created_at__lte: selectedDateRange.date_2,
    });
  };

  return (
    <SingleTableBoxScene title="Reporte Stock" showCreateBtn={false}>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por producto"
        sxContainer={{ mb: 3 }}
        customSpaceNode={
          <>
            <DateRangePicker
              sxGrid={{ m: [0, 0, 3, 1.5], width: '12.5cm' }}
              label="RANGO FECHA"
              name="fecha_rango"
              control={control}
              required={false}
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

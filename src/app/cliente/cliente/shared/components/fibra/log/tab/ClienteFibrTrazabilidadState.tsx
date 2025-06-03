import { Box } from '@mui/material';

import {
  LineaServicio,
  useTableFilter,
  TrazabilidadVenta,
  useColumnsTrazabilidadVenta,
  useTableServerSideFiltering,
  TrazabilidadModeloNameTMEnumChoice,
} from '@/shared';
import { CustomTable } from '@/shared/components';
import { useFetchTrazabilidadVentas } from '@/actions/app';

export type ClienteFibrTrazabilidadStateProps = {
  serviceLine?: LineaServicio;
  state: TrazabilidadModeloNameTMEnumChoice;
};

const ClienteFibrTrazabilidadState: React.FC<
  ClienteFibrTrazabilidadStateProps
> = ({ serviceLine, state }) => {
  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* table
  const { pagination, setPagination } = useTableFilter();
  const { pageIndex, pageSize } = pagination;

  ///* fetch data
  const {
    data: TrazabilidadVentasPagingRes,
    isLoading,
    isRefetching,
  } = useFetchTrazabilidadVentas({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      modelo_estado: state,
      modelo: serviceLine?.orden_trabajo_data?.id,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* columns ------------------------

  const { trazabilidadVentaColumns } = useColumnsTrazabilidadVenta();

  return (
    <Box maxWidth="95%" width="100%" m={5}>
      <CustomTable<TrazabilidadVenta>
        columns={trazabilidadVentaColumns}
        data={TrazabilidadVentasPagingRes?.data?.items || []}
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
        rowCount={TrazabilidadVentasPagingRes?.data?.meta.count}
        enableActionsColumn={false}
      />
    </Box>
  );
};

export default ClienteFibrTrazabilidadState;

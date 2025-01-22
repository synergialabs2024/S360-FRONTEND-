import { Grid } from '@mui/material';

import { useFetchSaldos } from '@/actions/app';
import {
  LineaServicio,
  Saldo,
  useColumnsSaldos,
  useLoaders,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import { CustomTable } from '@/shared/components';

export type ClienteFibraSaldosTabProps = {
  serviceLine?: LineaServicio;
};

const ClienteFibraSaldosTab: React.FC<ClienteFibraSaldosTabProps> = ({
  serviceLine,
}) => {
  ///* table -------------------------
  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();
  const {
    // globalFilter,
    pagination,
    // onChangeFilter,
    setPagination,
  } = useTableFilter();
  const { pageIndex, pageSize } = pagination;

  ///* fetch data -------------------------
  const {
    data: saldosPagingRes,
    isLoading: isSaldosLoading,
    isRefetching: isSaldosRefetching,
  } = useFetchSaldos({
    enabled: !!serviceLine?.id,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      ...filterObject,

      linea_servicio: serviceLine?.id!,
      cliente: serviceLine?.cliente!,
    },
  });

  const isCustomLoading = isSaldosLoading || isSaldosRefetching;
  useLoaders(isCustomLoading);

  ///* columns ----------------------
  const { genericColumns } = useColumnsSaldos();

  return (
    <>
      <Grid item container xs={12}>
        <Grid item xs={12}>
          <CustomTable<Saldo>
            columns={genericColumns}
            data={saldosPagingRes?.data?.items || []}
            isLoading={isSaldosLoading}
            isRefetching={isSaldosRefetching}
            // // filters - server side
            enableManualFiltering={true}
            columnFilters={columnFilters}
            onColumnFiltersChange={setColumnFilters}
            // // search
            enableGlobalFilter={false}
            // // pagination
            pagination={pagination}
            onPaging={setPagination}
            rowCount={saldosPagingRes?.data?.meta?.count}
            // // actions
            enableActionsColumn={false}
            // crud
            canEdit={false}
            canDelete={false}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ClienteFibraSaldosTab;

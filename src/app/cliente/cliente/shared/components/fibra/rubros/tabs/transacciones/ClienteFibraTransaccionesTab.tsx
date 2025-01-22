import { useFetchTransaccions } from '@/actions/app';
import {
  LineaServicio,
  Transaccion,
  useColumnsTransaccionesCliente,
  useLoaders,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import { CustomTable } from '@/shared/components';
import { Grid } from '@mui/material';

export type ClienteFibraTransaccionesTabProps = {
  serviceLine?: LineaServicio;
};

const ClienteFibraTransaccionesTab: React.FC<
  ClienteFibraTransaccionesTabProps
> = ({ serviceLine }) => {
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
    data: transaccionesPagingRes,
    isLoading: isTransaccionesLoading,
    isRefetching: isTransaccionesRefetching,
  } = useFetchTransaccions({
    enabled: !!serviceLine?.id,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      ...filterObject,

      linea_servicio: serviceLine?.id!,
      cliente: serviceLine?.cliente!,
    },
  });

  const isCustomLoading = isTransaccionesLoading || isTransaccionesRefetching;
  useLoaders(isCustomLoading);

  ///* columns ----------------------
  const { transaccionClienteTabColumns } = useColumnsTransaccionesCliente();

  return (
    <>
      <Grid item container xs={12}>
        <Grid item xs={12}>
          <CustomTable<Transaccion>
            columns={transaccionClienteTabColumns}
            data={transaccionesPagingRes?.data?.items || []}
            isLoading={isTransaccionesLoading}
            isRefetching={isTransaccionesRefetching}
            // // filters - server side
            enableManualFiltering={true}
            columnFilters={columnFilters}
            onColumnFiltersChange={setColumnFilters}
            // // search
            enableGlobalFilter={false}
            // // pagination
            pagination={pagination}
            onPaging={setPagination}
            rowCount={transaccionesPagingRes?.data?.meta?.count}
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

export default ClienteFibraTransaccionesTab;

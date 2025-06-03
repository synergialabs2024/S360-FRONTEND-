import { Box } from '@mui/material';

import {
  AuditLog,
  LineaServicio,
  useColumnsSuspensionInternet,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import { CustomTable } from '@/shared/components';
import { useFetchSuspensionInternets } from '@/actions/app';

export type ClienteFibrAuditLogProps = {
  serviceLine?: LineaServicio;
};

const ClienteFibrAuditLog: React.FC<ClienteFibrAuditLogProps> = ({
  serviceLine,
}) => {
  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* table
  const { pagination, setPagination } = useTableFilter();
  const { pageIndex, pageSize } = pagination;

  ///* fetch data
  const {
    data: SuspensionInternetPagingRes,
    isLoading,
    isRefetching,
  } = useFetchSuspensionInternets({
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      //name: searchTerm,
      linea_servicio: serviceLine?.id!,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* columns ------------------------
  const { SuspensionInternetColumns } = useColumnsSuspensionInternet();

  return (
    <>
      <Box maxWidth="95%" width="100%" m={5}>
        <CustomTable<AuditLog>
          columns={SuspensionInternetColumns}
          data={SuspensionInternetPagingRes?.data?.items || []}
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
          rowCount={SuspensionInternetPagingRes?.data?.meta?.count}
          enableActionsColumn={false}
        />
      </Box>
    </>
  );
};

export default ClienteFibrAuditLog;

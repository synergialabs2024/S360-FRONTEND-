import {
  CustomTable,
  CustomSearch,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import {
  useTableFilter,
  ClientePendienteDevolucion,
  useTableServerSideFiltering,
  useColumnsClientePendienteDevolucion,
} from '@/shared';
import { useFetchClientePendienteDevoluciones } from '@/actions/app';

export type ClientePendienteDevolucionStatePageProps = {
  state: string;
};

const ClientePendienteDevolucionStatePage: React.FC<
  ClientePendienteDevolucionStatePageProps
> = ({ state }) => {
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
    data: solicitudTransferenciaMaterialPagingRes,
    isLoading,
    isRefetching,
  } = useFetchClientePendienteDevoluciones({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      ...filterObject,

      numero_referencia: searchTerm,
      estado_devolucion: state,
    },
  });

  ///* columns
  const { clientePendienteDevolucionColumns } =
    useColumnsClientePendienteDevolucion();

  return (
    <GridTableTabsContainerOnly>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por identificación"
      />
      <CustomTable<ClientePendienteDevolucion>
        columns={clientePendienteDevolucionColumns}
        data={solicitudTransferenciaMaterialPagingRes?.data?.items || []}
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
        rowCount={solicitudTransferenciaMaterialPagingRes?.data?.meta?.count}
        // // actions
        enableActionsColumn={false}
      />
    </GridTableTabsContainerOnly>
  );
};

export default ClientePendienteDevolucionStatePage;

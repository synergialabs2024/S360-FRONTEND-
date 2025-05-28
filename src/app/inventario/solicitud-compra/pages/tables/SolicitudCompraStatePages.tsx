import {
  useTableFilter,
  TABLE_CONSTANTS,
  SolicitudCompra,
  useColumnsSolicitudCompra,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomTable,
  CustomSearch,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import { useAuthStore } from '@/store/auth';
import { useFetchSolicitudCompra } from '@/actions/app';

export type SolicitudCompraStatePageProps = {
  state: string;
};

const SolicitudCompraStatePage: React.FC<SolicitudCompraStatePageProps> = ({
  state,
}) => {
  const user = useAuthStore(s => s.user);

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
    data: solicitudCompraPagingRes,
    isLoading,
    isRefetching,
  } = useFetchSolicitudCompra({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      filterByState: false,
      user_create: user?.id,

      estado_solicitud: state,
    },
  });

  ///* columns
  const { solicitudCompraColumns } = useColumnsSolicitudCompra();

  return (
    <GridTableTabsContainerOnly>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por identificación"
      />
      <CustomTable<SolicitudCompra>
        columns={solicitudCompraColumns}
        data={solicitudCompraPagingRes?.data?.items || []}
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
        rowCount={solicitudCompraPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={false}
      />
    </GridTableTabsContainerOnly>
  );
};

export default SolicitudCompraStatePage;

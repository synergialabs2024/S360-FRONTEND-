import {
  useTableFilter,
  TABLE_CONSTANTS,
  useTableServerSideFiltering,
  SolicitudTransferenciaMaterial,
  useColumnsTransferenciaMaterial,
} from '@/shared';
import {
  CustomTable,
  CustomSearch,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import { useAuthStore } from '@/store/auth';
import { useFetchSolicitudTransferenciaMateriales } from '@/actions/app';

export type SolicitudTransferenciaMaterialStatePageProps = {
  state: string;
};

const SolicitudTransferenciaMaterialStatePage: React.FC<
  SolicitudTransferenciaMaterialStatePageProps
> = ({ state }) => {
  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();
  const user = useAuthStore(s => s.user);

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
  } = useFetchSolicitudTransferenciaMateriales({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,

      estado_solicitud: state,
      user_create: user?.id,
      filterByState: false,
    },
  });

  ///* columns
  const { transferenciaMaterialColumns } = useColumnsTransferenciaMaterial();

  return (
    <GridTableTabsContainerOnly>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por identificación"
      />
      <CustomTable<SolicitudTransferenciaMaterial>
        columns={transferenciaMaterialColumns}
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
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={false}
      />
    </GridTableTabsContainerOnly>
  );
};

export default SolicitudTransferenciaMaterialStatePage;

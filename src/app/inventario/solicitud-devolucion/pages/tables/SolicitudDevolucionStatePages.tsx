import {
  useTableFilter,
  TABLE_CONSTANTS,
  SolicitudDevolucion,
  useTableServerSideFiltering,
  useColumnsSolicitudDevolucion,
} from '@/shared';
import {
  CustomTable,
  CustomSearch,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import { useFetchSolicitudDevolucion } from '@/actions/app';
import { useAuthStore } from '@/store/auth';

export type SolicitudDevolucionStatePageProps = {
  state: string;
};

const SolicitudDevolucionStatePage: React.FC<
  SolicitudDevolucionStatePageProps
> = ({ state }) => {
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
    data: solicitudDevolucionPagingRes,
    isLoading,
    isRefetching,
  } = useFetchSolicitudDevolucion({
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
  const { solicitudDevolucionColumns } = useColumnsSolicitudDevolucion();

  return (
    <GridTableTabsContainerOnly>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por identificación"
      />
      <CustomTable<SolicitudDevolucion>
        columns={solicitudDevolucionColumns}
        data={solicitudDevolucionPagingRes?.data?.items || []}
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
        rowCount={solicitudDevolucionPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={false}
      />
    </GridTableTabsContainerOnly>
  );
};

export default SolicitudDevolucionStatePage;

import {
  Preventa,
  useTableFilter,
  TABLE_CONSTANTS,
  useColumnsSolicitudMaterial,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomTable,
  CustomSearch,
  GridTableTabsContainerOnly,
} from '@/shared/components';

import { useAuthStore } from '@/store/auth';
import { useFetchSolicitudMaterial } from '@/actions/app/inventario/solicitud-material';

export type SolicitudMaterialStatePageProps = {
  state: string;
};

const SolicitudMaterialEsperaPage: React.FC<
  SolicitudMaterialStatePageProps
> = ({ state }) => {
  const user = useAuthStore(s => s.user);

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* table ------------------------
  const {
    globalFilter,
    pagination,
    searchTerm,
    onChangeFilter,
    setPagination,
  } = useTableFilter();
  const { pageIndex, pageSize } = pagination;

  ///* fetch data ------------------------
  const {
    data: preventasPagingRes,
    isLoading,
    isRefetching,
  } = useFetchSolicitudMaterial({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      user_create: user?.id,
      ...filterObject,

      por_agendar: true,
      estado_solicitud: state,
    },
  });

  ///* columns ------------------------
  const { solicitudMaterialColumns } = useColumnsSolicitudMaterial();

  return (
    <GridTableTabsContainerOnly>
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por identificación"
        sxContainer={{
          mb: 5,
        }}
      />

      <CustomTable<Preventa>
        columns={solicitudMaterialColumns}
        data={preventasPagingRes?.data?.items || []}
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
        rowCount={preventasPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={false}
      />
    </GridTableTabsContainerOnly>
  );
};

export default SolicitudMaterialEsperaPage;

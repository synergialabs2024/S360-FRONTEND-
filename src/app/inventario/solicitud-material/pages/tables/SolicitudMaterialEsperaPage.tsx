import {
  Preventa,
  TABLE_CONSTANTS,
  useColumnsSolicitudMaterial,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
} from '@/shared/components';

import { useFetchSolicitudMaterial } from '@/actions/app/inventario/solicitud-material';
import { useAuthStore } from '@/store/auth';

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
      ...filterObject,

      por_agendar: true,
      estado_solicitud: state,
    },
  });

  const bodegaFilter = user?.flota_data?.ubicacion_data?.bodega;
  const ubicacionFilter = user?.flota_data?.ubicacion_data?.id;
  const filteredItems = preventasPagingRes?.data?.items.filter(
    item => item.bodega === bodegaFilter && item.ubicacion === ubicacionFilter,
  );
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
        data={filteredItems || []}
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

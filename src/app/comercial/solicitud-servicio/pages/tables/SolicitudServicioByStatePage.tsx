import { useFetchSolicitudServicios } from '@/actions/app';
import {
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import {
  useColumnsSolicitusService,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared/hooks';
import { SolicitudServicio } from '@/shared/interfaces';

export type SolicitudServicioByStatePageProps = {
  state: string;
};

const SolicitudServicioByStatePage: React.FC<
  SolicitudServicioByStatePageProps
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
    data: SolicitudsServicioPagingRes,
    isLoading,
    isRefetching,
  } = useFetchSolicitudServicios({
    enabled: true,
    params: {
      identificacion: searchTerm,
      ...filterObject,
      estado_solicitud: state,
      page_size: pageSize,
      page: pageIndex + 1,
    },
  });

  ///* columns
  const { solicitudServicioBase } = useColumnsSolicitusService();

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

      <CustomTable<SolicitudServicio>
        columns={solicitudServicioBase}
        data={SolicitudsServicioPagingRes?.data?.items || []}
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
        rowCount={SolicitudsServicioPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={false}
        // crud
        canEdit={false}
        // onEdit={onEdit}
        canDelete={false}
      />
    </GridTableTabsContainerOnly>
  );
};

export default SolicitudServicioByStatePage;

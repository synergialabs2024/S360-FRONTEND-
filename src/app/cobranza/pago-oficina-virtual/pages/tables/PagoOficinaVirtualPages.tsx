import {
  CustomTable,
  CustomSearch,
  SingleTableBoxScene,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import {
  useTableFilter,
  PermissionsEnum,
  PagoOficinaVirtualLog,
  useColumnsPagoOficinaVirtual,
  useTableServerSideFiltering,
} from '@/shared';
import { ROUTER_PATHS } from '@/router/constants';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useFetchPagoOficinaVirtualLogs } from '@/actions/app';

export const returnUrlPagoOficinaVirtualPages =
  ROUTER_PATHS.cobranza.pagooficinavirtualNav;

export type PagoOficinaVirtualPagesProps = {};

const PagoOficinaVirtualPages: React.FC<PagoOficinaVirtualPagesProps> = () => {
  useCheckPermission(PermissionsEnum.contabilidad_view_abitmediapagoslog);

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
    data: PagoOficinaVirtualPagingRes,
    isLoading,
    isRefetching,
  } = useFetchPagoOficinaVirtualLogs({
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      identificacion: searchTerm,
      estado: 'APROVADO',

      ...filterObject,
      filterByState: false,
    },
  });

  ///* columns
  const { pagooficinavirtualColumns } = useColumnsPagoOficinaVirtual();

  return (
    <SingleTableBoxScene
      title="Pagos Oficina Virtual"
      showCreateBtn={false}
      isMainTableStates
    >
      <GridTableTabsContainerOnly>
        <CustomSearch
          onChange={onChangeFilter}
          value={globalFilter}
          text="por Identificación"
        />

        <CustomTable<PagoOficinaVirtualLog>
          columns={pagooficinavirtualColumns}
          data={PagoOficinaVirtualPagingRes?.data?.items || []}
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
          rowCount={PagoOficinaVirtualPagingRes?.data?.meta?.count}
          // // actions
          enableActionsColumn={false}
        />
      </GridTableTabsContainerOnly>
    </SingleTableBoxScene>
  );
};

export default PagoOficinaVirtualPages;

import {
  Preventa,
  TABLE_CONSTANTS,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
} from '@/shared/components';

import { useFetchSolicitudMaterial } from '@/actions/app/inventario/solicitud-material';
import { useColumnsSolicitudMaterial } from '@/shared/hooks/app/inventario/useColumnsSolicitudMaterial';

export type PreventaEsperaAgendaPageProps = {};

const SolicitudMaterialEsperaPage: React.FC<
  PreventaEsperaAgendaPageProps
> = () => {
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
      // estado_preventa: EstadoPreventaEnumChoice.ESPERA,
      // contrato_aceptado: true,
      por_agendar: true,
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
        enableActionsColumn={true}
        // crud
        canEdit={true}
        canDelete={false}
        showCustomButtonsSpace
      />
    </GridTableTabsContainerOnly>
  );
};

export default SolicitudMaterialEsperaPage;

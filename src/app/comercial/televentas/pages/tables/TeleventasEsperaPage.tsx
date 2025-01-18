import {
  TABLE_CONSTANTS,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import { useColumnsTeleventas } from '@/shared/hooks/app/comercial/useColumnsTeleventas';
import { Televentas } from '@/shared/interfaces/app/comercial/televentas';
import { useFetchTeleventas } from '@/actions/app/comercial/televentas';

export type TeleventasEsperaPageProps = {};

const TeleventasEsperaPage: React.FC<TeleventasEsperaPageProps> = () => {
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
    data: televentasPaginatedRes,
    isLoading,
    isRefetching,
  } = useFetchTeleventas({
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
  const { televentasBaseColumns } = useColumnsTeleventas();

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

      <CustomTable<Televentas>
        columns={televentasBaseColumns}
        data={televentasPaginatedRes?.data?.items || []}
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
        rowCount={televentasPaginatedRes?.data?.meta?.count}
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

export default TeleventasEsperaPage;

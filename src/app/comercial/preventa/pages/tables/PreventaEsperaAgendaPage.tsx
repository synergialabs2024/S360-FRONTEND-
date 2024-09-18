import { useFetchPreventas } from '@/actions/app';
import {
  EstadoPreventaEnumChoice,
  Preventa,
  TABLE_CONSTANTS,
  useColumnsPreventa,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import { EsperaAgendaPreventaCustomButtons } from '../../shared/components';

export type PreventaEsperaAgendaPageProps = {};

const PreventaEsperaAgendaPage: React.FC<
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
  } = useFetchPreventas({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      filterByState: false,
      estado_preventa: EstadoPreventaEnumChoice.ESPERA,
    },
  });

  ///* handlers ------------------------

  ///* columns ------------------------
  const { preventaBaseColumns } = useColumnsPreventa();

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
        columns={preventaBaseColumns}
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
        customButtonsSpace={preventa => {
          return (
            <>
              <EsperaAgendaPreventaCustomButtons preventa={preventa!} />
            </>
          );
        }}
      />
    </GridTableTabsContainerOnly>
  );
};

export default PreventaEsperaAgendaPage;

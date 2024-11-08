import { useFetchPreventas } from '@/actions/app';
import {
  EstadoPreventaEnumChoice,
  PermissionsEnum,
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
import { useCheckPermission } from '@/shared/hooks/auth';

export type PreventaByStatePageProps = {
  state: EstadoPreventaEnumChoice;
};

const PreventaByStatePage: React.FC<PreventaByStatePageProps> = ({ state }) => {
  useCheckPermission(PermissionsEnum.comercial_view_preventa);

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
    data: preventasPagingRes,
    isLoading,
    isRefetching,
  } = useFetchPreventas({
    enabled: true,
    params: {
      name: searchTerm,
      ...filterObject,
      estado_preventa: state,
      page_size: pageSize,
      page: pageIndex + 1,
      filterByState: false,
    },
  });

  ///* handlers
  const calcEnableActionsColumn = (): boolean => {
    if (state === EstadoPreventaEnumChoice.ESPERA) {
      return true;
    }

    return false;
  };

  ///* columns
  const {
    preventaBaseColumns,
    preventaEspera,
    preventaRealizadas,
    preventaRechazadas,
    preventaFallidas,
    preventaSinGestion,
  } = useColumnsPreventa();

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
        columns={
          state === EstadoPreventaEnumChoice.ESPERA
            ? preventaEspera
            : state === EstadoPreventaEnumChoice.REALIZADO
              ? preventaRealizadas
              : state === EstadoPreventaEnumChoice.RECHAZADO
                ? preventaRechazadas
                : state === EstadoPreventaEnumChoice.FALLIDO
                  ? preventaFallidas
                  : state === EstadoPreventaEnumChoice.SIN_GESTION
                    ? preventaSinGestion
                    : preventaBaseColumns
        }
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
        enableActionsColumn={calcEnableActionsColumn()}
        // crud
        canEdit={calcEnableActionsColumn()}
        canDelete={false}
        showCustomButtonsSpaceEnd={calcEnableActionsColumn()}
        customButtonsSpaceEnd={(preventa: Preventa) => {
          return <EsperaAgendaPreventaCustomButtons preventa={preventa!} />;
        }}
      />
    </GridTableTabsContainerOnly>
  );
};

export default PreventaByStatePage;

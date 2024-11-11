import { HiDocumentPlus } from 'react-icons/hi2';

import { useFetchAgendamientos } from '@/actions/app';
import {
  Agendamiento,
  EstadoAgendamientoEnumChoice,
  PermissionsEnum,
  TABLE_CONSTANTS,
  useColumnsAgendamientos,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import { useCheckPermission } from '@/shared/hooks/auth';

export type AgendamientoVentasByStatePageProps = {
  state: EstadoAgendamientoEnumChoice;
};

const AgendamientoVentasByStatePage: React.FC<
  AgendamientoVentasByStatePageProps
> = ({ state }) => {
  useCheckPermission(PermissionsEnum.operaciones_view_agendamiento);

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
    data: agendamientosPagingRes,
    isLoading,
    isRefetching,
  } = useFetchAgendamientos({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      filterByState: false,

      estado_agendamiento: state,
    },
  });

  ///* columns
  const { agendaEspera, agendaEsperaRecooordinacion, agendaRecoordinados } =
    useColumnsAgendamientos();

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

      <CustomTable<Agendamiento>
        columns={
          state === EstadoAgendamientoEnumChoice.ESPERA_RECOORDINACION
            ? agendaEsperaRecooordinacion
            : state === EstadoAgendamientoEnumChoice.RECOORDINADO
              ? agendaRecoordinados
              : agendaEspera
        }
        data={agendamientosPagingRes?.data?.items || []}
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
        rowCount={agendamientosPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={false}
        // crud
        canEdit={false}
        editIcon={<HiDocumentPlus />}
        // editIconToolTipTitle="Crear preventa"
        canDelete={false}
      />
    </GridTableTabsContainerOnly>
  );
};

export default AgendamientoVentasByStatePage;

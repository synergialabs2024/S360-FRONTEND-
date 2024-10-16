import { useNavigate } from 'react-router-dom';

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
import { HiDocumentPlus } from 'react-icons/hi2';
import { returnUrlAgendamientoVentasPage } from './AgendamientoVentasMainPage';

export type AgendamientoVentasByStatePageProps = {
  state: EstadoAgendamientoEnumChoice;
};

const AgendamientoVentasByStatePage: React.FC<
  AgendamientoVentasByStatePageProps
> = ({ state }) => {
  useCheckPermission(PermissionsEnum.operaciones_view_agendamiento);

  const navigate = useNavigate();

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

  ///* handlers
  const calcEnableActionsColumn = (): boolean => {
    return false;

    if (state === EstadoAgendamientoEnumChoice.ESPERA) {
      return true;
    }

    return false;
  };
  const calcOnEdit = (data: Agendamiento) => {
    if (state === EstadoAgendamientoEnumChoice.ESPERA) {
      navigate(`${returnUrlAgendamientoVentasPage}/crear/${data.uuid}`);
    }
  };

  ///* columns
  const { agendaBase01 } = useColumnsAgendamientos();

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
          // solicitudServicioBase
          state === EstadoAgendamientoEnumChoice.ESPERA ? agendaBase01 : []
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
        enableActionsColumn={calcEnableActionsColumn()}
        // crud
        canEdit={calcEnableActionsColumn()}
        onEdit={calcOnEdit}
        editIcon={<HiDocumentPlus />}
        // editIconToolTipTitle="Crear preventa"
        canDelete={false}
      />
    </GridTableTabsContainerOnly>
  );
};

export default AgendamientoVentasByStatePage;

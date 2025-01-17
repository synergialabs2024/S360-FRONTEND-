import {
  EstadoTicketTecnicoEnumChoice,
  PermissionsEnum,
  TABLE_CONSTANTS,
  useTableFilter,
  useTableServerSideFiltering,
} from '@/shared';
import {
  CustomSearch,
  CustomTable,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import { useColumnsTickets } from '@/shared/hooks/app/tickets';
import { Ticket } from '@/shared/interfaces/app/ticket/ticket.interface';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useFetchTickets } from '@/actions/app/tickets';
import { useNavigate } from 'react-router';

export type TicketsTecnicoByStatePageProps = {
  state: EstadoTicketTecnicoEnumChoice;
};

const TicketsTecnicoByStatePage: React.FC<TicketsTecnicoByStatePageProps> = ({
  state,
}) => {
  const navigate = useNavigate();

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
    data: ticketsTecnicoPagingRes,
    isLoading,
    isRefetching,
  } = useFetchTickets({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      estado_ticket_tecnico: state,
    },
  });

  ///* columns
  const { ticketBaseColumns } = useColumnsTickets();

  const onEdit = (row: Ticket) => {
    console.log('row.estado_ticket', row.estado_ticket);
    console.log('row.estado_ticket_tecnico', row.estado_ticket_tecnico);
    if (row?.estado_ticket_tecnico === EstadoTicketTecnicoEnumChoice.ESPERA)
      navigate(`/tecnico/tickets/${row.uuid}`);
    if (
      row?.estado_ticket_tecnico ===
      EstadoTicketTecnicoEnumChoice.PENDIENTE_CORRECCION_AUDITORIA
    )
      navigate(`/tecnico/tickets/${row.uuid}`);
  };

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

      <CustomTable<Ticket>
        columns={
          state === EstadoTicketTecnicoEnumChoice.ESPERA
            ? ticketBaseColumns
            : state === EstadoTicketTecnicoEnumChoice.REALIZADO
              ? ticketBaseColumns
              : state === EstadoTicketTecnicoEnumChoice.CERRADO
                ? ticketBaseColumns
                : state ===
                    EstadoTicketTecnicoEnumChoice.PENDIENTE_RECOORDINACION
                  ? ticketBaseColumns
                  : state ===
                      EstadoTicketTecnicoEnumChoice.PENDIENTE_CORRECCION_AUDITORIA
                    ? ticketBaseColumns
                    : state ===
                        EstadoTicketTecnicoEnumChoice.ESPERA_CORREGIDOS_AUDITORIA
                      ? ticketBaseColumns
                      : ticketBaseColumns
        }
        data={ticketsTecnicoPagingRes?.data?.items || []}
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
        rowCount={ticketsTecnicoPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={true}
        // crud
        editIconToolTipTitle="Gestionar"
        canEdit={true}
        // canDelete={false}
        onConditionEdit={ticketVisita => {
          return (
            ticketVisita.estado_ticket_tecnico ===
              EstadoTicketTecnicoEnumChoice.ESPERA ||
            ticketVisita.estado_ticket_tecnico ===
              EstadoTicketTecnicoEnumChoice.PENDIENTE_CORRECCION_AUDITORIA
          );
        }}
        onEdit={onEdit}
        // customButtonsSpaceEnd={(preventa: Preventa) => {
        //   return <EsperaAgendaPreventaCustomButtons preventa={preventa!} />;
        // }}
      />
    </GridTableTabsContainerOnly>
  );
};

export default TicketsTecnicoByStatePage;

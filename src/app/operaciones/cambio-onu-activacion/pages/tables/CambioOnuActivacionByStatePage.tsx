import {
  cambioOnuSacEnumChoice,
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
import { useFetchTickets } from '@/actions/app/tickets';

export type AprobacionTicketsVisitaByStatePageProps = {
  state: cambioOnuSacEnumChoice;
};

const CambioOnuActivacionByStatePage: React.FC<
  AprobacionTicketsVisitaByStatePageProps
> = ({ state }) => {
  // useCheckPermission(PermissionsEnum.sac_view_cambioonu);
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
      require_cambio_onu: true,
      cambio_onu__estado_cambio_onu_activacion: state,
    },
  });

  ///* columns
  const { ticketBaseColumns } = useColumnsTickets();

  // const onEdit = (row: Ticket) => {
  //   if (row?.estado_ticket_tecnico === EstadoTicketTecnicoEnumChoice.REALIZADO)
  //     navigate(`/operaciones/tickets-visita/aprobacion/${row.uuid}`);
  //   if (
  //     row?.estado_ticket_tecnico ===
  //     EstadoTicketTecnicoEnumChoice.ESPERA_CORREGIDOS_AUDITORIA
  //   )
  //     navigate(`/operaciones/tickets-visita/aprobacion/${row.uuid}`);
  // };

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
          cambioOnuSacEnumChoice.PENDIENTE
            ? ticketBaseColumns
            : cambioOnuSacEnumChoice.REALIZADO
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
        // onConditionEdit={ticketVisita => {
        //   return (
        //     ticketVisita.estado_ticket_tecnico ===
        //       EstadoTicketTecnicoEnumChoice.REALIZADO ||
        //     ticketVisita.estado_ticket_tecnico ===
        //       EstadoTicketTecnicoEnumChoice.ESPERA_CORREGIDOS_AUDITORIA
        //   );
        // }}
        // onEdit={false}
        // customButtonsSpaceEnd={(preventa: Preventa) => {
        //   return <EsperaAgendaPreventaCustomButtons preventa={preventa!} />;
        // }}
      />
    </GridTableTabsContainerOnly>
  );
};

export default CambioOnuActivacionByStatePage;

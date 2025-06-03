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
import { useCallback, useState } from 'react';
import CambioOnuSacModal from '../../shared/components/modal/CambioOnuSacModal';

export type AprobacionTicketsVisitaByStatePageProps = {
  state: cambioOnuSacEnumChoice;
};

const CambioOnuSacByStatePage: React.FC<
  AprobacionTicketsVisitaByStatePageProps
> = ({ state }) => {
  const [open, setOpen] = useState(false);

  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

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
      cambio_onu__estado_cambio_onu_negociacion: state,
    },
  });

  ///* columns
  const { ticketBaseColumns } = useColumnsTickets();

  const onEdit = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setOpen(true);
  };

  const fetchData = useCallback(async () => {
    console.log('success');
  }, []);

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
        onEdit={onEdit}
        // customButtonsSpaceEnd={(preventa: Preventa) => {
        //   return <EsperaAgendaPreventaCustomButtons preventa={preventa!} />;
        // }}
      />

      {/* -------------- modals -------------- */}
      <CambioOnuSacModal
        open={open}
        onClose={() => setOpen(false)}
        ticket={selectedTicket!}
        onSuccess={fetchData}
      />
    </GridTableTabsContainerOnly>
  );
};

export default CambioOnuSacByStatePage;

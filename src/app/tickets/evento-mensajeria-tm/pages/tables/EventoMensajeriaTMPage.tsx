import { useNavigate } from 'react-router';

import {
  CustomTable,
  CustomSearch,
  SingleTableBoxScene,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import {
  useTableFilter,
  PermissionsEnum,
  TABLE_CONSTANTS,
  EventoMensajeriaTM,
  useTableServerSideFiltering,
  useColumnsEventoMensajeriaTM,
} from '@/shared';
import { ROUTER_PATHS } from '@/router/constants';
import { useUiConfirmModalStore } from '@/store/ui';
import { hasAllPermissions } from '@/shared/utils/auth';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useFetchEventoMensajeriaTMs } from '@/actions/app';

export const returnUrlEventoMensajeriaTMPage =
  ROUTER_PATHS.tickets.eventomensajeriaTMNav;

export type EventoMensajeriaTMPageProps = {};

const EventoMensajeriaTMPage: React.FC<EventoMensajeriaTMPageProps> = () => {
  useCheckPermission(PermissionsEnum.tecnico_view_eventomensajeriaticketmasivo);

  const navigate = useNavigate();

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

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
    data: EventoMensajeriaTMPagingRes,
    isLoading,
    isRefetching,
  } = useFetchEventoMensajeriaTMs({
    params: {
      page: pageIndex + 1,
      page_size: pageSize,

      name: searchTerm,

      ...filterObject,
      filterByState: false,
    },
  });

  ///* handlers
  const onEdit = (eventomensajeria_tm: EventoMensajeriaTM) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Evento Mensajeria del Ticket Masivo',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(
          `${returnUrlEventoMensajeriaTMPage}/editar/${eventomensajeria_tm.uuid}`,
        );
      },
    });
  };

  ///* columns
  const { eventomensajeriatmColumns } = useColumnsEventoMensajeriaTM();

  return (
    <SingleTableBoxScene
      title="Evento Mensajeria Ticket Masivo"
      createPageUrl={`${returnUrlEventoMensajeriaTMPage}/crear`}
      isMainTableStates
    >
      <GridTableTabsContainerOnly>
        <CustomSearch
          onChange={onChangeFilter}
          value={globalFilter}
          text="por nombre"
        />
        <CustomTable<EventoMensajeriaTM>
          columns={eventomensajeriatmColumns}
          data={EventoMensajeriaTMPagingRes?.data?.items || []}
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
          rowCount={EventoMensajeriaTMPagingRes?.data?.meta?.count}
          // // actions
          actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
          enableActionsColumn={hasAllPermissions([
            PermissionsEnum.tecnico_view_eventomensajeriaticketmasivo,
          ])}
          // crud
          canEdit={hasAllPermissions([
            PermissionsEnum.tecnico_view_eventomensajeriaticketmasivo,
          ])}
          onEdit={onEdit}
        />
      </GridTableTabsContainerOnly>
    </SingleTableBoxScene>
  );
};

export default EventoMensajeriaTMPage;

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
  PrioridadIncidenciaTM,
  useTableServerSideFiltering,
  useColumnsPrioridadIncidenciaTM,
} from '@/shared';
import { ROUTER_PATHS } from '@/router/constants';
import { useUiConfirmModalStore } from '@/store/ui';
import { hasAllPermissions } from '@/shared/utils/auth';
import { useCheckPermission } from '@/shared/hooks/auth';
import { useFetchPrioridadIncidenciaTMs } from '@/actions/app';

export const returnUrlPrioridadIncidenciaTMPage =
  ROUTER_PATHS.tickets.prioridadincidenciaTMNav;

export type PrioridadIncidenciaTMPageProps = {};

const PrioridadIncidenciaTMPage: React.FC<
  PrioridadIncidenciaTMPageProps
> = () => {
  useCheckPermission(
    PermissionsEnum.tecnico_view_prioridadincidenciaticketmasivo,
  );

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
    data: PrioridadIncidenciaTMPagingRes,
    isLoading,
    isRefetching,
  } = useFetchPrioridadIncidenciaTMs({
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* handlers
  const onEdit = (prioridadincidencia_tm: PrioridadIncidenciaTM) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Prioridad Incidencia del Ticket Masivo',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(
          `${returnUrlPrioridadIncidenciaTMPage}/editar/${prioridadincidencia_tm.uuid}`,
        );
      },
    });
  };

  ///* columns
  const { prioridadincidenciatmColumns } = useColumnsPrioridadIncidenciaTM();

  return (
    <SingleTableBoxScene
      title="Prioridad Incidencia Ticket Masivo"
      createPageUrl={`${returnUrlPrioridadIncidenciaTMPage}/crear`}
      isMainTableStates
    >
      <GridTableTabsContainerOnly>
        <CustomSearch
          onChange={onChangeFilter}
          value={globalFilter}
          text="por nombre"
        />

        <CustomTable<PrioridadIncidenciaTM>
          columns={prioridadincidenciatmColumns}
          data={PrioridadIncidenciaTMPagingRes?.data?.items || []}
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
          rowCount={PrioridadIncidenciaTMPagingRes?.data?.meta?.count}
          // // actions
          actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
          enableActionsColumn={hasAllPermissions([
            PermissionsEnum.tecnico_view_prioridadincidenciaticketmasivo,
          ])}
          // crud
          canEdit={hasAllPermissions([
            PermissionsEnum.tecnico_view_prioridadincidenciaticketmasivo,
          ])}
          onEdit={onEdit}
        />
      </GridTableTabsContainerOnly>
    </SingleTableBoxScene>
  );
};

export default PrioridadIncidenciaTMPage;

import { useNavigate } from 'react-router';

import {
  CustomTable,
  CustomSearch,
  SingleTableBoxScene,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import {
  IncidenciaTM,
  useTableFilter,
  PermissionsEnum,
  TABLE_CONSTANTS,
  useColumnsIncidenciaTM,
  useTableServerSideFiltering,
} from '@/shared';
import { ROUTER_PATHS } from '@/router/constants';
import { useUiConfirmModalStore } from '@/store/ui';
import { useFetchIncidenciaTMs } from '@/actions/app';
import { hasAllPermissions } from '@/shared/utils/auth';
import { useCheckPermission } from '@/shared/hooks/auth';

export const returnUrlIncidenciaTMPage = ROUTER_PATHS.tickets.incidenciaTMNav;

export type IncidenciaTMPageProps = {};

const IncidenciaTMPage: React.FC<IncidenciaTMPageProps> = () => {
  useCheckPermission(PermissionsEnum.tecnico_view_incidenciaticketmasivo);

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
    data: IncidenciaTMPagingRes,
    isLoading,
    isRefetching,
  } = useFetchIncidenciaTMs({
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* handlers
  const onEdit = (incidencia_tm: IncidenciaTM) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Incidencia del Ticket Masivo',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlIncidenciaTMPage}/editar/${incidencia_tm.uuid}`);
      },
    });
  };

  ///* columns
  const { incidenciatmColumns } = useColumnsIncidenciaTM();

  return (
    <SingleTableBoxScene
      title="Incidencia Ticket Masivo"
      createPageUrl={`${returnUrlIncidenciaTMPage}/crear`}
      isMainTableStates
    >
      <GridTableTabsContainerOnly>
        <CustomSearch
          onChange={onChangeFilter}
          value={globalFilter}
          text="por nombre"
        />

        <CustomTable<IncidenciaTM>
          columns={incidenciatmColumns}
          data={IncidenciaTMPagingRes?.data?.items || []}
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
          rowCount={IncidenciaTMPagingRes?.data?.meta?.count}
          // // actions
          actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
          enableActionsColumn={hasAllPermissions([
            PermissionsEnum.tecnico_view_incidenciaticketmasivo,
          ])}
          // crud
          canEdit={hasAllPermissions([
            PermissionsEnum.tecnico_view_incidenciaticketmasivo,
          ])}
          onEdit={onEdit}
        />
      </GridTableTabsContainerOnly>
    </SingleTableBoxScene>
  );
};

export default IncidenciaTMPage;

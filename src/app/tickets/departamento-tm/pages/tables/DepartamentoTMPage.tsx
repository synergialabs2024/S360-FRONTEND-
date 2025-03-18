import { useNavigate } from 'react-router';

import {
  CustomTable,
  CustomSearch,
  SingleTableBoxScene,
  GridTableTabsContainerOnly,
} from '@/shared/components';
import {
  DepartamentoTM,
  useTableFilter,
  PermissionsEnum,
  TABLE_CONSTANTS,
  useColumnsDepartamentoTM,
  useTableServerSideFiltering,
} from '@/shared';
import { ROUTER_PATHS } from '@/router/constants';
import { useUiConfirmModalStore } from '@/store/ui';
import { useFetchDepartamentoTMs } from '@/actions/app';
import { hasAllPermissions } from '@/shared/utils/auth';
import { useCheckPermission } from '@/shared/hooks/auth';

export const returnUrlDepartamentoTMPage =
  ROUTER_PATHS.tickets.departamentoTMNav;

export type DepartamentoTMPageProps = {};

const DepartamentoTMPage: React.FC<DepartamentoTMPageProps> = () => {
  useCheckPermission(PermissionsEnum.tecnico_view_departamentoticketmasivo);

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
    data: DepartamentoTMPagingRes,
    isLoading,
    isRefetching,
  } = useFetchDepartamentoTMs({
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* handlers
  const onEdit = (departamento_tm: DepartamentoTM) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Departamento del Ticket Masivo',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(
          `${returnUrlDepartamentoTMPage}/editar/${departamento_tm.uuid}`,
        );
      },
    });
  };

  ///* columns
  const { departamentotmColumns } = useColumnsDepartamentoTM();

  return (
    <SingleTableBoxScene
      title="Departamento Ticket Masivo"
      createPageUrl={`${returnUrlDepartamentoTMPage}/crear`}
      isMainTableStates
    >
      <GridTableTabsContainerOnly>
        <CustomSearch
          onChange={onChangeFilter}
          value={globalFilter}
          text="por nombre"
        />

        <CustomTable<DepartamentoTM>
          columns={departamentotmColumns}
          data={DepartamentoTMPagingRes?.data?.items || []}
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
          rowCount={DepartamentoTMPagingRes?.data?.meta?.count}
          // // actions
          actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
          enableActionsColumn={hasAllPermissions([
            PermissionsEnum.tecnico_view_departamentoticketmasivo,
          ])}
          // crud
          canEdit={hasAllPermissions([
            PermissionsEnum.tecnico_view_departamentoticketmasivo,
          ])}
          onEdit={onEdit}
        />
      </GridTableTabsContainerOnly>
    </SingleTableBoxScene>
  );
};

export default DepartamentoTMPage;

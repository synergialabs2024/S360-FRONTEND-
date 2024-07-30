import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFetchSystemGroups } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum, SystemGroup } from '@/shared/interfaces';
import { emptyCellOneLevel } from '@/shared/utils';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';

export const returnUrlSystemsGroupPage = ROUTER_PATHS.administracion.gruposNav;

export type SystemsGroupPageProps = {};

const SystemsGroupPage: React.FC<SystemsGroupPageProps> = () => {
  useCheckPermission(PermissionsEnum.users_view_customgroup);

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
    data: systemsGroupPagingRes,
    isLoading,
    isRefetching,
  } = useFetchSystemGroups({
    enabled: true,
    params: {
      page: pageIndex + 1,
      page_size: pageSize,
      name: searchTerm,
      ...filterObject,
      filterByState: false,
    },
  });

  ///* handlers
  const onEdit = (systemgroup: SystemGroup) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar SystemGroup',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlSystemsGroupPage}/editar/${systemgroup.uuid}`);
      },
    });
  };

  ///* columns
  const columns = useMemo<MRT_ColumnDef<SystemGroup>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'NOMBRE',
        size: 222,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'name'),
      },
      {
        accessorKey: 'description',
        header: 'DESCRIPCIÓN',
        size: 180,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'description'),
      },
      {
        accessorKey: 'uuid',
        header: 'UUID',
        size: 180,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'uuid'),
      },

      {
        accessorKey: 'system_modules',
        header: 'MÓDULOS',
        size: 180,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'system_modules'),
      },

      {
        accessorKey: 'permissions',
        header: 'PERMISOS',
        size: 180,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'permissions'),
      },
    ],
    [],
  );

  return (
    <SingleTableBoxScene
      title="Grupos"
      createPageUrl={`${returnUrlSystemsGroupPage}/crear`}
      showCreateBtn={hasPermission(PermissionsEnum.users_add_customgroup)}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<SystemGroup>
        columns={columns}
        data={systemsGroupPagingRes?.data?.items || []}
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
        rowCount={systemsGroupPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        // crud
        canEdit={hasPermission(PermissionsEnum.users_change_customgroup)}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default SystemsGroupPage;

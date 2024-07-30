import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFetchSystemUsers } from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { SAVE_USER_PROFILE_PERMISSIONS } from '@/shared/constants/app';
import { TABLE_CONSTANTS } from '@/shared/constants/ui';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum, SystemUserItem } from '@/shared/interfaces';
import { emptyCellNested } from '@/shared/utils';
import { hasAllPermissions, hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';

export const returnUrlSystemUserPage = ROUTER_PATHS.administracion.usuariosNav;

export type SystemUserPageProps = {};

const SystemUserPage: React.FC<SystemUserPageProps> = () => {
  useCheckPermission(PermissionsEnum.users_view_profile);

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
    data: useresProfilePagingRes,
    isLoading,
    isRefetching,
  } = useFetchSystemUsers({
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
  const onEdit = (systemUserItem: SystemUserItem) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Usuario',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(
          `${returnUrlSystemUserPage}/editar/${systemUserItem?.user?.uuid}`,
        );
      },
    });
  };

  ///* columns
  const columns = useMemo<MRT_ColumnDef<SystemUserItem>[]>(
    () => [
      {
        accessorKey: 'razon_social',
        header: 'NOMBRE',
        size: 222,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => emptyCellNested(row, ['user', 'razon_social']),
      },
      {
        accessorKey: 'username',
        header: 'USUARIO',
        size: 150,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => emptyCellNested(row, ['user', 'username']),
      },
      {
        accessorKey: 'email',
        header: 'EMAIL',
        size: 180,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => emptyCellNested(row, ['user', 'email']),
      },

      // profile
      {
        accessorKey: 'tipoIdentificacion',
        header: 'TIPO IDENTIFICACIÓN',
        size: 180,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) =>
          emptyCellNested(row, ['profile', 'tipo_identificacion']),
      },
      {
        accessorKey: 'identificacion',
        header: 'IDENTIFICACIÓN',
        size: 180,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => emptyCellNested(row, ['profile', 'identificacion']),
      },
    ],
    [],
  );

  return (
    <SingleTableBoxScene
      title="Usuarios"
      createPageUrl={`${returnUrlSystemUserPage}/crear`}
      showCreateBtn={hasPermission(PermissionsEnum.users_add_profile)}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por identificación"
      />

      <CustomTable<SystemUserItem>
        columns={columns}
        data={useresProfilePagingRes?.data?.items || []}
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
        rowCount={useresProfilePagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        // crud
        canEdit={hasAllPermissions([
          ...SAVE_USER_PROFILE_PERMISSIONS,
          PermissionsEnum.users_change_profile,
        ])}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default SystemUserPage;

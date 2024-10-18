import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  useFetchAutenticacionClientes,
  useUpdateAutenticacionCliente,
} from '@/actions/app';
import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomSearch,
  CustomSwitch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { MODEL_STATE_BOOLEAN, TABLE_CONSTANTS } from '@/shared/constants/ui';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';
import { useCheckPermission } from '@/shared/hooks/auth';
import { PermissionsEnum } from '@/shared/interfaces';
import { emptyCellOneLevel, formatDateWithTimeCell } from '@/shared/utils';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { AutenticacionCliente } from '@/shared/interfaces/app/administracion-red/autenticacion-cliente';

export const returnUrlAutenticacionClientesPage =
  ROUTER_PATHS.administracionRed.autenticacionClientesNav;

export type AutenticacionClientesPageProps = {};

const AutenticacionClientesPage: React.FC<
  AutenticacionClientesPageProps
> = () => {
  ///* Pendiente a cambio
  useCheckPermission(PermissionsEnum.administration_view_pais);

  const navigate = useNavigate();

  // server side filters - colums table
  const { filterObject, columnFilters, setColumnFilters } =
    useTableServerSideFiltering();

  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* mutations
  const changeState = useUpdateAutenticacionCliente({
    enableNavigate: false,
  });

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
    data: AutenticacionClientesPagingRes,
    isLoading,
    isRefetching,
  } = useFetchAutenticacionClientes({
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
  const onEdit = (authCliente: AutenticacionCliente) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Autenticacion del Cliente',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(
          `${returnUrlAutenticacionClientesPage}/editar/${authCliente.uuid}`,
        );
      },
    });
  };

  ///* columns
  const columns = useMemo<MRT_ColumnDef<AutenticacionCliente>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'NOMBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'name'),
      },
      {
        accessorKey: 'state',
        header: 'ESTADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableSorting: false,
        filterVariant: 'select',
        filterSelectOptions: MODEL_STATE_BOOLEAN,
        Cell: ({ row }) => {
          return typeof row.original?.state === 'boolean' ? (
            <CustomSwitch
              title="state"
              checked={row.original?.state}
              onChangeChecked={() => {
                ///* Pendiente a cambio
                if (!hasPermission(PermissionsEnum.administration_change_pais))
                  return;

                setConfirmDialog({
                  isOpen: true,
                  title: 'Cambiar state',
                  subtitle:
                    '¿Está seguro que desea cambiar el state de este registro?',
                  onConfirm: () => {
                    changeState.mutate({
                      id: row.original.id!,
                      data: {
                        state: !row.original.state,
                      },
                    });
                    setConfirmDialogIsOpen(false);
                  },
                });
              }}
            />
          ) : (
            'N/A'
          );
        },
      },

      {
        accessorKey: 'created_at',
        header: 'CREADO',
        size: 180,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'created_at'),
      },
      {
        accessorKey: 'modified_at',
        header: 'MODIFICADO',
        size: 180,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'modified_at'),
      },
    ],
    [changeState, setConfirmDialog, setConfirmDialogIsOpen],
  );

  return (
    <SingleTableBoxScene
      title="Autenticacion de Clientes"
      createPageUrl={`${returnUrlAutenticacionClientesPage}/crear`}
      ///* Pendiente a cambio
      showCreateBtn={hasPermission(PermissionsEnum.administration_add_pais)}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<AutenticacionCliente>
        columns={columns}
        data={AutenticacionClientesPagingRes?.data?.items || []}
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
        rowCount={AutenticacionClientesPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        // crud
        ///* Pendiente a cambio
        canEdit={hasPermission(PermissionsEnum.administration_change_pais)}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default AutenticacionClientesPage;

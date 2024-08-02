import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFetchEmpresas, useUpdateEmpresa } from '@/actions/app';
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
import { Empresa, PermissionsEnum } from '@/shared/interfaces';
import {
  emptyCellOneLevel,
  formatBooleanCell,
  formatDateWithTimeCell,
} from '@/shared/utils';
import { hasAllPermissions, hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { SAVE_EMPRESA_PERMISSIONS } from '@/shared';

export const returnUrlEmpresasPage = ROUTER_PATHS.administracion.empresasNav;

export type EmpresasPageProps = {};

const EmpresasPage: React.FC<EmpresasPageProps> = () => {
  useCheckPermission(PermissionsEnum.administration_view_empresa);

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
  const changeState = useUpdateEmpresa({
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
    data: EmpresasPagingRes,
    isLoading,
    isRefetching,
  } = useFetchEmpresas({
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
  const onEdit = (empresa: Empresa) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar Empresa',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlEmpresasPage}/editar/${empresa.uuid}`);
      },
    });
  };

  ///* columns
  const columns = useMemo<MRT_ColumnDef<Empresa>[]>(
    () => [
      {
        accessorKey: 'razon_social',
        header: 'RAZON SOCIAL',
        size: 180,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'razon_social'),
      },
      {
        accessorKey: 'commercial_name',
        header: 'NOMBRE COMERCIAL',
        size: 180,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'commercial_name'),
      },

      {
        accessorKey: 'tipo_identificacion',
        header: 'TIPO IDENTIFICACION',
        size: 180,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'tipo_identificacion'),
      },
      {
        accessorKey: 'identificacion',
        header: 'IDENTIFICACION',
        size: 180,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'identificacion'),
      },

      {
        accessorKey: 'email',
        header: 'EMAIL',
        size: 180,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'email'),
      },
      {
        accessorKey: 'address',
        header: 'DIRECCIÓN',
        size: 180,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'address'),
      },

      {
        accessorKey: 'phone_1',
        header: 'TELEFONO 1',
        size: 180,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'phone_1'),
      },
      {
        accessorKey: 'phone_2',
        header: 'TELEFONO 2',
        size: 180,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'phone_2'),
      },
      {
        accessorKey: 'phone_3',
        header: 'TELEFONO 3',
        size: 180,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'phone_3'),
      },

      {
        accessorKey: 'is_agente_retencion',
        header: 'ES AGENTE RETENCION',
        size: 180,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => formatBooleanCell(row, 'is_agente_retencion'),
      },
      {
        accessorKey: 'number_agente_retencion',
        header: 'NÚMERO AGENTE RETENCION',
        size: 180,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'number_agente_retencion'),
      },
      {
        accessorKey: 'razon_social_representante',
        header: 'RAZON SOCIAL REPRESENTANTE',
        size: 180,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'razon_social_representante'),
      },
      {
        accessorKey: 'identificacion_representante',
        header: 'IDENTIFICACION REPRESENTANTE',
        size: 180,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellOneLevel(row, 'identificacion_representante'),
      },
      {
        accessorKey: 'email_representante',
        header: 'EMAIL REPRESENTANTE',
        size: 180,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'email_representante'),
      },
      {
        accessorKey: 'phone_representante',
        header: 'TELEFONO REPRESENTANTE',
        size: 180,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'phone_representante'),
      },

      {
        accessorKey: 'contador',
        header: 'CONTADOR',
        size: 180,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'contador'),
      },

      {
        accessorKey: 'genera_ats',
        header: 'GENERA ATS',
        size: 180,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'genera_ats'),
      },

      {
        accessorKey: 'state',
        header: 'Estado',
        size: 159,
        enableSorting: false,
        filterVariant: 'select',
        filterSelectOptions: MODEL_STATE_BOOLEAN,
        Cell: ({ row }) => {
          return typeof row.original?.state === 'boolean' ? (
            <CustomSwitch
              title="state"
              checked={row.original?.state}
              onChangeChecked={() => {
                if (
                  !hasPermission(PermissionsEnum.administration_change_empresa)
                )
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
        accessorKey: 'uuid',
        header: 'UUID',
        size: 180,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'uuid'),
      },
      {
        accessorKey: 'created_at',
        header: 'CREADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
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
      title="Empresa"
      createPageUrl={`${returnUrlEmpresasPage}/crear`}
      showCreateBtn={hasAllPermissions([
        PermissionsEnum.administration_add_empresa,
        ...SAVE_EMPRESA_PERMISSIONS,
      ])}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<Empresa>
        columns={columns}
        data={EmpresasPagingRes?.data?.items || []}
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
        rowCount={EmpresasPagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasAllPermissions([
          PermissionsEnum.administration_change_empresa,
          ...SAVE_EMPRESA_PERMISSIONS,
        ])}
        // crud
        canEdit={hasAllPermissions([
          PermissionsEnum.administration_change_empresa,
          ...SAVE_EMPRESA_PERMISSIONS,
        ])}
        onEdit={onEdit}
        canDelete={false}
      />
    </SingleTableBoxScene>
  );
};

export default EmpresasPage;

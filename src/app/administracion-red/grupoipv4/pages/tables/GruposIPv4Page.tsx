import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFetchGrupoIPv4s, useUpdateGrupoIPv4 } from '@/actions/app';
import { IPDetailsCell } from '@/app/administracion-red/shared/components';
import { ROUTER_PATHS } from '@/router/constants';
import {
  CustomProgressBar,
  CustomSearch,
  CustomSwitch,
  CustomTable,
  SingleTableBoxScene,
} from '@/shared/components';
import { MODEL_STATE_BOOLEAN, TABLE_CONSTANTS } from '@/shared/constants/ui';
import { useTableFilter, useTableServerSideFiltering } from '@/shared/hooks';
import { useCheckPermissionsArray } from '@/shared/hooks/auth';
import { GrupoIPv4, PermissionsEnum } from '@/shared/interfaces';
import { emptyCellOneLevel, formatDateWithTimeCell } from '@/shared/utils';
import { hasAllPermissions, hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { Box } from '@mui/material';

export const returnUrlGruposIPv4Page =
  ROUTER_PATHS.administracionRed.gruposIPv4Nav;

export type GruposIPv4PageProps = {};

const GruposIPv4Page: React.FC<GruposIPv4PageProps> = () => {
  useCheckPermissionsArray([
    PermissionsEnum.infraestructura_view_grupoipv4,
    PermissionsEnum.infraestructura_view_router,
  ]);

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
  const changeState = useUpdateGrupoIPv4({
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
    data: GruposIPv4PagingRes,
    isLoading,
    isRefetching,
  } = useFetchGrupoIPv4s({
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
  const onEdit = (grupoipv4: GrupoIPv4) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar GrupoIPv4',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlGruposIPv4Page}/editar/${grupoipv4.uuid}`);
      },
    });
  };

  ///* columns
  const columns = useMemo<MRT_ColumnDef<GrupoIPv4>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'NAME',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'name'),
      },

      {
        accessorKey: 'ipv_4',
        header: 'RED',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'ipv_4'),
      },
      {
        accessorKey: 'cidr',
        header: 'MÁSCARA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'cidr'),
      },
      {
        accessorKey: 'tipo_uso',
        header: 'TIPO USO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'tipo_uso'),
      },

      {
        accessorKey: 'uso',
        header: 'DETALLE USO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => (
          <Box
            display="flex"
            alignItems="center"
            sx={{
              width: '100%',
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <CustomProgressBar
                free_count={row.original.ips_disponibles_count}
                total_count={row.original.ips_total}
              />
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <IPDetailsCell
                availableIps={row.original.ips_detalle}
                title={`Detalle del Pool de IPv4: ${row.original?.ipv_4}`}
              />
            </Box>
          </Box>
        ),
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
                if (
                  !hasPermission(
                    PermissionsEnum.infraestructura_change_grupoipv4,
                  )
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
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'modified_at'),
      },
    ],
    [changeState, setConfirmDialog, setConfirmDialogIsOpen],
  );

  return (
    <SingleTableBoxScene
      title="Redes IPv4"
      createPageUrl={`${returnUrlGruposIPv4Page}/crear`}
      showCreateBtn={hasAllPermissions([
        PermissionsEnum.infraestructura_add_grupoipv4,
        PermissionsEnum.infraestructura_view_router,
      ])}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<GrupoIPv4>
        columns={columns}
        data={GruposIPv4PagingRes?.data?.items || []}
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
        rowCount={GruposIPv4PagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasAllPermissions([
          PermissionsEnum.infraestructura_add_grupoipv4,
          PermissionsEnum.infraestructura_view_router,
        ])}
        // crud
        canEdit={hasAllPermissions([
          PermissionsEnum.infraestructura_add_grupoipv4,
          PermissionsEnum.infraestructura_view_router,
        ])}
        onEdit={onEdit}
      />
    </SingleTableBoxScene>
  );
};

export default GruposIPv4Page;

import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFetchGrupoIPv6s, useUpdateGrupoIPv6 } from '@/actions/app';
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
import { useCheckPermission } from '@/shared/hooks/auth';
import { GrupoIPv6, PermissionsEnum } from '@/shared/interfaces';
import { emptyCellOneLevel, formatDateWithTimeCell } from '@/shared/utils';
import { hasAllPermissions, hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { Box } from '@mui/material';

export const returnUrlGruposIPv6Page =
  ROUTER_PATHS.administracionRed.gruposIPv6Nav;

export type GruposIPv6PageProps = {};

const GruposIPv6Page: React.FC<GruposIPv6PageProps> = () => {
  useCheckPermission(PermissionsEnum.infraestructura_view_grupoipv6);

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
  const changeState = useUpdateGrupoIPv6({
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
    data: GruposIPv6PagingRes,
    isLoading,
    isRefetching,
  } = useFetchGrupoIPv6s({
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
  const onEdit = (grupoipv6: GrupoIPv6) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Editar el Pool de IPv6',
      subtitle: '¿Está seguro que desea editar este registro?',
      onConfirm: () => {
        setConfirmDialogIsOpen(false);
        navigate(`${returnUrlGruposIPv6Page}/editar/${grupoipv6.uuid}`);
      },
    });
  };

  ///* columns
  const columns = useMemo<MRT_ColumnDef<GrupoIPv6>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'NOMBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'name'),
      },

      {
        accessorKey: 'ipv_6',
        header: 'RED',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'ipv_6'),
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
                title={`Detalle del Pool de IPv6: ${row.original?.ipv_6}`}
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
                    PermissionsEnum.infraestructura_change_grupoipv6,
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
      title="Redes IPv6"
      createPageUrl={`${returnUrlGruposIPv6Page}/crear`}
      showCreateBtn={hasAllPermissions([
        PermissionsEnum.infraestructura_change_grupoipv6,
        PermissionsEnum.infraestructura_view_router,
      ])}
    >
      <CustomSearch
        onChange={onChangeFilter}
        value={globalFilter}
        text="por nombre"
      />

      <CustomTable<GrupoIPv6>
        columns={columns}
        data={GruposIPv6PagingRes?.data?.items || []}
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
        rowCount={GruposIPv6PagingRes?.data?.meta?.count}
        // // actions
        actionsColumnSize={TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH}
        enableActionsColumn={hasAllPermissions([
          PermissionsEnum.infraestructura_change_grupoipv6,
          PermissionsEnum.infraestructura_view_router,
        ])}
        // crud
        canEdit={hasAllPermissions([
          PermissionsEnum.infraestructura_change_grupoipv6,
          PermissionsEnum.infraestructura_view_router,
        ])}
        onEdit={onEdit}
      />
    </SingleTableBoxScene>
  );
};

export default GruposIPv6Page;

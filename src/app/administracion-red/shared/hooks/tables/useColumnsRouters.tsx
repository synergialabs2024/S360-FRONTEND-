import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { useUpdateRouter } from '@/actions/app';
import {
  CustomSwitch,
  PasswordTableCell,
  ViewMoreTextModalTableCell,
} from '@/shared/components';
import { MODEL_STATE_BOOLEAN, TABLE_CONSTANTS } from '@/shared/constants/ui';
import { PermissionsEnum, Router } from '@/shared/interfaces';
import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
} from '@/shared/utils';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';

export const useColumnsRouters = () => {
  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* mutations
  const changeState = useUpdateRouter({
    enableNavigate: false,
  });

  const routersColumns = useMemo<MRT_ColumnDef<Router>[]>(
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
        accessorKey: 'ip',
        header: 'IP',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'ip'),
      },
      {
        accessorKey: 'username',
        header: 'USERNAME',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'username'),
      },
      {
        accessorKey: 'password',
        header: 'Password',
        size: 180,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => {
          return (
            <PasswordTableCell password={row.original?.password || 'N/A'} />
          );
        },
      },
      {
        accessorKey: 'usuario_api',
        header: 'USUARIO API',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'usuario_api'),
      },
      {
        accessorKey: 'puerto_api',
        header: 'PUERTO API',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'puerto_api'),
      },

      {
        accessorKey: 'clave_api',
        header: 'CLAVE API',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'clave_api'),
      },

      {
        accessorKey: 'direccion',
        header: 'DIRECCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.direccion ? row.original.direccion : 'N/A';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle={`Direccion de ${row?.original?.name}`}
            />
          );
        },
      },
      {
        accessorKey: 'coordenadas',
        header: 'COORDENADAS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.coordenadas
            ? row.original.coordenadas
            : 'N/A';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle={`Coordenadas de ${row?.original?.name}`}
            />
          );
        },
      },
      {
        accessorKey: 'tipo_router',
        header: 'TIPO ROUTER',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'tipo_router'),
      },
      {
        accessorKey: 'nodo__name',
        header: 'NODO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['nodo_data', 'name']),
      },
      {
        accessorKey: 'olt__name',
        header: 'OLT',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['olt_data', 'name']),
      },
      {
        accessorKey: 'pais__name',
        header: 'PAIS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['pais_data', 'name']),
      },
      {
        accessorKey: 'provincia__name',
        header: 'PROVINCIA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['provincia_data', 'name']),
      },
      {
        accessorKey: 'ciudad__name',
        header: 'CIUDAD',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['ciudad_data', 'name']),
      },

      {
        accessorKey: 'zona__name',
        header: 'ZONA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['zona_data', 'name']),
      },
      {
        accessorKey: 'sector__name',
        header: 'SECTOR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['sector_data', 'name']),
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
                  !hasPermission(PermissionsEnum.infraestructura_change_router)
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

  const routersDataColumnsIPs = useMemo<MRT_ColumnDef<Router>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'NOMBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'name'),
      },
      {
        accessorKey: 'tipo_router',
        header: 'TIPO ROUTER',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'tipo_router'),
      },
      {
        accessorKey: 'nodo__name',
        header: 'NODO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['nodo_data', 'name']),
      },
      {
        accessorKey: 'olt__name',
        header: 'OLT',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['olt_data', 'name']),
      },
    ],
    [],
  );

  return {
    routersColumns,
    routersDataColumnsIPs,
  };
};

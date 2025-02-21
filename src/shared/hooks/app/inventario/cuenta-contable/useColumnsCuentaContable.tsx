import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { useUpdateCuentaContable } from '@/actions/app';
import { CuentaContable, PermissionsEnum } from '@/shared/interfaces';
import { MODEL_STATE_BOOLEAN, TABLE_CONSTANTS } from '@/shared/constants';
import { emptyCellOneLevel, formatDateWithTimeCell } from '@/shared/utils';
import { CustomSwitch, ViewMoreTextModalTableCell } from '@/shared/components';

export const useColumnsCuentaContable = () => {
  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  const changeState = useUpdateCuentaContable<{ estado: boolean }>({
    enableNavigate: false,
  });

  const cuentaContableBaseColumns01 = useMemo<MRT_ColumnDef<CuentaContable>[]>(
    () => [
      {
        accessorKey: 'nombre',
        header: 'NOMBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'nombre'),
      },
      {
        accessorKey: 'codigo',
        header: 'CODIGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'codigo'),
      },
      {
        accessorKey: 'descripcion',
        header: 'DESCRIPCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.descripcion
            ? row.original.descripcion
            : 'N/A';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle={`Descripcion de ${row?.original?.nombre}`}
            />
          );
        },
      },
    ],
    [],
  );

  const cuentaContableBaseColumns02 = useMemo<MRT_ColumnDef<CuentaContable>[]>(
    () => [
      {
        accessorKey: 'estado',
        header: 'ESTADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableSorting: false,
        filterVariant: 'select',
        filterSelectOptions: MODEL_STATE_BOOLEAN,
        Cell: ({ row }) => {
          return typeof row.original?.estado === 'boolean' ? (
            <CustomSwitch
              title="estado"
              checked={row.original?.estado}
              onChangeChecked={() => {
                if (
                  !hasPermission(
                    PermissionsEnum.contabilidad_change_cuentacontable,
                  )
                )
                  return;

                setConfirmDialog({
                  isOpen: true,
                  title: 'Cambiar estado',
                  subtitle:
                    '¿Está seguro que desea cambiar el estado de este registro?',
                  onConfirm: () => {
                    changeState.mutate({
                      id: row.original.id!,
                      data: {
                        estado: !row.original.estado,
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
    ],
    [setConfirmDialog, setConfirmDialogIsOpen, changeState],
  );

  const cuentaContableColumns = useMemo<MRT_ColumnDef<CuentaContable>[]>(
    () => [
      ...cuentaContableBaseColumns01,
      ...cuentaContableBaseColumns02,
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
    [cuentaContableBaseColumns01, cuentaContableBaseColumns02],
  );

  return {
    cuentaContableColumns,
  };
};

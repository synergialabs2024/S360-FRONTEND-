import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import {
  MotivoRechazo,
  PermissionsEnum,
  ChangeModelStateData,
} from '@/shared/interfaces';
import {
  TABLE_CONSTANTS,
  MODEL_STATE_BOOLEAN,
  MOTIVO_RECHAZO_MODULO_ARRAY_CHOICES,
} from '@/shared/constants';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { useUpdateMotivoRechazo } from '@/actions/app';
import { emptyCellOneLevel, formatDateWithTimeCell } from '@/shared/utils';
import { CustomSwitch, ViewMoreTextModalTableCell } from '@/shared/components';

export const useColumnsMotivoRechazo = () => {
  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  const changeState = useUpdateMotivoRechazo<ChangeModelStateData>({
    enableNavigate: false,
  });

  const motivorechazoBaseColumns01 = useMemo<MRT_ColumnDef<MotivoRechazo>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'NOMBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }) => emptyCellOneLevel(row, 'name'),
      },
      {
        accessorKey: 'description',
        header: 'DESCRIPCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }) => (
          <ViewMoreTextModalTableCell longText={row.original?.description} />
        ),
      },
      {
        accessorKey: 'modulo',
        header: 'MODULO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        filterVariant: 'select',
        filterSelectOptions: MOTIVO_RECHAZO_MODULO_ARRAY_CHOICES,
        Cell: ({ row }) => emptyCellOneLevel(row, 'modulo'),
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
                    PermissionsEnum.administration_change_motivorechazo,
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
    ],
    [changeState, setConfirmDialog, setConfirmDialogIsOpen],
  );

  const motivorechazoBaseColumns02 = useMemo<MRT_ColumnDef<MotivoRechazo>[]>(
    () => [
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
    [],
  );

  const motivorechazoColumns = useMemo<MRT_ColumnDef<MotivoRechazo>[]>(
    () => [...motivorechazoBaseColumns01, ...motivorechazoBaseColumns02],
    [motivorechazoBaseColumns01, motivorechazoBaseColumns02],
  );

  return {
    motivorechazoColumns,
  };
};

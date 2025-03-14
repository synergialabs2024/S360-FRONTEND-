import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import {
  MODEL_BOOLEAN,
  TABLE_CONSTANTS,
  MODEL_STATE_BOOLEAN,
} from '@/shared/constants';
import {
  IncidenciaTM,
  PermissionsEnum,
  ChangeModelStateData,
} from '@/shared/interfaces';
import { CustomSwitch } from '@/shared/components';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { useUpdateIncidenciaTM } from '@/actions/app';
import { emptyCellOneLevel, formatDateWithTimeCell } from '@/shared/utils';

export const useColumnsIncidenciaTM = () => {
  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* mutations
  const changeState = useUpdateIncidenciaTM<ChangeModelStateData>({
    enableNavigate: false,
  });
  const changeRestringirAsuntoTicekt = useUpdateIncidenciaTM<{
    restringir_asuntos_ticket: boolean;
  }>({
    enableNavigate: false,
  });

  const incidenciatmBaseColumns01 = useMemo<MRT_ColumnDef<IncidenciaTM>[]>(
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
        accessorKey: 'prioridad',
        header: 'PRIORIDAD',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'prioridad'),
      },
      {
        accessorKey: 'restringir_asuntos_ticket',
        header: 'COBERTURA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        filterVariant: 'select',
        filterSelectOptions: MODEL_BOOLEAN,
        Cell: ({ row }) => (
          <CustomSwitch
            title="Cobertura"
            checked={row.original?.restringir_asuntos_ticket}
            isSimpleBoolean
            onChangeChecked={() => {
              if (!hasPermission(PermissionsEnum.administration_change_pais))
                return;

              setConfirmDialog({
                isOpen: true,
                title: 'Cambiar Cobertura',
                subtitle:
                  '¿Está seguro que desea cambiar la cobertura de este registro?',
                onConfirm: () => {
                  setConfirmDialogIsOpen(false);
                  changeRestringirAsuntoTicekt.mutate({
                    id: row.original.id!,
                    data: {
                      restringir_asuntos_ticket:
                        !row.original?.restringir_asuntos_ticket,
                    },
                  });
                },
              });
            }}
          />
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
                    PermissionsEnum.tecnico_change_incidenciaticketmasivo,
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
    [
      setConfirmDialog,
      setConfirmDialogIsOpen,
      changeState,
      changeRestringirAsuntoTicekt,
    ],
  );

  const incidenciatmColumns = useMemo<MRT_ColumnDef<IncidenciaTM>[]>(
    () => [
      ...incidenciatmBaseColumns01,
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
    [incidenciatmBaseColumns01],
  );

  return {
    incidenciatmColumns,
  };
};

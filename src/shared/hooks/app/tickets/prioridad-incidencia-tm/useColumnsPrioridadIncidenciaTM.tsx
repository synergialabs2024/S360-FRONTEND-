import { MRT_ColumnDef } from 'material-react-table';
import { Tooltip } from '@mui/material';
import { useMemo } from 'react';

import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
} from '@/shared/utils';
import {
  AuditLogsPITM,
  PermissionsEnum,
  ChangeModelStateData,
  PrioridadIncidenciaTM,
} from '@/shared/interfaces';
import {
  CustomSwitch,
  TableModalGeneric,
  ViewMoreTextModalTableCell,
} from '@/shared/components';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { useUpdatePrioridadIncidenciaTM } from '@/actions/app';
import { TABLE_CONSTANTS, MODEL_STATE_BOOLEAN } from '@/shared/constants';

export const useColumnsPrioridadIncidenciaTM = () => {
  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* mutations
  const changeState = useUpdatePrioridadIncidenciaTM<ChangeModelStateData>({
    enableNavigate: false,
  });

  const prioridadincidenciatmBaseColumns01 = useMemo<
    MRT_ColumnDef<PrioridadIncidenciaTM>[]
  >(
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
        accessorKey: 'code',
        header: 'CODIGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'code'),
      },
      {
        accessorKey: 'color_hex',
        header: 'COLOR HEX',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          return (
            <Tooltip title={row.original.color_hex}>
              <div
                style={{
                  padding: '5px',
                  background: '#fff',
                  borderRadius: '1px',
                  boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                  display: 'inline-block',
                  cursor: 'pointer',
                  minWidth: '2cm',
                }}
              >
                <div
                  style={{
                    height: '10px',
                    background: row.original.color_hex, // Color de fondo dinámico
                    borderRadius: '2px',
                    border: '1px solid rgba(0, 0, 0, 0.2)', // Un pequeño borde opcional
                  }}
                />
              </div>
            </Tooltip>
          );
        },
      },
      {
        accessorKey: 'user_create__name',
        header: 'USUARIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, ['user_create_data', 'razon_social']),
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
                    PermissionsEnum.tecnico_change_prioridadincidenciaticketmasivo,
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
    [setConfirmDialog, setConfirmDialogIsOpen, changeState],
  );

  const prioridadincidenciatmColumns = useMemo<
    MRT_ColumnDef<PrioridadIncidenciaTM>[]
  >(
    () => [
      ...prioridadincidenciatmBaseColumns01,
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
    [prioridadincidenciatmBaseColumns01],
  );

  const prioridadincidenciaHistorialColumns = useMemo<
    MRT_ColumnDef<AuditLogsPITM>[]
  >(
    () => [
      {
        accessorKey: 'action',
        header: 'ACCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'action'),
      },
      {
        accessorKey: 'user_data__razon_social',
        header: 'USUARIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['user_data', 'razon_social']),
      },
      {
        accessorKey: 'description',
        header: 'DESCRIPCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.description
            ? row.original.description
            : 'N/A';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle="Descripcion"
            />
          );
        },
      },
      {
        accessorKey: 'additional_data',
        header: 'Cambio',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => {
          const additionalData = Array.isArray(row.original.additional_data)
            ? row.original.additional_data
            : [row.original.additional_data];

          return <TableModalGeneric Arrays={additionalData} />;
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
    [],
  );

  return {
    prioridadincidenciatmColumns,
    prioridadincidenciaHistorialColumns,
  };
};

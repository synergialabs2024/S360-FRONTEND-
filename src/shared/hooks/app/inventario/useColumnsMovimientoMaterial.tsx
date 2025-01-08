import { useUpdateMovimientoMaterial } from '@/actions/app';
import { CustomSwitch, ViewMoreTextModalTableCell } from '@/shared/components';
import { MODEL_STATE_BOOLEAN, TABLE_CONSTANTS } from '@/shared/constants';
import {
  ChangeModelStateData,
  MovimientoMaterial,
  PermissionsEnum,
} from '@/shared/interfaces';
import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
} from '@/shared/utils';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

export const useColumnsMovimientoMaterial = () => {
  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  const changeState = useUpdateMovimientoMaterial<ChangeModelStateData>({
    enableNavigate: false,
  });

  const movimientoMaterialBaseColumns01 = useMemo<
    MRT_ColumnDef<MovimientoMaterial>[]
  >(
    () => [
      {
        accessorKey: 'cantidad',
        header: 'CANTIDAD',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'cantidad'),
      },
      {
        accessorKey: 'observacion',
        header: 'OBSERVACIÓN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const str = row?.original?.observacion
            ? row.original.observacion
            : 'N/A';
          return (
            <ViewMoreTextModalTableCell
              longText={str}
              limit={27}
              modalTitle="Observacion"
            />
          );
        },
      },
      {
        accessorKey: 'tipo_movimiento',
        header: 'TIPO MOVIMIENTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'tipo_movimiento'),
      },
    ],
    [],
  );

  const movimientoMaterialBaseColumns02 = useMemo<
    MRT_ColumnDef<MovimientoMaterial>[]
  >(
    () => [
      {
        accessorKey: 'producto',
        header: 'PRODUCTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['producto_data', 'nombre']),
      },
      {
        accessorKey: 'bodega_origen',
        header: 'BODEGA ORIGEN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, ['bodega_origen_data', 'nombre']),
      },
      {
        accessorKey: 'ubicacion_origen',
        header: 'UBICACIÓN ORIGEN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, ['ubicacion_origen_data', 'nombre']),
      },
      {
        accessorKey: 'bodega_destino',
        header: 'BODEGA DESTINO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, ['bodega_destino_data', 'nombre']),
      },
      {
        accessorKey: 'ubicacion_destino',
        header: 'UBICACIÓN DESTINO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, ['ubicacion_destino_data', 'nombre']),
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
                    PermissionsEnum.inventario_change_movimientomaterial,
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

  const movimientoMaterialColumns = useMemo<
    MRT_ColumnDef<MovimientoMaterial>[]
  >(
    () => [
      ...movimientoMaterialBaseColumns01,
      ...movimientoMaterialBaseColumns02,
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
    [movimientoMaterialBaseColumns01, movimientoMaterialBaseColumns02],
  );
  return {
    movimientoMaterialColumns,
  };
};

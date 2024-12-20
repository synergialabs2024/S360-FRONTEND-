import { useUpdateIngresoMaterial } from '@/actions/app';
import { CustomSwitch, ViewMoreTextModalTableCell } from '@/shared/components';
import { MODEL_STATE_BOOLEAN, TABLE_CONSTANTS } from '@/shared/constants';
import {
  ChangeModelStateData,
  IngresoMaterial,
  PermissionsEnum,
} from '@/shared/interfaces';
import { emptyCellNested, formatDateWithTimeCell } from '@/shared/utils';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

export const useColumnsIngresoMaterial = () => {
  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  const changeState = useUpdateIngresoMaterial<ChangeModelStateData>({
    enableNavigate: false,
  });

  const ingresoMaterialBaseColumns01 = useMemo<
    MRT_ColumnDef<IngresoMaterial>[]
  >(
    () => [
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
    ],
    [],
  );

  const ingresoMaterialBaseColumns02 = useMemo<
    MRT_ColumnDef<IngresoMaterial>[]
  >(
    () => [
      {
        accessorKey: 'bodega__name',
        header: 'BODEGA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['bodega_data', 'nombre']),
      },
      {
        accessorKey: 'ubicacion__name',
        header: 'UBICACIÓN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['ubicacion_data', 'nombre']),
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
                    PermissionsEnum.inventario_change_ingresomaterial,
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

  const ingresoMaterialColumns = useMemo<MRT_ColumnDef<IngresoMaterial>[]>(
    () => [
      ...ingresoMaterialBaseColumns01,
      ...ingresoMaterialBaseColumns02,
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
    [ingresoMaterialBaseColumns01, ingresoMaterialBaseColumns02],
  );
  return {
    ingresoMaterialColumns,
  };
};

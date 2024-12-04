import { useUiConfirmModalStore } from '@/store/ui';
import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { useUpdatePrimaryNap } from '@/actions/app';
import { CustomSwitch } from '@/shared/components';
import { MODEL_STATE_BOOLEAN, TABLE_CONSTANTS } from '@/shared/constants';
import {
  ChangeModelStateData,
  PermissionsEnum,
  PrimaryNap,
} from '@/shared/interfaces';
import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
} from '@/shared/utils';
import { hasPermission } from '@/shared/utils/auth';

export const useColumnsPrimaryNap = () => {
  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  const changeState = useUpdatePrimaryNap<ChangeModelStateData>({
    enableNavigate: false,
  });

  const changeEsSoterrado = useUpdatePrimaryNap<{ es_soterrado: boolean }>({
    enableNavigate: false,
  });

  const primaryNapBaseColumns01 = useMemo<MRT_ColumnDef<PrimaryNap>[]>(
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
        accessorKey: 'direccion',
        header: 'DIRECCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'direccion'),
      },
      {
        accessorKey: 'coordenadas',
        header: 'COORDENADAS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'coordenadas'),
      },
      {
        accessorKey: 'puertos',
        header: 'PUERTOS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'puertos'),
      },
      {
        accessorKey: 'minimum_power',
        header: 'PODER MINIMO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'minimum_power'),
      },
      {
        accessorKey: 'maximum_power',
        header: 'PODER MAXIMO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'maximum_power'),
      },
      {
        accessorKey: 'proyecto_cod',
        header: 'CODIGO PROYECTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'proyecto_cod'),
      },
    ],
    [],
  );

  const primaryNapBaseColumns02 = useMemo<MRT_ColumnDef<PrimaryNap>[]>(
    () => [
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
        Cell: ({ row }) => emptyCellOneLevel(row, 'olt'),
      },
      {
        accessorKey: 'puerto_pon__name',
        header: 'PUERTO PON',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'port_pon'),
      },
      {
        accessorKey: 'ruta__name',
        header: 'RUTA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'ruta'),
      },
      {
        accessorKey: 'ciudad__name',
        header: 'CIUDAD',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['ciudad_data', 'name']),
      },
      {
        accessorKey: 'sector__name',
        header: 'SECTOR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['sector_data', 'name']),
      },

      {
        accessorKey: 'es_soterrado',
        header: 'ES SOTERRADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableSorting: false,
        filterVariant: 'select',
        filterSelectOptions: MODEL_STATE_BOOLEAN,
        Cell: ({ row }) => {
          return typeof row.original?.es_soterrado === 'boolean' ? (
            <CustomSwitch
              title="es_soterrado"
              checked={row.original?.es_soterrado}
              onChangeChecked={() => {
                if (
                  // Pendiente a cambio
                  !hasPermission(PermissionsEnum.infraestructura_change_nap)
                )
                  return;

                setConfirmDialog({
                  isOpen: true,
                  title: 'Cambiar Soterrado',
                  subtitle:
                    '¿Está seguro que desea cambiar el soterrado de este registro?',
                  onConfirm: () => {
                    changeEsSoterrado.mutate({
                      id: row.original.id!,
                      data: {
                        es_soterrado: !row.original.es_soterrado,
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
                  // Pendiente a cambio
                  !hasPermission(PermissionsEnum.infraestructura_change_nap)
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
    [setConfirmDialog, setConfirmDialogIsOpen, changeState, changeEsSoterrado],
  );

  const primaryNapColumns = useMemo<MRT_ColumnDef<PrimaryNap>[]>(
    () => [
      ...primaryNapBaseColumns01,
      ...primaryNapBaseColumns02,
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
    [primaryNapBaseColumns01, primaryNapBaseColumns02],
  );
  return {
    primaryNapColumns,
  };
};

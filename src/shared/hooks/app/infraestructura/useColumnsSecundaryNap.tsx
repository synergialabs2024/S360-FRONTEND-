import { useUpdateNap } from '@/actions/app';
import { CustomSwitch, ViewMoreTextModalTableCell } from '@/shared/components';
import {
  MODEL_BOOLEAN,
  MODEL_STATE_BOOLEAN,
  TABLE_CONSTANTS,
} from '@/shared/constants';
import {
  ChangeModelStateData,
  Nap,
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

export const useColumnsSecondaryNap = () => {
  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  const changeState = useUpdateNap<ChangeModelStateData>({
    enableNavigate: false,
  });

  const changeEsSoterrado = useUpdateNap<{ es_soterrado: boolean }>({
    enableNavigate: false,
  });

  const secondaryNapBaseColumns01 = useMemo<MRT_ColumnDef<Nap>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'NAME',
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
        accessorKey: 'status_nap',
        header: 'STATUS NAP',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'status_nap'),
      },
      {
        accessorKey: 'proyecto_cod',
        header: 'PROYECTO COD',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'proyecto_cod'),
      },
      {
        accessorKey: 'puertos',
        header: 'PUERTOS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => emptyCellOneLevel(row, 'puertos'),
      },
    ],
    [],
  );

  const secondaryNapBaseColumns02 = useMemo<MRT_ColumnDef<Nap>[]>(
    () => [
      {
        accessorKey: 'nap_primaria__name',
        header: 'NAP PRIMARIA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['nap_primaria_data', 'name']),
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
        accessorKey: 'ciudad__name',
        header: 'CIUDAD',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['ciudad_data', 'name']),
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
        accessorKey: 'es_soterrado',
        header: 'ES SOTERRADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        filterVariant: 'select',
        filterSelectOptions: MODEL_BOOLEAN,
        Cell: ({ row }) => (
          <CustomSwitch
            title="Es Soterrado"
            isSimpleBoolean
            checked={row.original?.es_soterrado}
            onChangeChecked={() => {
              if (!hasPermission(PermissionsEnum.infraestructura_change_nap))
                return;

              setConfirmDialog({
                isOpen: true,
                title: 'Cambiar Soterrado',
                subtitle:
                  '¿Está seguro que desea cambiar la soterrado de este registro?',
                onConfirm: () => {
                  setConfirmDialogIsOpen(false);
                  changeEsSoterrado.mutate({
                    id: row.original.id!,
                    data: {
                      es_soterrado: !row.original?.es_soterrado,
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
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableSorting: false,
        filterVariant: 'select',
        filterSelectOptions: MODEL_STATE_BOOLEAN,
        Cell: ({ row }) => {
          return typeof row.original?.state === 'boolean' ? (
            <CustomSwitch
              title="state"
              checked={row.original?.state}
              onChangeChecked={() => {
                if (!hasPermission(PermissionsEnum.infraestructura_change_nap))
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

  const secondaryNapColumns = useMemo<MRT_ColumnDef<Nap>[]>(
    () => [
      ...secondaryNapBaseColumns01,
      ...secondaryNapBaseColumns02,
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
    [secondaryNapBaseColumns01, secondaryNapBaseColumns02],
  );
  return {
    secondaryNapColumns,
  };
};

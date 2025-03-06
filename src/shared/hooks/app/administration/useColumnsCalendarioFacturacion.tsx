import { useUpdateCalendarioFacturacion } from '@/actions/app';
import { CustomSwitch } from '@/shared/components';
import { MODEL_STATE_BOOLEAN, TABLE_CONSTANTS } from '@/shared/constants';
import {
  CalendarioFacturacion,
  ChangeModelStateData,
  PermissionsEnum,
} from '@/shared/interfaces';
import { emptyCellOneLevel, formatDateWithTimeCell } from '@/shared/utils';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';
import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

export const useColumnsCalendarioFacturacion = () => {
  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  const changeState = useUpdateCalendarioFacturacion<ChangeModelStateData>({
    enableNavigate: false,
  });

  const changeEsSoterrado = useUpdateCalendarioFacturacion<{
    aplica_nuevo: boolean;
  }>({
    enableNavigate: false,
  });

  const calendarioFacturacionBaseColumns01 = useMemo<
    MRT_ColumnDef<CalendarioFacturacion>[]
  >(
    () => [
      {
        accessorKey: 'dia_inicio',
        header: 'DÍA INICIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'dia_inicio'),
      },
      {
        accessorKey: 'dia_fin',
        header: 'DÍA FIN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'dia_fin'),
      },
      {
        accessorKey: 'dia_pago',
        header: 'DÍA PAGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'dia_pago'),
      },
      {
        accessorKey: 'dias_gracia',
        header: 'DÍAS GRACIA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'dias_gracia'),
      },
      {
        accessorKey: 'dia_maximo_pago',
        header: 'DÍAS MAXIMO PAGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'dia_maximo_pago'),
      },
      {
        accessorKey: 'dia_suspension',
        header: 'DÍAS SUSPENSION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'dia_suspension'),
      },
      {
        accessorKey: 'dia_facturacion',
        header: 'DÍAS FACTURACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'dia_facturacion'),
      },
    ],
    [],
  );

  const calendarioFacturacionBaseColumns02 = useMemo<
    MRT_ColumnDef<CalendarioFacturacion>[]
  >(
    () => [
      {
        accessorKey: 'aplica_nuevo',
        header: 'APLICA NUEVO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableSorting: false,
        filterVariant: 'select',
        filterSelectOptions: MODEL_STATE_BOOLEAN,
        Cell: ({ row }) => {
          return typeof row.original?.aplica_nuevo === 'boolean' ? (
            <CustomSwitch
              title="aplica_nuevo"
              checked={row.original?.aplica_nuevo}
              onChangeChecked={() => {
                if (
                  !hasPermission(
                    PermissionsEnum.administration_change_calendariofacturacion,
                  )
                )
                  return;

                setConfirmDialog({
                  isOpen: true,
                  title: 'Cambiar Aplica Nuevo',
                  subtitle:
                    '¿Está seguro que desea cambiar el soterrado de este registro?',
                  onConfirm: () => {
                    changeEsSoterrado.mutate({
                      id: row.original.id!,
                      data: {
                        aplica_nuevo: !row.original.aplica_nuevo,
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
                  !hasPermission(
                    PermissionsEnum.administration_change_calendariofacturacion,
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
    [setConfirmDialog, setConfirmDialogIsOpen, changeState, changeEsSoterrado],
  );

  const calendarioFacturacionColumns = useMemo<
    MRT_ColumnDef<CalendarioFacturacion>[]
  >(
    () => [
      ...calendarioFacturacionBaseColumns01,
      ...calendarioFacturacionBaseColumns02,
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
    [calendarioFacturacionBaseColumns01, calendarioFacturacionBaseColumns02],
  );
  return {
    calendarioFacturacionColumns,
  };
};

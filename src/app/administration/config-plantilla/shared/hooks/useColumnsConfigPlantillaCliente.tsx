import type { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { useUpdateConfiguracionPlantilla } from '@/actions/app';
import {
  emptyCellOneLevel,
  formatDateWithTimeCell,
  MODEL_BOOLEAN,
  MODEL_STATE_BOOLEAN,
  PermissionsEnum,
  TABLE_CONSTANTS,
  type ConfiguracionPlantillaCliente,
} from '@/shared';
import { CustomSwitch } from '@/shared/components';
import { hasPermission } from '@/shared/utils/auth';
import { useUiConfirmModalStore } from '@/store/ui';

export const useColumnsConfigPlantillaCliente = () => {
  ///* global state
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  ///* mutations
  const changeState = useUpdateConfiguracionPlantilla({
    enableNavigate: false,
  });

  const columns = useMemo<MRT_ColumnDef<ConfiguracionPlantillaCliente>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'NOMBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_NAME,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'name'),
      },

      {
        accessorKey: 'dia_pago',
        header: 'DIA PAGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'dia_pago'),
      },

      {
        accessorKey: 'dia_facturacion',
        header: 'DIA FACTURACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'dia_facturacion'),
      },

      {
        accessorKey: 'dia_suspension',
        header: 'DIA SUSPENSION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'dia_suspension'),
      },

      {
        accessorKey: 'dia_pago_limite',
        header: 'DIA PAGO LIMITE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'dia_pago_limite'),
      },

      {
        accessorKey: 'crea_factura',
        header: 'CREA FACTURA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'crea_factura'),
      },

      {
        accessorKey: 'dias_gracia',
        header: 'DIAS GRACIA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'dias_gracia'),
      },

      {
        accessorKey: 'aplica_corte',
        header: 'APLICA CORTE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'aplica_corte'),
      },

      {
        accessorKey: 'aplica_mora',
        header: 'APLICA MORA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'aplica_mora'),
      },

      {
        accessorKey: 'bajar_velocidad',
        header: 'BAJAR VELOCIDAD',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'bajar_velocidad'),
      },

      {
        accessorKey: 'aplica_reconexion',
        header: 'APLICA RECONEXION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'aplica_reconexion'),
      },

      {
        accessorKey: 'aviso_pantalla',
        header: 'AVISO PANTALLA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'aviso_pantalla'),
      },

      {
        accessorKey: 'recordatorio_pago',
        header: 'RECORDATORIO PAGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'recordatorio_pago'),
      },

      {
        accessorKey: 'recordatorio_1',
        header: 'RECORDATORIO 1',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'recordatorio_1'),
      },

      {
        accessorKey: 'recordatorio_2',
        header: 'RECORDATORIO 2',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'recordatorio_2'),
      },

      {
        accessorKey: 'recordatorio_3',
        header: 'RECORDATORIO 3',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'recordatorio_3'),
      },

      {
        accessorKey: 'impuesto_1',
        header: 'IMPUESTO 1',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'impuesto_1'),
      },

      {
        accessorKey: 'impuesto_2',
        header: 'IMPUESTO 2',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'impuesto_2'),
      },

      {
        accessorKey: 'impuesto_3',
        header: 'IMPUESTO 3',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'impuesto_3'),
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

  const columnsStates = useMemo<MRT_ColumnDef<ConfiguracionPlantillaCliente>[]>(
    () => [
      {
        accessorKey: 'default_config',
        header: 'CONFIGURACION POR DEFECTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableSorting: false,
        filterVariant: 'select',
        filterSelectOptions: MODEL_BOOLEAN,
        Cell: ({ row }) => {
          return typeof row.original?.default_config === 'boolean' ? (
            <CustomSwitch
              title="default_config"
              checked={row.original?.default_config}
              onChangeChecked={() => {
                if (
                  !hasPermission(
                    PermissionsEnum.administration_change_configplantillacliente,
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
                        default_config: !row.original.default_config,
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
                    PermissionsEnum.administration_change_configplantillacliente,
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

  // main columns -------------------------
  const genericColumns = useMemo<
    MRT_ColumnDef<ConfiguracionPlantillaCliente>[]
  >(() => [...columns, ...columnsStates], [columns, columnsStates]);

  const carteraColumns = useMemo<
    MRT_ColumnDef<ConfiguracionPlantillaCliente>[]
  >(() => [...columns], [columns]);

  return { genericColumns, carteraColumns };
};

/* eslint-disable indent */
import { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { useCallback, useMemo } from 'react';

import { EstadoAlquilerEnumChoice, TABLE_CONSTANTS } from '@/shared/constants';
import { Alquiler, ColorChipType } from '@/shared/interfaces';
import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTime,
  formatDateWithTimeCell,
} from '@/shared/utils';
import { ChipModelState } from '@/shared/components';
import { IconButton, Tooltip } from '@mui/material';
import { IconTrash } from '@tabler/icons-react';
import { useUpdateAlquilerCancel } from '@/actions/app';
import { useUiConfirmModalStore } from '@/store/ui';

type MRTAlquilerType = { row: MRT_Row<Alquiler> };

export const useColumnsAlquiler = () => {
  const estadoColorMap = useMemo<
    Record<EstadoAlquilerEnumChoice, ColorChipType>
  >(
    () => ({
      [EstadoAlquilerEnumChoice.ACTIVO]: 'info',
      [EstadoAlquilerEnumChoice.PAGADO]: 'success',
      [EstadoAlquilerEnumChoice.CANCELADO]: 'error',
    }),
    [],
  );

  ///* global state -----------------
  const setConfirmDialog = useUiConfirmModalStore(s => s.setConfirmDialog);
  const setConfirmDialogIsOpen = useUiConfirmModalStore(
    s => s.setConfirmDialogIsOpen,
  );

  const updateAlquilerCancelMutation = useUpdateAlquilerCancel({
    enableNavigate: true,
    enableErrorNavigate: true,
  });

  const onEditStateAlquiler = useCallback(
    (data: Alquiler) => {
      setConfirmDialog({
        isOpen: true,
        title: 'Eliminar Producto',
        subtitle: `¿Está seguro que desea eliminar el alquiler ${data.descripcion}?`,
        onConfirm: () => {
          setConfirmDialogIsOpen(false);
          updateAlquilerCancelMutation.mutate({
            id: data.id!,
          });
        },
        confirmTextBtn: 'SI, CONTINUAR',
        cancelTextBtn: 'CERRAR',
        onClose: () => {
          setConfirmDialogIsOpen(false);
        },
      });
    },
    [setConfirmDialog, setConfirmDialogIsOpen, updateAlquilerCancelMutation],
  );

  const alquilerBaseColumns01 = useMemo<MRT_ColumnDef<Alquiler>[]>(
    () => [
      {
        accessorKey: 'producto__codigo',
        header: 'PRODUCTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['producto_data', 'codigo']),
      },
      {
        accessorKey: 'estado_alquiler',
        header: 'ESTADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => {
          const estadoAlquiler = row?.original?.estado_alquiler;
          const color = estadoAlquiler
            ? estadoColorMap[estadoAlquiler as EstadoAlquilerEnumChoice] ||
              'warning'
            : 'warning';
          return <ChipModelState color={color} label={estadoAlquiler || ''} />;
        },
      },
      {
        accessorKey: 'valor_base_cuota',
        header: 'MONTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'valor_base_cuota'),
      },
      {
        accessorKey: 'descripcion',
        header: 'DESCRIPCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'descripcion'),
      },
      {
        accessorKey: 'cuota_actual',
        header: 'CUOTAS PAGADAS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const estadoActual = row?.original?.cuota_actual;
          const estadoTotal = row?.original?.total_cuotas;
          return `${estadoActual} de ${estadoTotal}`;
        },
      },
      {
        accessorKey: 'N° CUOTAS',
        header: 'TOTAL DE CUOTAS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'total_cuotas'),
      },
    ],
    [estadoColorMap],
  );
  const alquilerBaseColumns02 = useMemo<MRT_ColumnDef<Alquiler>[]>(
    () => [
      {
        accessorKey: 'cliente__identificacion',
        header: 'IDENTIFICACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['cliente_data', 'identificacion']),
      },
      {
        accessorKey: 'cliente__razon_social',
        header: 'CLIENTE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_NAME,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['cliente_data', 'razon_social']),
      },
      {
        accessorKey: 'contrato__numero_contrato',
        header: 'NUM CONTRATO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['contrato_data', 'numero_contrato']),
      },
      {
        accessorKey: 'contrato__identificacion_pago',
        header: 'IDENTIFICACION PAGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, ['contrato_data', 'identificacion_pago']),
      },
      {
        accessorKey: 'estado_alquiler',
        header: 'ESTADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => {
          const estadoAlquiler = row?.original?.estado_alquiler;
          const color = estadoAlquiler
            ? estadoColorMap[estadoAlquiler as EstadoAlquilerEnumChoice] ||
              'warning'
            : 'warning';
          return <ChipModelState color={color} label={estadoAlquiler || ''} />;
        },
      },

      {
        accessorKey: 'producto__codigo',
        header: 'PRODUCTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['producto_data', 'codigo']),
      },
      {
        accessorKey: 'valor_base_cuota',
        header: 'MONTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'valor_base_cuota'),
      },
      {
        accessorKey: 'cuota_actual',
        header: 'CUOTA ACTUAL',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'cuota_actual'),
      },
      {
        accessorKey: 'total_cuotas',
        header: 'CUOTA TOTAL',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'total_cuotas'),
      },
      {
        accessorKey: 'tipo_recurrencia',
        header: 'RECURRENCIA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'tipo_recurrencia'),
      },
      {
        accessorKey: 'linea_servicio__estado_linea',
        header: 'LINEA DE SERVICIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, ['linea_servicio_data', 'estado_linea']),
      },
    ],
    [estadoColorMap],
  );
  const alquilerBaseColumns03 = useMemo<MRT_ColumnDef<Alquiler>[]>(
    () => [
      {
        accessorKey: 'created_at',
        header: 'FECHA CREADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'created_at'),
      },

      {
        accessorKey: 'modified_at',
        header: 'FECHA MODIFICADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'modified_at'),
      },
      {
        accessorKey: 'audit_logs__created_at',
        header: 'FECHA CANCELADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }: MRTAlquilerType) => {
          const trazabilidad = row.original?.audit_logs?.find(
            item => item?.action === EstadoAlquilerEnumChoice.CANCELADO,
          );
          return trazabilidad
            ? formatDateWithTime(trazabilidad?.created_at)
            : '-';
        },
      },
      {
        accessorKey: 'audit_logs__action',
        header: 'CANCELADO POR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }: MRTAlquilerType) => {
          const trazabilidad = row.original?.audit_logs?.find(
            item => item?.action === EstadoAlquilerEnumChoice.CANCELADO,
          );
          return trazabilidad?.user_data?.razon_social || '-';
        },
      },
    ],
    [],
  );
  const alquilerBaseColumns04 = useMemo<MRT_ColumnDef<Alquiler>[]>(
    () => [
      {
        accessorKey: 'fecha_inicio',
        header: 'FECHA INICIO',
        enableColumnFilter: true,
        enableSorting: true,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }: MRTAlquilerType) => {
          return row?.original.fecha_inicio || '-';
        },
      },
      {
        accessorKey: 'fecha_fin',
        header: 'FECHA FIN',
        enableColumnFilter: true,
        enableSorting: true,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }: MRTAlquilerType) => {
          return row?.original.fecha_fin || '-';
        },
      },
    ],
    [],
  );

  const alquilerClienteColumns = useMemo<MRT_ColumnDef<Alquiler>[]>(
    () => [
      ...alquilerBaseColumns01,
      ...alquilerBaseColumns03,
      {
        accessorKey: 'cambio_estado',
        header: '',
        enableColumnFilter: false,
        enableSorting: false,
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => {
          return row.original.estado_alquiler ===
            EstadoAlquilerEnumChoice.ACTIVO ? (
            <Tooltip title="Eliminar" placement="top" arrow>
              <IconButton
                component="span"
                color="primary"
                size="small"
                onClick={() => onEditStateAlquiler(row.original as Alquiler)}
                style={{ cursor: 'pointer' }}
              >
                <IconTrash />
              </IconButton>
            </Tooltip>
          ) : (
            <></>
          );
        },
      },
    ],
    [alquilerBaseColumns01, alquilerBaseColumns03, onEditStateAlquiler],
  );
  const alquilerColumns = useMemo<MRT_ColumnDef<Alquiler>[]>(
    () => [...alquilerBaseColumns01, ...alquilerBaseColumns03],
    [alquilerBaseColumns01, alquilerBaseColumns03],
  );
  const alquilerCancelarColumns = useMemo<MRT_ColumnDef<Alquiler>[]>(
    () => [
      ...alquilerBaseColumns02,
      ...alquilerBaseColumns03,
      ...alquilerBaseColumns04,
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
    [alquilerBaseColumns02, alquilerBaseColumns03, alquilerBaseColumns04],
  );

  return {
    alquilerCancelarColumns,
    alquilerClienteColumns,
    alquilerColumns,
  };
};

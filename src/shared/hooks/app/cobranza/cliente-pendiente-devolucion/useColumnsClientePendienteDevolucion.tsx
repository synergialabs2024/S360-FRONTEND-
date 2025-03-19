import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { TABLE_CONSTANTS } from '@/shared/constants';
import { ClientePendienteDevolucion } from '@/shared/interfaces';
import { emptyCellOneLevel, formatDateWithTimeCell } from '@/shared/utils';

export const useColumnsClientePendienteDevolucion = () => {
  const clientePendienteDevolucionBaseColumns = useMemo<
    MRT_ColumnDef<ClientePendienteDevolucion>[]
  >(
    () => [
      {
        accessorKey: 'linea_servicio',
        header: 'LINEA SERVICIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'linea_servicio'),
      },
      {
        accessorKey: 'numero_referencia',
        header: 'NUMERO REFERENCIA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'numero_referencia'),
      },
      {
        accessorKey: 'estado_devolucion',
        header: 'ESTADO DEVOLUCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado_devolucion'),
      },
      {
        accessorKey: 'total',
        header: 'TOTAL',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'total'),
      },
      {
        accessorKey: 'factura',
        header: 'FACTURA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'factura'),
      },
      {
        accessorKey: 'preventa',
        header: 'PREVENTA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'preventa'),
      },
      {
        accessorKey: 'cliente',
        header: 'CLIENTE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'cliente'),
      },
      {
        accessorKey: 'contrato',
        header: 'CONTRATO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'contrato'),
      },
      {
        accessorKey: 'area',
        header: 'AREA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'area'),
      },
      {
        accessorKey: 'departamento',
        header: 'DEPARTAMENTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'departamento'),
      },
      {
        accessorKey: 'canal_venta',
        header: 'CANAL VENTA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'canal_venta'),
      },
      {
        accessorKey: 'vendedor',
        header: 'VENDEDOR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'vendedor'),
      },
    ],
    [],
  );

  const clientePendienteDevolucionColumns = useMemo<
    MRT_ColumnDef<ClientePendienteDevolucion>[]
  >(
    () => [
      ...clientePendienteDevolucionBaseColumns,
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
    [clientePendienteDevolucionBaseColumns],
  );

  return {
    clientePendienteDevolucionColumns,
  };
};

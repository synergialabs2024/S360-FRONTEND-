import type { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { TABLE_CONSTANTS } from '@/shared/constants';
import { Saldo } from '@/shared/interfaces';
import { formatCurrencyCell, formatDateWithTimeCell } from '@/shared/utils';

export const useColumnsSaldos = () => {
  const columnsBase01 = useMemo<MRT_ColumnDef<Saldo>[]>(
    () => [
      {
        accessorKey: 'monto',
        header: 'MONTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => formatCurrencyCell(row, 'monto'),
      },

      {
        accessorKey: 'fecha_consumo',
        header: 'FECHA CONSUMO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'fecha_consumo'),
      },

      {
        accessorKey: 'estado_saldo',
        header: 'ESTADO SALDO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => row.original?.estado_saldo || '-',
      },

      {
        accessorKey: 'descripcion',
        header: 'DESCRIPCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => row.original?.descripcion || '-',
      },
    ],
    [],
  );

  const auditColumns = useMemo<MRT_ColumnDef<Saldo>[]>(
    () => [
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

  /// main columns ------------
  const genericColumns = useMemo<MRT_ColumnDef<Saldo>[]>(
    () => [...columnsBase01, ...auditColumns],
    [auditColumns, columnsBase01],
  );

  return {
    genericColumns,
  };
};

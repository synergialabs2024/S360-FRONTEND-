import type { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { TABLE_CONSTANTS } from '@/shared/constants';
import { Transaccion } from '@/shared/interfaces';
import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
} from '@/shared/utils';

export const useColumnsTransaccionesCliente = () => {
  const baseColums01 = useMemo<MRT_ColumnDef<Transaccion>[]>(
    () => [
      {
        accessorKey: 'monto',
        header: 'MONTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'monto'),
      },

      {
        accessorKey: 'codigo_transaccion',
        header: 'CODIGO TRANSACCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'codigo_transaccion'),
      },

      {
        accessorKey: 'rubro',
        header: 'RUBRO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'rubro'),
      },

      {
        accessorKey: 'saldo',
        header: 'SALDO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => emptyCellOneLevel(row, 'saldo'),
      },

      {
        accessorKey: 'metodo_pago__name',
        header: 'METODO PAGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['metodo_pago_data', 'name']),
      },

      {
        accessorKey: 'id_switch',
        header: 'ID SWITCH',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'id_switch'),
      },
      {
        accessorKey: 'entidad_financiera',
        header: 'ENTIDAD FINANCIERA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'entidad_financiera'),
      },
    ],
    [],
  );

  const auditColumns = useMemo<MRT_ColumnDef<Transaccion>[]>(
    () => [
      {
        accessorKey: 'uuid',
        header: 'Identificador',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellOneLevel(row, 'uuid'),
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

  // main columns ----------------------
  const transaccionClienteTabColumns = useMemo<MRT_ColumnDef<Transaccion>[]>(
    () => [...baseColums01, ...auditColumns],
    [baseColums01, auditColumns],
  );

  return { transaccionClienteTabColumns };
};

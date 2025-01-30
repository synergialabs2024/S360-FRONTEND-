import { useMemo } from 'react';
import { MRT_ColumnDef } from 'material-react-table';

import { TABLE_CONSTANTS } from '@/shared/constants';
import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
} from '@/shared/utils';
import { PlanPagoCuota } from '@/shared/interfaces';

export const useColumnsPlanPagoCuota = () => {
  const planpagocuotaBaseColumns = useMemo<MRT_ColumnDef<PlanPagoCuota>[]>(
    () => [
      {
        accessorKey: 'estado_deuda',
        header: 'ESTADO DEUDA',
        size: TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH_LARGE,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado_deuda'),
      },
      {
        accessorKey: 'total_cuotas',
        header: 'TOTAL CUOTAS',
        size: TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH_LARGE,
        Cell: ({ row }) => emptyCellOneLevel(row, 'total_cuotas'),
      },
      {
        accessorKey: 'monto_total',
        header: 'MONTO TOTAL',
        size: TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH_LARGE,
        Cell: ({ row }) => emptyCellOneLevel(row, 'monto_total'),
      },
      {
        accessorKey: 'fecha_fin',
        header: 'FECHA FIN',
        size: TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH_LARGE,
        Cell: ({ row }) => emptyCellOneLevel(row, 'fecha_fin'),
      },
      {
        accessorKey: 'linea_servicio_data__estado_linea',
        header: 'LINEA SERVICIO',
        size: TABLE_CONSTANTS.ACTIONCOLUMN_WIDTH_LARGE,
        Cell: ({ row }) =>
          emptyCellNested(row, ['linea_servicio_data', 'estado_linea']),
      },
    ],
    [],
  );

  const planPagoMaterialColumns = useMemo<MRT_ColumnDef<PlanPagoCuota>[]>(
    () => [
      ...planpagocuotaBaseColumns,
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
    [planpagocuotaBaseColumns],
  );
  return {
    planPagoMaterialColumns,
  };
};

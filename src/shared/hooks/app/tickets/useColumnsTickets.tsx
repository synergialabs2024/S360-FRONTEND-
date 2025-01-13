import type { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { TABLE_CONSTANTS } from '@/shared/constants';
import { Preventa } from '@/shared/interfaces';
import { emptyCellNested, emptyCellOneLevel } from '@/shared/utils';

export const useColumnsTickets = () => {
  // table base columns ---------------------
  const ticketBaseColumns01 = useMemo<MRT_ColumnDef<Preventa>[]>(
    () => [
      {
        accessorKey: 'estado_ticket',
        header: 'ESTADO TICKET',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado_ticket'),
      },
      {
        accessorKey: 'asunto_ticket__name',
        header: 'ASUNTO',
        Cell: ({ row }) => emptyCellNested(row, ['asunto_ticket_data', 'name']),
      },
      {
        accessorKey: 'origen_ticket__name',
        header: 'ORIGEN',
        Cell: ({ row }) => emptyCellNested(row, ['origen_ticket_data', 'name']),
      },
      {
        accessorKey: 'fecha_sugerida_visita',
        header: 'FECHA SUGERIDA VISITA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'fecha_sugerida_visita'),
      },
      {
        accessorKey: 'detalle_adicional_ticket',
        header: 'DETALLE ADICIONAL TICKET',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'detalle_adicional_ticket'),
      },
    ],
    [],
  );

  // table columns ---------------------
  const ticketBaseColumns = useMemo<MRT_ColumnDef<Preventa>[]>(
    () => [...ticketBaseColumns01],
    [ticketBaseColumns01],
  );

  return {
    ticketBaseColumns,
  };
};

import type { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { TABLE_CONSTANTS } from '@/shared/constants';
import { emptyCellNested, emptyCellOneLevel } from '@/shared/utils';
import { Ticket } from '@/shared/interfaces/app/ticket/ticket.interface';

export const useColumnsTickets = () => {
  // table base columns ---------------------
  const ticketBaseColumns01 = useMemo<MRT_ColumnDef<Ticket>[]>(
    () => [
      {
        accessorKey: 'identificacion',
        header: 'IDENTIFICACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, [
            'linea_servicio_data',
            'cliente_data',
            'identificacion',
          ]),
      },
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
        accessorKey: 'fecha_hora_visita',
        header: 'FECHA Y HORA VISITA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'fecha_hora_visita'),
      },
      {
        accessorKey: 'detalle_adicional_ticket',
        header: 'DETALLE ADICIONAL TICKET',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'detalle_adicional_ticket'),
      },
      {
        accessorKey: 'franja_horaria',
        header: 'FRANJA HORARIA',
        Cell: ({ row }) => emptyCellOneLevel(row, 'franja_horaria'),
      },
      {
        accessorKey: 'flota_ticket__name',
        header: 'FLOTA',
        Cell: ({ row }) => emptyCellNested(row, ['flota_data', 'name']),
      },
    ],
    [],
  );

  // table columns ---------------------
  const ticketBaseColumns = useMemo<MRT_ColumnDef<Ticket>[]>(
    () => [...ticketBaseColumns01],
    [ticketBaseColumns01],
  );

  return {
    ticketBaseColumns,
  };
};

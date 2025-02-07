import type { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { TABLE_CONSTANTS } from '@/shared/constants';
import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
} from '@/shared/utils';
import { Ticket } from '@/shared/interfaces/app/ticket/ticket.interface';

export const useColumnsBuzonTareas = () => {
  // table base columns ---------------------
  const tareasBaseColumns01 = useMemo<MRT_ColumnDef<Ticket>[]>(
    () => [
      {
        accessorKey: 'tipo_tarea__name',
        header: 'TIPO TAREA',
        Cell: ({ row }) => emptyCellNested(row, ['tipo_tarea_data', 'name']),
      },
      {
        accessorKey: 'subtipo_tarea__name',
        header: 'SUBTIPO TAREA',
        Cell: ({ row }) => emptyCellNested(row, ['subtipo_tarea_data', 'name']),
      },
      {
        accessorKey: 'causa_tarea__name',
        header: 'CAUSA TAREA',
        Cell: ({ row }) => emptyCellNested(row, ['causa_tarea_data', 'name']),
      },

      {
        accessorKey: 'departamento_asignado_data__name',
        header: 'DEPARTAMENTO ASIGNADO',
        Cell: ({ row }) =>
          emptyCellNested(row, ['departamento_asignado_data', 'name']),
      },

      {
        accessorKey: 'detalle_caso',
        header: 'DETALLE CASO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'detalle_caso'),
      },

      {
        accessorKey: 'canal_referencia',
        header: 'CANAL REFERENCIA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'canal_referencia'),
      },

      {
        accessorKey: 'usuario_creacion_data__name',
        header: 'USUARIO APERTURA TAREA',
        Cell: ({ row }) =>
          emptyCellNested(row, ['usuario_creacion_data', 'username']),
      },

      {
        accessorKey: 'created_at',
        header: 'CREADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => formatDateWithTimeCell(row, 'created_at'),
      },
    ],
    [],
  );

  // table columns ---------------------
  const tareasBaseColumns = useMemo<MRT_ColumnDef<Ticket>[]>(
    () => [...tareasBaseColumns01],
    [tareasBaseColumns01],
  );

  return {
    tareasBaseColumns,
  };
};

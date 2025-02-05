import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import {
  MotivoEgreso,
  MotivoIngreso,
  MotivoTransferencia,
} from '@/shared/interfaces';
import { TABLE_CONSTANTS } from '@/shared/constants';
import { emptyCellOneLevel, formatDateWithTimeCell } from '@/shared/utils';

export const useColumnsMotivoInventario = () => {
  const motivoEgresoColumns = useMemo<MRT_ColumnDef<MotivoEgreso>[]>(
    () => [
      {
        accessorKey: 'nombre',
        header: 'NOMBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'nombre'),
      },
      {
        accessorKey: 'codigo',
        header: 'CODIGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'codigo'),
      },
      {
        accessorKey: 'descripcion',
        header: 'DESCRIPCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'descripcion'),
      },
      {
        accessorKey: 'tipo',
        header: 'TIPO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'tipo'),
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

  const motivoIngresoColumns = useMemo<MRT_ColumnDef<MotivoIngreso>[]>(
    () => [
      {
        accessorKey: 'nombre',
        header: 'NOMBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'nombre'),
      },
      {
        accessorKey: 'codigo',
        header: 'CODIGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'codigo'),
      },
      {
        accessorKey: 'descripcion',
        header: 'DESCRIPCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'descripcion'),
      },
      {
        accessorKey: 'tipo',
        header: 'TIPO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'tipo'),
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

  const motivoTransferenciaColumns = useMemo<
    MRT_ColumnDef<MotivoTransferencia>[]
  >(
    () => [
      {
        accessorKey: 'nombre',
        header: 'NOMBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'nombre'),
      },
      {
        accessorKey: 'codigo',
        header: 'CODIGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'codigo'),
      },
      {
        accessorKey: 'descripcion',
        header: 'DESCRIPCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'descripcion'),
      },
      {
        accessorKey: 'tipo',
        header: 'TIPO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'tipo'),
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

  return {
    motivoEgresoColumns,
    motivoIngresoColumns,
    motivoTransferenciaColumns,
  };
};

import { TABLE_CONSTANTS } from '@/shared/constants';
import { LeedTeleventa } from '@/shared/interfaces';
import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
} from '@/shared/utils';
import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

export const useColumnsLeedTeleventas = () => {
  const leedteleventasBaseColumns01 = useMemo<MRT_ColumnDef<LeedTeleventa>[]>(
    () => [
      {
        accessorKey: 'identificacion',
        header: 'IDENTIFICACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'identificacion'),
      },
      {
        accessorKey: 'tipo_identificacion',
        header: 'TIPO IDENTIFICACION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'tipo_identificacion'),
      },
      {
        accessorKey: 'razon_social',
        header: 'NOMBRES',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'razon_social'),
      },
      {
        accessorKey: 'vendedor__name',
        header: 'VENDEDOR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['vendedor_data', 'name']),
      },
      {
        accessorKey: 'celular',
        header: 'CELULAR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'celular'),
      },
      {
        accessorKey: 'email',
        header: 'EMAIL',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'email'),
      },
      {
        accessorKey: 'direccion_referencia',
        header: 'DIRECCION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'direccion_referencia'),
      },
      {
        accessorKey: 'coordenadas',
        header: 'COORDENADAS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'coordenadas'),
      },
      {
        accessorKey: 'motivo_rechazo_libre',
        header: 'MOTIVO RECHAZO LIBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'motivo_rechazo_libre'),
      },
    ],
    [],
  );

  const leedteleventasBaseColumns02 = useMemo<MRT_ColumnDef<LeedTeleventa>[]>(
    () => [
      {
        accessorKey: 'plan_internet__name',
        header: 'PLAN INTERNET',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['plan_internet_data', 'name']),
      },
      {
        accessorKey: 'area__name',
        header: 'AREA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['area_data', 'name']),
      },
      {
        accessorKey: 'departamento__name',
        header: 'DEPARTAMENTO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['departamento_data', 'name']),
      },
      {
        accessorKey: 'canal_venta__name',
        header: 'CANAL VENTA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) => emptyCellNested(row, ['canal_venta_data', 'name']),
      },
    ],
    [],
  );

  const leedteleventasColumns = useMemo<MRT_ColumnDef<LeedTeleventa>[]>(
    () => [
      ...leedteleventasBaseColumns01,
      ...leedteleventasBaseColumns02,
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
    [leedteleventasBaseColumns01, leedteleventasBaseColumns02],
  );

  return {
    leedteleventasColumns,
  };
};

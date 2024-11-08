import { useMemo } from 'react';
import { MRT_ColumnDef } from 'material-react-table';

import { AuditoriaConsumo } from '@/shared/interfaces';
import { TABLE_CONSTANTS } from '@/shared/constants';
import { emptyCellOneLevel } from '@/shared/utils';

export const useColumnsAuditoriaConsumo = () => {
  const clientesActivosAltoConsumo = useMemo<MRT_ColumnDef<AuditoriaConsumo>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'id'),
      },
      {
        accessorKey: 'nombre',
        header: 'NOMBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'nombre'),
      },
      {
        accessorKey: 'contrato',
        header: 'CONTRATO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'contrato'),
      },
      {
        accessorKey: 'cedula',
        header: 'CEDULA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'cedula'),
      },
      {
        accessorKey: 'estado',
        header: 'ESTADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado'),
      },
      {
        accessorKey: 'mb_subida',
        header: 'MB DE SUBIDA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'mb_subida'),
      },
      {
        accessorKey: 'mb_descarga',
        header: 'MB DE DESCARGA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'mb_subida'),
      },
      {
        accessorKey: 'gb_subida',
        header: 'GB DE SUBIDA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'gb_subida'),
      },
      {
        accessorKey: 'gb_descarga',
        header: 'GB DE DESCARGA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'gb_subida'),
      },
    ],
    [],
  );

  const clientesSuspendidosConsumo = useMemo<MRT_ColumnDef<AuditoriaConsumo>[]>(
    () => [
      ...clientesActivosAltoConsumo,
      {
        accessorKey: 'nodo',
        header: 'NODO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'nodo'),
      },
      {
        accessorKey: 'ip_cliente',
        header: 'IP_CLIENTE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'ip_cliente'),
      },
    ],
    [clientesActivosAltoConsumo],
  );

  const clientesActivosMoroso = useMemo<MRT_ColumnDef<AuditoriaConsumo>[]>(
    () => [
      {
        accessorKey: 'comment',
        header: 'COMMENT',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'comment'),
      },
      {
        accessorKey: 'list',
        header: 'LIST',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'list'),
      },
      {
        accessorKey: 'address',
        header: 'ADDRESS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'address'),
      },
      {
        accessorKey: 'creation_time',
        header: 'CREATION-TIME',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'creation_time'),
      },
      {
        accessorKey: 'ccr',
        header: 'CCR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'ccr'),
      },
      {
        accessorKey: 'ip_ccr',
        header: 'IP CCR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'ip_ccr'),
      },
      {
        accessorKey: 'estado',
        header: 'ESTADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado'),
      },
      {
        accessorKey: 'id_cliente',
        header: 'ID CLIENTE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'id_cliente'),
      },
      {
        accessorKey: 'cedula',
        header: 'CEDULA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'cedula'),
      },
      {
        accessorKey: 'nombre',
        header: 'NOMBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'nombre'),
      },
      {
        accessorKey: 'router_sn',
        header: 'ROUTER SN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'router_sn'),
      },
      {
        accessorKey: 'nodo',
        header: 'NODO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'nodo'),
      },
      {
        accessorKey: 'ip',
        header: 'IP',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'ip'),
      },
      {
        accessorKey: 'pppuser',
        header: 'PPPUSER',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'pppuser'),
      },
      {
        accessorKey: 'ppppass',
        header: 'PPPPASS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'ppppass'),
      },
      {
        accessorKey: 'plan',
        header: 'PLAN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'plan'),
      },
    ],
    [],
  );

  const clientesSuspendidosConsumoMK = useMemo<
    MRT_ColumnDef<AuditoriaConsumo>[]
  >(
    () => [
      {
        accessorKey: 'id_cliente',
        header: 'ID CLIENTE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'id_cliente'),
      },
      {
        accessorKey: 'nombre',
        header: 'NOMBRE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'nombre'),
      },
      {
        accessorKey: 'cedula',
        header: 'CEDULA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'cedula'),
      },
      {
        accessorKey: 'estado',
        header: 'ESTADO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado'),
      },
      {
        accessorKey: 'sn',
        header: 'SN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'sn'),
      },
      {
        accessorKey: 'ip_ccr',
        header: 'IP CCR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'ip_ccr'),
      },
      {
        accessorKey: 'ip',
        header: 'IP',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'ip'),
      },
      {
        accessorKey: 'plan',
        header: 'PLAN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'plan'),
      },
    ],
    [],
  );

  return {
    clientesActivosAltoConsumo,
    clientesSuspendidosConsumo,
    clientesActivosMoroso,
    clientesSuspendidosConsumoMK,
  };
};

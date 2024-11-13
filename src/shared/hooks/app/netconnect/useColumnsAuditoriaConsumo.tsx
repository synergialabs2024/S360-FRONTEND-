import { useMemo } from 'react';
import { MRT_ColumnDef } from 'material-react-table';

import { AuditoriaConsumo } from '@/shared/interfaces';
import { TABLE_CONSTANTS } from '@/shared/constants';
import { emptyCellOneLevel } from '@/shared/utils';

export const useColumnsAuditoriaConsumo = () => {
  const consumoClientesBase000 = useMemo<MRT_ColumnDef<AuditoriaConsumo>[]>(
    () => [
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
    ],
    [],
  );

  const consumoClientesBase001 = useMemo<MRT_ColumnDef<AuditoriaConsumo>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'id'),
      },
      ...consumoClientesBase000,
      {
        accessorKey: 'contrato',
        header: 'CONTRATO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'contrato'),
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
    [consumoClientesBase000],
  );

  const consumoClientesBase002 = useMemo<MRT_ColumnDef<AuditoriaConsumo>[]>(
    () => [
      {
        accessorKey: 'id_cliente',
        header: 'ID CLIENTE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'id_cliente'),
      },
      ...consumoClientesBase000,
      {
        accessorKey: 'ip',
        header: 'IP',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'ip'),
      },
      {
        accessorKey: 'nodo',
        header: 'NODO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'nodo'),
      },
    ],
    [consumoClientesBase000],
  );

  const consumoClientes_Suspendidos_Cosumo = useMemo<
    MRT_ColumnDef<AuditoriaConsumo>[]
  >(
    () => [
      ...consumoClientesBase001,
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
    [consumoClientesBase001],
  );

  const consumoClientes_Activos_Alto_Consumo = useMemo<
    MRT_ColumnDef<AuditoriaConsumo>[]
  >(() => [...consumoClientesBase001], [consumoClientesBase001]);

  const consumoClientes_Activos_Moroso = useMemo<
    MRT_ColumnDef<AuditoriaConsumo>[]
  >(
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
        accessorKey: 'creation-time',
        header: 'CREATION TIME',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'creation-time'),
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
        accessorKey: 'ip ccr',
        header: 'IP CCR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'ip ccr'),
      },
      ...consumoClientesBase002,
      {
        accessorKey: 'router sn',
        header: 'ROUTER SN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'router sn'),
      },
    ],
    [consumoClientesBase002],
  );

  const consumoClientes_Suspendidos_Consumo_MK = useMemo<
    MRT_ColumnDef<AuditoriaConsumo>[]
  >(
    () => [
      ...consumoClientesBase002,
      {
        accessorKey: 'sn',
        header: 'SN',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'sn'),
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
    [consumoClientesBase002],
  );

  return {
    consumoClientes_Suspendidos_Cosumo,
    consumoClientes_Activos_Alto_Consumo,
    consumoClientes_Activos_Moroso,
    consumoClientes_Suspendidos_Consumo_MK,
  };
};

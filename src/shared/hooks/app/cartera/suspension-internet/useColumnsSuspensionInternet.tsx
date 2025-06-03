import type { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import {
  emptyCellNested,
  emptyCellOneLevel,
  formatDateWithTimeCell,
} from '@/shared/utils';
import {
  TABLE_CONSTANTS,
  SUSPENSION_INTERNET_TIPO_ARRAY_CHOICES,
  SUSPENSION_INTERNET_ESTADO_ARRAY_CHOICES,
} from '@/shared/constants';
import { SuspensionInternet } from '@/shared/interfaces';

export const useColumnsSuspensionInternet = () => {
  // table base columns ---------------------
  const SuspensionInternetColumns01 = useMemo<
    MRT_ColumnDef<SuspensionInternet>[]
  >(
    () => [
      {
        accessorKey: 'tipo_suspension',
        header: 'TIPO DE SUSPENSION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        filterVariant: 'select',
        filterSelectOptions: SUSPENSION_INTERNET_TIPO_ARRAY_CHOICES,
        Cell: ({ row }) => emptyCellOneLevel(row, 'tipo_suspension'),
      },
      {
        accessorKey: 'estado_suspension',
        header: 'ESTADO SUSPENSION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        enableColumnFilter: true,
        enableSorting: true,
        filterVariant: 'select',
        filterSelectOptions: SUSPENSION_INTERNET_ESTADO_ARRAY_CHOICES,
        Cell: ({ row }) => emptyCellOneLevel(row, 'estado_suspension'),
      },
      {
        accessorKey: 'motivo',
        header: 'MOTIVO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'motivo'),
      },
      {
        accessorKey: 'user_create__razon_social',
        header: 'USUARIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        Cell: ({ row }) =>
          emptyCellNested(row, ['user_create_data', 'razon_social']),
      },
      {
        accessorKey: 'cliente',
        header: 'CLIENTE',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'cliente'),
      },
      {
        accessorKey: 'linea_servicio',
        header: 'LINEA SERVICIO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'linea_servicio'),
      },
      {
        accessorKey: 'contrato',
        header: 'CONTRATO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_SMALL,
        Cell: ({ row }) => emptyCellOneLevel(row, 'contrato'),
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

  // table columns ---------------------
  const SuspensionInternetColumns = useMemo<
    MRT_ColumnDef<SuspensionInternet>[]
  >(() => [...SuspensionInternetColumns01], [SuspensionInternetColumns01]);

  return {
    SuspensionInternetColumns,
  };
};

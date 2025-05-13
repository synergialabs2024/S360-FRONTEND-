import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { emptyCellOneLevel } from '@/shared/utils';
import { TABLE_CONSTANTS } from '@/shared/constants';
import { AutorizacionOnu } from '@/shared/interfaces';

export const useColumnsAutorizacionOnus = () => {
  const consumoAutorizacionOnusBase001 = useMemo<
    MRT_ColumnDef<AutorizacionOnu>[]
  >(
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
        accessorKey: 'olt_name',
        header: 'OLT',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'olt_name'),
      },
      {
        accessorKey: 'olt_frame',
        header: 'CHASIS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'olt_frame'),
      },
      {
        accessorKey: 'olt_slot',
        header: 'SLOT',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'olt_slot'),
      },
      {
        accessorKey: 'olt_port',
        header: 'PUERTO PON',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'olt_port'),
      },
      {
        accessorKey: 'sn',
        header: 'SERIAL',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'sn'),
      },
      {
        accessorKey: 'software_version',
        header: 'VERSION',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'software_version'),
      },
      {
        accessorKey: 'equipment_id',
        header: 'MODELO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellOneLevel(row, 'equipment_id'),
      },
    ],
    [],
  );

  const consumoAutorizacion_Onus = useMemo<MRT_ColumnDef<AutorizacionOnu>[]>(
    () => [...consumoAutorizacionOnusBase001],
    [consumoAutorizacionOnusBase001],
  );

  return {
    consumoAutorizacion_Onus,
  };
};

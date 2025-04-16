import type { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import { TABLE_CONSTANTS } from '@/shared/constants';
import { emptyCellNested, formatDateWithTimeCell } from '@/shared/utils';
import { CambioDomicilio } from '@/shared/interfaces';

export const useColumnsCambioDomicilio = () => {
  // table base columns ---------------------
  const cambioDomicilioColumns01 = useMemo<MRT_ColumnDef<CambioDomicilio>[]>(
    () => [
      {
        accessorKey: 'linea_servicio_data__cliente_data__name',
        header: 'RAZON SOCIAL',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) =>
          emptyCellNested(row, [
            'linea_servicio_data',
            'cliente_data',
            'razon_social',
          ]),
      },
      {
        accessorKey: 'linea_servicio_data__cliente_data__identificacion',
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
        accessorKey: 'new_pais_data__name',
        header: 'NUEVO PAIS',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['new_pais_data', 'name']),
      },

      {
        accessorKey: 'new_ciudad_data__name',
        header: 'NUEVA CIUDAD',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['new_ciudad_data', 'name']),
      },

      {
        accessorKey: 'new_provincia_data__name',
        header: 'NUEVA PROVINCIA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['new_provincia_data', 'name']),
      },

      {
        accessorKey: 'new_sector_data__name',
        header: 'NUEVO SECTOR',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['new_sector_data', 'name']),
      },

      {
        accessorKey: 'new_zona_data__name',
        header: 'NUEVA ZONA',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_MEDIUM,
        enableColumnFilter: true,
        enableSorting: true,
        Cell: ({ row }) => emptyCellNested(row, ['new_zona_data', 'name']),
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
  const cambioDomicilioColumns = useMemo<MRT_ColumnDef<CambioDomicilio>[]>(
    () => [...cambioDomicilioColumns01],
    [cambioDomicilioColumns01],
  );

  return {
    cambioDomicilioColumns,
  };
};

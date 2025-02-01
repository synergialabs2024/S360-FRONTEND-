import { useMemo } from 'react';
import { MRT_ColumnDef } from 'material-react-table';

import { TABLE_CONSTANTS } from '@/shared/constants';
import { ModeloInventario } from '@/shared/interfaces';
import { emptyCellOneLevel, formatDateWithTimeCell } from '@/shared/utils';

export const useColumnsModeloInventario = () => {
  const modeloInventarioBaseColumns01 = useMemo<
    MRT_ColumnDef<ModeloInventario>[]
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
    ],
    [],
  );

  const modeloInventarioColumns = useMemo<MRT_ColumnDef<ModeloInventario>[]>(
    () => [
      ...modeloInventarioBaseColumns01,
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
    [modeloInventarioBaseColumns01],
  );
  return {
    modeloInventarioColumns,
  };
};

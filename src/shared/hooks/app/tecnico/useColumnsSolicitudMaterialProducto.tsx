/* eslint-disable indent */
import type { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { useMemo } from 'react';

import { TABLE_CONSTANTS } from '@/shared/constants';
import { UbicacionProducto } from '@/shared/interfaces';
import { emptyCellNested, formatQuantityCell } from '@/shared/utils';

type UseColumnsUbicacionProducto = {
  showCurrentStockColumn?: boolean;
};

type MRTUbicacionProductoType = {
  row: MRT_Row<UbicacionProducto>;
};

export const useColumnsSolicitudMaterialProducto = ({
  showCurrentStockColumn = true,
}: UseColumnsUbicacionProducto = {}) => {
  ///* base columns -------------------------------
  const baseColumnsUbicacionProducto = useMemo<
    MRT_ColumnDef<UbicacionProducto>[]
  >(
    () => [
      {
        accessorKey: 'producto__codigo',
        header: 'CÓDIGO',
        size: TABLE_CONSTANTS.COLUMN_WIDTH_LARGE,
        Cell: ({ row }) => emptyCellNested(row, ['producto_data', 'nombre']),
      },
      {
        accessorKey: 'producto__nombre',
        header: 'NOMBRE',
        Cell: ({ row }) => emptyCellNested(row, ['producto_data', 'nombre']),
      },

      ...(showCurrentStockColumn
        ? [
            {
              accessorKey: 'stock_actual',
              header: 'STOCK',
              Cell: ({ row }: MRTUbicacionProductoType) =>
                formatQuantityCell(row, 'stock_actual'),
            },
          ]
        : []),
    ],
    [showCurrentStockColumn],
  );

  return {
    baseColumnsUbicacionProducto,
  };
};

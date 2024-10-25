import type { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { useMemo } from 'react';

import { emptyCellNested, formatQuantityCell } from '@/shared';
import { EquiposUtilizadosOTTableType } from '../components/form';

type UseColumnsEquiposPreventa = {
  showStockColumn?: boolean;
  showActionColumn?: boolean;
  onActionEquiposRowNode?: (
    item: EquiposUtilizadosOTTableType,
  ) => React.ReactNode;
};

type MRTUbicacionProductoTableType = {
  row: MRT_Row<EquiposUtilizadosOTTableType>;
};

export const useColumnsEquiposMaterialesInstallOT = ({
  showStockColumn = true,
  showActionColumn = false,
  onActionEquiposRowNode,
}: UseColumnsEquiposPreventa = {}) => {
  ///* base columns -------------------------------
  const baseColumnsEquiposMaterialesInstallOT01 = useMemo<
    MRT_ColumnDef<EquiposUtilizadosOTTableType>[]
  >(
    () => [
      {
        accessorKey: 'producto__codigo',
        header: 'CÓDIGO',
        enableColumnFilter: false,
        Cell: ({ row }) => emptyCellNested(row, ['producto_data', 'nombre']),
      },
      {
        accessorKey: 'producto__nombre',
        header: 'NOMBRE',
        Cell: ({ row }) => emptyCellNested(row, ['producto_data', 'nombre']),
      },
      {
        accessorKey: 'stock_actual',
        header: 'STOCK',
        enableColumnFilter: false,
        hidden: !showStockColumn,
        Cell: ({ row }) => formatQuantityCell(row, 'stock_actual'),
      },

      ...(showActionColumn
        ? [
          {
            accessorKey: 'action',
            enableColumnFilter: false,
            header: 'ACCIÓN',
            Cell: ({ row }: MRTUbicacionProductoTableType) =>
              onActionEquiposRowNode?.(row.original),
          },
        ]
        : []),
    ],
    [],
  );

  return { baseColumnsEquiposMaterialesInstallOT01 };
};

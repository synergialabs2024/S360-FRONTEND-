/* eslint-disable indent */
import type { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { useMemo } from 'react';

import { emptyCellNested, formatQuantityCell, TABLE_CONSTANTS } from '@/shared';
import {
  EquiposUtilizadosOTTableType,
  MaterialesUtilizadosOTTableType,
} from '../components/form';

type UseColumnsEquiposPreventa = {
  showStockColumn?: boolean;
  showActionColumn?: boolean;
  onActionEquiposRowNode?: (
    item: EquiposUtilizadosOTTableType,
  ) => React.ReactNode;

  showCurrentStockColumn?: boolean;
};

type MRTUbicacionProductoTableType = {
  row: MRT_Row<EquiposUtilizadosOTTableType>;
};

export const useColumnsEquiposMaterialesInstallOT = ({
  showStockColumn = true,
  showActionColumn = false,
  onActionEquiposRowNode,
  showCurrentStockColumn = true,
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
              enableColumnFilter: false,
              hidden: !showStockColumn,
              Cell: ({ row }: MRTUbicacionProductoTableType) =>
                formatQuantityCell(row, 'stock_actual'),
            },
          ]
        : []),

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
    [
      onActionEquiposRowNode,
      showActionColumn,
      showCurrentStockColumn,
      showStockColumn,
    ],
  );

  const baseColumnsMaterialesInstallOT1 = useMemo<
    MRT_ColumnDef<MaterialesUtilizadosOTTableType>[]
  >(
    () => [...baseColumnsEquiposMaterialesInstallOT01],
    [baseColumnsEquiposMaterialesInstallOT01],
  );

  const columnsSelectedSeries = useMemo(
    () => [
      {
        id: 'numero_serie',
        header: 'Series',
        accessorFn: (str: string) => str,
      },
    ],
    [],
  );

  return {
    baseColumnsEquiposMaterialesInstallOT01,
    columnsSelectedSeries,
    baseColumnsMaterialesInstallOT1,
  };
};

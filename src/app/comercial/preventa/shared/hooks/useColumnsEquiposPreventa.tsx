/* eslint-disable indent */
import type { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { useMemo } from 'react';

import {
  emptyCellNested,
  emptyCellOneLevel,
  formatQuantityCell,
} from '@/shared';
import { EquiposSeleccionadosTableType } from '../components/SavePreventa/form/equipos/EquiposSeleccionadosPreventa';

type MRTUbicacionProductoTableType = {
  row: MRT_Row<EquiposSeleccionadosTableType>;
};

type UseColumnsEquiposPreventa = {
  showActionColumn?: boolean;
  onActionRowNode?: (item: EquiposSeleccionadosTableType) => React.ReactNode;
};
export const useColumnsEquiposPreventa = ({
  showActionColumn = true,
  onActionRowNode,
}: UseColumnsEquiposPreventa = {}) => {
  ///* base columns -------------------------------
  const baseColumnsPreventa01 = useMemo<
    MRT_ColumnDef<EquiposSeleccionadosTableType>[]
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

      ...(showActionColumn
        ? [
            {
              accessorKey: 'action',
              enableColumnFilter: false,
              header: 'ACCIÓN',
              Cell: ({ row }: MRTUbicacionProductoTableType) =>
                onActionRowNode?.(row.original),
            },
          ]
        : []),
    ],
    [onActionRowNode, showActionColumn],
  );

  // only code and quantity withou action column
  const savedEquiposPreventaColumns = useMemo<
    MRT_ColumnDef<EquiposSeleccionadosTableType>[]
  >(
    () => [
      {
        accessorKey: 'producto__codigo',
        header: 'CÓDIGO',
        enableColumnFilter: false,
        Cell: ({ row }) => emptyCellOneLevel(row, 'codigo'),
      },
      {
        accessorKey: 'quantity',
        header: 'CANTIDAD',
        enableColumnFilter: false,
        Cell: ({ row }) => formatQuantityCell(row, 'cantidad'),
      },
    ],
    [],
  );

  return {
    baseColumnsPreventa01,
    savedEquiposPreventaColumns,
  };
};

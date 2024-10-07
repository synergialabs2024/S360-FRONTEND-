/* eslint-disable indent */
import type { MRT_ColumnDef, MRT_Row } from 'material-react-table';
import { useMemo } from 'react';

import { emptyCellNested } from '@/shared';
import type { UbicacionProducto } from '@/shared/interfaces/app/inventario';

export type UbicacionProductoTableType = UbicacionProducto & {};

type MRTUbicacionProductoTableType = {
  row: MRT_Row<UbicacionProductoTableType>;
};

type UseColumnsEquiposPreventa = {
  showActionColumn?: boolean;
  onActionRowNode?: (item: UbicacionProductoTableType) => React.ReactNode;
};
export const useColumnsEquiposPreventa = ({
  showActionColumn = true,
  onActionRowNode,
}: UseColumnsEquiposPreventa = {}) => {
  ///* base columns -------------------------------
  const baseColumns01 = useMemo<MRT_ColumnDef<UbicacionProductoTableType>[]>(
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

  return {
    baseColumns01,
  };
};
